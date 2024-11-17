const express = require("express");
const dotenv = require("dotenv").config();
const path = require("path");
const app = express();
const http = require("http");
const socketio = require("socket.io");
const server = http.createServer(app);
const io = socketio(server);
const PORT = process.env.PORT || 5000;

app.use(express.static(path.resolve("public")));

io.on("connection", function (socket) {
  console.log("connected!...");
  socket.on("send-location", function (data) {
    io.emit("receive-location", { id: socket.id, ...data });
  });
  socket.on("disconnect", function () {
    io.emit("user-disconnected", socket.id);
  });
});

server.listen(PORT, () => {
  console.log("Server Started at port : " + PORT);
});
