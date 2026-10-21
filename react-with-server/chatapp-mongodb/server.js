import express from "express";
// import { db } from "./db.js"
import cors from "cors";
import bcrypt from "bcryptjs";
// import { customAlphabet } from "nanoid";
import jwt from 'jsonwebtoken';
import "dotenv/config"
import cookieParser from "cookie-parser";
// import path from "path";
import mongoose from "mongoose";
import { userModel } from "./model.js"

const app = express();
const PORT = 5000;
const SECRET = process.env.JWT_SECRET

app.use(cors({ origin: ["http://localhost:3000", "*"], credentials: true }))
app.use(express.json());
app.use(cookieParser());

mongoose.connect(process.env.MONGODB_URI).catch(err => console.log(err));

// async function main() {
//     await mongoose.connect(process.env.MONGODB_URI);   
// }


app.post('/api/v1/signup', async (req, res) => {
    const { firstName, lastName, email, password } = req.body;
    if (!firstName || !lastName || !email || !password) {
        res.status(400).send({ status: "error", message: "Required Parameter Missing" })
        return;
    }
    try {
        const salt = await bcrypt.genSalt(12);
        const hash = await bcrypt.hash(password, salt);
        await userModel.create({ firstName, lastName, email, password })
        res.status(201).send({ status: "success", message: `user created with email: ${email}` })
    } catch (error) {
        console.log("Err", error);
        res.status(500).send({ status: "error", message: "Internal Server Error" })
        // if (error.code == '23505') {
        //     res.status(400).send({ status: "error", message: "User Already Logedin With This Email" })
        // } else {
        //     res.status(500).send({ status: "error", message: "Internal Server Error" })
        // }
    }
})

// app.post('/api/v1/login', async (req, res) => {
//     const reqBody = req.body;
//     if (!reqBody.email || !reqBody.password) {
//         res.status(400).send({ status: "error", message: "required parameter missing" })
//         return;
//     }
//     try {
//         const users = await db.query(`SELECT * FROM users WHERE email = $1 AND is_active = true`, [reqBody.email]);

//         const currentUser = users.rows[0]
//         if (!currentUser) {
//             res.status(404).send({ status: "error", message: "User Not Found With This Email" })
//             return;
//         }
//         const isPassMatched = await bcrypt.compare(reqBody.password, currentUser.password_hash); // true
//         if (!isPassMatched) {
//             res.status(401).send({ status: "error", message: "Password did not matched" })
//             return;
//         }
//         delete currentUser.password_hash;

//         let userToken = jwt.sign({
//             ...currentUser,
//             iat: Date.now() / 1000, // miliseconds to seconds
//             exp: (Date.now() / 1000) + (60 * 60 * 24) // add 1 day's second
//         }, SECRET);

//         res.cookie('Token', userToken, {
//             maxAge: 86400000, // 1 day
//             httpOnly: true,
//             secure: true
//         })

//         res.status(200).send({ status: "success", user: currentUser })
//     } catch (error) {
//         console.log("Err", error);
//         res.status(500).send({ status: "error", message: "Internal Server Error" })
//     }
// })

// app.use("/api/v1/*splat", (req, res, next) => {
//     if (!req?.cookies?.Token) {
//         return res.status(401).send({
//             message: "Unauthorized"
//         });
//     }
//     jwt.verify(req.cookies.Token, SECRET, (err, decodedData) => {
//         if (!err) {


//             const nowDate = new Date().getTime() / 1000;

//             if (decodedData.exp < nowDate) {

//                 res.status(401);
//                 res.cookie('Token', '', {
//                     maxAge: 1,
//                     httpOnly: true,
//                     // sameSite: "none",
//                     secure: true
//                 });
//                 res.send({ message: "token expired" })

//             } else {
//                 let userData = decodedData
//                 delete userData.iat
//                 delete userData.exp
//                 req.user = userData

//                 next();
//             }
//         } else {
//             res.status(401).send({ message: "invalid token" })
//         }
//     });
// })


app.listen(PORT, () => {
    console.log(`Server is Running on Port ${PORT}`)
})


mongoose.connection.on('connected', function () {//connected
    console.log("Mongoose is connected");
});

mongoose.connection.on('disconnected', function () {//disconnected
    console.log("Mongoose is disconnected");
    process.exit(1);
});

mongoose.connection.on('error', function (err) {//any error
    console.log('Mongoose connection error: ', err);
    process.exit(1);
});