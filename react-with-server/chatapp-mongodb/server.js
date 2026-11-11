import express from "express";
import cors from "cors";
import jwt from 'jsonwebtoken';
import "dotenv/config"
import cookieParser from "cookie-parser";
import mongoose from "mongoose";
import { userModel, messageModel } from "./model.js"
import { Server as socketIo } from "socket.io";
import { createServer } from "http";
import authApis from "./apis/auth.js"

const app = express();
const PORT = 5000;
const SECRET = process.env.JWT_SECRET

app.use(cors({ origin: ["http://localhost:3000", "*"], credentials: true }))
app.use(express.json());
app.use(cookieParser());

mongoose.connect(process.env.MONGODB_URI).catch(err => console.log(err));

// /api/v1/login

app.use("/api/v1", authApis)

app.use("/api/v1/*splat", (req, res, next) => {
    if (!req?.cookies?.Token) {
        return res.status(401).send({
            message: "Unauthorized"
        });
    }
    jwt.verify(req.cookies.Token, SECRET, (err, decodedData) => {
        if (!err) {


            const nowDate = new Date().getTime() / 1000;

            if (decodedData.exp < nowDate) {

                res.status(401);
                res.cookie('Token', '', {
                    maxAge: 1,
                    httpOnly: true,
                    // sameSite: "none",
                    secure: true
                });
                res.send({ message: "token expired" })

            } else {
                let userData = decodedData
                delete userData.iat
                delete userData.exp
                req.user = userData

                next();
            }
        } else {
            res.status(401).send({ message: "invalid token" })
        }
    });
})

app.get('/api/v1/me', (req, res) => {
    res.send({ status: "success", user: req.user })
})

app.get("/api/v1/users", async (req, res) => {
    try {
        const users = await userModel.find();
        res.send({ status: "succes", users })
    } catch (error) {
        res.status(500).send({ status: "error", messgae: "Internal Server Error" })
    }
})

app.get('/api/v1/user-detail/:id', async (req, res) => {
    const userId = req.params.id;

    try {
        const user = await userModel.findById(userId, "firstName lastName email")
        res.send({ status: "success", user })
    } catch (error) {
        console.log("Err", error)
        res.status(500).send({ status: "error", message: "Internal Server Error" })
    }
})

app.post('/api/v1/chat/:id', async (req, res) => {

    let receiverId = req.params.id; // 2
    let senderId = req.user._id;
    if (!req.body?.message) {
        return res.status(400).send({ status: "error", message: "Message Field is Required" })
    }
    try {
        let result = await messageModel.create({
            from: senderId, //user10
            to: receiverId, //user1
            message: req.body.message
        })
        let conversation = await messageModel.findById(result._id)
            .populate({ path: 'from', select: "firstName lastName email" })
            .populate({ path: 'to', select: "firstName lastName email" })
            .exec();
        io.emit(`${receiverId}`, conversation)
        io.emit(`${receiverId}-${senderId}`, conversation)
        res.send({ message: "Message Sent", chat: conversation })
    } catch (error) {
        console.log("error", error)
        res.status(500).send({ message: "Internal Server Error" })
    }
})

app.get('/api/v1/conversation/:id', async (req, res) => {
    let receiverId = req.params.id; // 6aded78840f824b8d4dd2919
    let senderId = req.user._id // 6aded77440f824b8d4dd2918 
    try {
        let conversation = await messageModel.find({
            // from, to, message, file, createdOn
            $or: [
                {
                    from: receiverId, // 6aded78840f824b8d4dd2919
                    to: senderId // 6aded77440f824b8d4dd2918
                },
                {
                    from: senderId, // 6aded77440f824b8d4dd2918
                    to: receiverId, // 6aded78840f824b8d4dd2919
                }
            ]
        })
            .populate({ path: 'from', select: "firstName lastName email" })
            .populate({ path: 'to', select: "firstName lastName email" })
            .exec();
        res.send({ message: "Message Found", conversations: conversation })
    } catch (error) {
        res.status(500).send({ message: "Internal Server Error" })
    }
})

const server = createServer(app)

const io = new socketIo(server, {
    cors: {
        origin: ["http://localhost:3000", "*"], credentials: true
    }
})

io.on("connection", (socket) => {
    console.log("Client Connected With Id: ", socket.id)
    socket.on("disconnect", () => {
        console.log("Client Disconnected")
    })
})

server.listen(PORT, () => {
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