import "dotenv/config";
import express from "express";
import bcrypt from "bcryptjs";
import { userModel } from "../model.js";
import jwt from "jsonwebtoken";

const router = express.Router()

const SECRET = process.env.JWT_SECRET

router.post('/signup', async (req, res) => {
    const { firstName, lastName, email, password } = req.body;
    if (!firstName || !lastName || !email || !password) {
        res.status(400).send({ status: "error", message: "Required Parameter Missing" })
        return;
    }
    try {
        const salt = await bcrypt.genSalt(12);
        const hash = await bcrypt.hash(password, salt);
        await userModel.create({ firstName, lastName, email, password: hash })
        res.status(201).send({ status: "success", message: `user created with email: ${email}` })
    } catch (error) {
        console.log("Err", error);
        // res.status(500).send({ status: "error", message: "Internal Server Error" })
        if (error.code == '11000') {
            res.status(400).send({ status: "error", message: "User Already Logedin With This Email" })
        } else {
            res.status(500).send({ status: "error", message: "Internal Server Error" })
        }
    }
})

router.post('/login', async (req, res) => {
    const reqBody = req.body;
    // email: user1@gmail.com, password: 123456
    if (!reqBody.email || !reqBody.password) {
        res.status(400).send({ status: "error", message: "required parameter missing" })
        return;
    }
    try {
        // const users = await db.query(`SELECT * FROM users WHERE email = $1 AND is_active = true`, [reqBody.email]);
        const user = await userModel.findOne({ email: reqBody.email })
        const currentUser = user?.toJSON();
        // const currentUser = users.rows[0]
        if (!currentUser) {
            res.status(404).send({ status: "error", message: "User Not Found With This Email" })
            return;
        }
        const isPassMatched = await bcrypt.compare(reqBody.password, currentUser.password); // true
        if (!isPassMatched) {
            res.status(401).send({ status: "error", message: "Password did not matched" })
            return;
        }
        delete currentUser.password;

        let userToken = jwt.sign({
            ...currentUser,
            iat: Date.now() / 1000, // miliseconds to seconds
            exp: (Date.now() / 1000) + (60 * 60 * 24) // add 1 day's second
        }, SECRET);

        res.cookie('Token', userToken, {
            maxAge: 86400000, // 1 day
            httpOnly: true,
            secure: true
        })

        res.status(200).send({ status: "success", user: currentUser })
    } catch (error) {
        console.log("Err", error);
        res.status(500).send({ status: "error", message: "Internal Server Error" })
    }
})

export default router;