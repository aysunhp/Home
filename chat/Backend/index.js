
const express = require('express')
const app = express()
const port = 5000
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server, {
    cors: {
        origin: "*",
    },
});


io.on('connection', (socket) => {
    console.log('a user connected', socket.id);

    socket.on("message", (message) => {
        console.log('message: ', message, socket.id);
        io.emit("message", message);
    });
});


server.listen(3003, () => {
    console.log(`Example app listening on port 3003`)
})