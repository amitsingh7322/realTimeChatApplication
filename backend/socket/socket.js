const { Server } = require("socket.io");
const http = require("http");
const express = require("express");

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: ["http://localhost:3000","https://chatfreinds.onrender.com"],
    methods: ["GET", "POST"]
  }
});

function getReceiverSocketId(receiverId) {
  return userSocketMap[receiverId];
}
const userSocketMap = {}; //{userId : socketId}

io.on('connection', (socket) => {
  console.log("a user connected", socket.id);

  const userId = socket.handshake.query.userId;
  if(userId != 'undefoned') userSocketMap[userId]= socket.id;
//io.emit is use to send events to all connected clients
io.emit("getOnlineUsers", Object.keys(userSocketMap));

  // Define 'disconnect' event listener inside the 'connection' event
  //socket.on is used to listen the events. can be used both on lient and server side
  socket.on("disconnect", () => {
    console.log("user disconnected", socket.id);
    delete userSocketMap[userId];
    io.emit("getOnlineUsers", Object.keys(userSocketMap));
  });
});

// Export app and server
module.exports = { app, server,getReceiverSocketId, io };
