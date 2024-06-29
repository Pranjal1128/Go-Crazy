const path = require("path");
const http = require("http");
const express = require("express");
const { Server } = require("socket.io");

const publicPath = path.join(__dirname, "/../public");
const PORT = process.env.PORT || 3000;

let app = express();
let server = http.createServer(app);
const io = new Server(server);

app.use(express.static(publicPath));

io.on("connection", (socket) => {
    console.log("A user just connected");

    socket.on("startGame", () => {
        io.emit("startGame");  // Broadcast to all clients
    });

    socket.on("reset", () => {
        io.emit("reset");  // Broadcast to all clients
    });

    socket.on('crazyIsClicked', (data) => {
        io.emit('crazyIsClicked', data);
    });

    socket.on("disconnect", () => {
        console.log("A user has disconnected");
    });
});

server.listen(PORT, () => {
    console.log(`Server is up on port ${PORT}.`);
});
