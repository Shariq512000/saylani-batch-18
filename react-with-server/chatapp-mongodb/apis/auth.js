import "dotenv/config";
import express from "express";
import bcrypt from "bcryptjs";
import { userModel, otpModel } from "../model.js";
import jwt from "jsonwebtoken";
import { customAlphabet } from "nanoid"
import { Resend } from 'resend';
import moment from "moment";

const router = express.Router()

const SECRET = process.env.JWT_SECRET


const resend = new Resend(process.env.RESEND_API_KEY);

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

router.post('/forget-password', async (req, res) => {
    const { email } = req.body; // abc@gmail.com
    if (!email) {
        return res.status(400).send({ message: "Email Field is Required" });
    }
    try {
        const user = await userModel.findOne({ email })
        if (!user) {
            return res.status(404).send({ message: "User Not Found With This Email" });
        }

        const nanoid = customAlphabet('1234567890', 5)

        const otp = nanoid();

        // const salt = await bcrypt.genSalt(12);
        const otpHash = await bcrypt.hash(otp, 10);

        // await opt.bcryt

        await otpModel.create({
            email,
            opt: otpHash
        });

        const html = `<!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Password Reset OTP</title>
        </head>

        <body style="
            margin: 0;
            padding: 0;
            background-color: #f4f6f9;
            font-family: Arial, Helvetica, sans-serif;
        ">

            <table width="100%" cellpadding="0" cellspacing="0"
                style="background-color: #f4f6f9; padding: 40px 15px;">

                <tr>
                    <td align="center">

                        <table width="100%" cellpadding="0" cellspacing="0"
                            style="
                                max-width: 500px;
                                background-color: #ffffff;
                                border-radius: 12px;
                                overflow: hidden;
                            ">

                            <!-- Header -->
                            <tr>
                                <td align="center"
                                    style="
                                        background-color: #4f46e5;
                                        padding: 30px 20px;
                                        color: #ffffff;
                                    ">
                                    <h1 style="
                                        margin: 0;
                                        font-size: 26px;
                                    ">
                                        Chat App
                                    </h1>

                                    <p style="
                                        margin: 8px 0 0;
                                        font-size: 14px;
                                    ">
                                        Password Reset Request
                                    </p>
                                </td>
                            </tr>

                            <!-- Content -->
                            <tr>
                                <td style="padding: 35px 30px;">

                                    <h2 style="
                                        color: #1f2937;
                                        font-size: 22px;
                                        margin-top: 0;
                                    ">
                                        Forgot your password?
                                    </h2>

                                    <p style="
                                        color: #6b7280;
                                        font-size: 15px;
                                        line-height: 1.7;
                                    ">
                                        We received a request to reset your
                                        password. Use the OTP below to verify
                                        your identity and continue.
                                    </p>

                                    <!-- OTP -->
                                    <div style="
                                        background-color: #f3f4f6;
                                        border: 1px dashed #4f46e5;
                                        border-radius: 10px;
                                        padding: 20px;
                                        text-align: center;
                                        margin: 25px 0;
                                    ">

                                        <p style="
                                            margin: 0 0 10px;
                                            color: #6b7280;
                                            font-size: 13px;
                                        ">
                                            YOUR VERIFICATION CODE
                                        </p>

                                        <h1 style="
                                            margin: 0;
                                            color: #4f46e5;
                                            font-size: 36px;
                                            letter-spacing: 10px;
                                        ">
                                            ${otp}
                                        </h1>

                                    </div>

                                    <p style="
                                        color: #6b7280;
                                        font-size: 14px;
                                        line-height: 1.6;
                                    ">
                                        This OTP is valid for
                                        <strong>5 minutes</strong>.
                                        Please do not share this code with anyone.
                                    </p>

                                    <p style="
                                        color: #6b7280;
                                        font-size: 14px;
                                        line-height: 1.6;
                                    ">
                                        If you didn't request a password reset,
                                        you can safely ignore this email.
                                    </p>

                                </td>
                            </tr>

                            <!-- Footer -->
                            <tr>
                                <td align="center"
                                    style="
                                        background-color: #f9fafb;
                                        padding: 20px;
                                        border-top: 1px solid #e5e7eb;
                                    ">

                                    <p style="
                                        margin: 0;
                                        color: #9ca3af;
                                        font-size: 12px;
                                    ">
                                        © 2026 MyApp. All rights reserved.
                                    </p>

                                    <p style="
                                        margin: 8px 0 0;
                                        color: #9ca3af;
                                        font-size: 12px;
                                    ">
                                        This is an automated email.
                                        Please do not reply.
                                    </p>

                                </td>
                            </tr>

                        </table>

                    </td>
                </tr>

            </table>

        </body>
        </html>`

        resend.emails.send({
            from: 'onboarding@resend.dev',
            to: email,
            subject: 'Reset Password',
            // html: `<p>The Otp is ${otp}</p>`
            html: html
        });

        res.status(201).send({ message: "OTP Sent to Your Email" })

    } catch (error) {
        console.log("Err", error);
        res.status(500).send({ message: "Internal Server Error" });
    }
})

router.post("/change-password", async (req, res) => {
    const { email, otp, password } = req.body;
    try {
        const otpRecord = await otpModel.findOne({ email }).sort({ _id: -1 }).exec()
        // console.log("generatedOtp", generatedOtp)
        if (!otpRecord || otpRecord?.isUsed == true) {
            return res.status(401).send({ message: "OTP Record Not Found, Generate New OTP" })
        }
        const now = moment()
        const otpCreatedTime = moment(otpRecord.createdOn)
        const diffInTime = now.diff(otpCreatedTime, "seconds")

        if (diffInTime > 600) {
            return res.status(401).send({ message: "OTP Expired, Generate New OTP" })
        }

        const isValidOTP = await bcrypt.compare(otpRecord.otp, otp)

        if (!isValidOTP) {
            return res.status(400).send({ message: "Invalid OTP" });
        }

        const hash = await bcrypt.hash(password, 12);

        await userModel.findOneAndUpdate({ email }, { password: hash });

        res.status(200).send({ message: "Password Update Successfully" })

        // res.send({ generatedOtp })
    } catch (error) {

    }
})

export default router;