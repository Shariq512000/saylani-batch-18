import express from "express";
import { createServer } from "http"
import { Server as socketIo } from 'socket.io';

const app = express();
const port = 5000

app.get("/", (req, res) => {
    res.send("Hello World")
})

const server = createServer(app);

// handing over server access to socket.io
const io = new socketIo(server, {
    cors: {
        origin: ["http://localhost:3000", '*'],
        credentials: true
    }
});

server.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})

io.on("connection", (socket) => {
    console.log("New client connected with id: ", socket.id);
    // Channel,    data
    socket.on("disconnect", (message) => {
        console.log("Client disconnected with id: ", message);
    });
});


setInterval(() => {

    io.emit("Test topic", { event: "ADDED_ITEM", data: "some data" });

}, 2000)


setInterval(() => {

    io.emit("Test topic2", { event: "ADDED_ITEM", data: "some data 2" });

}, 1000)

