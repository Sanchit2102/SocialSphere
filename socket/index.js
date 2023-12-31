const dotenv = require("dotenv");
const express = require("express");
const cors = require("cors");

dotenv.config();
const FRONTEND = process.env.FRONTEND;

const app = express();
app.use(cors());

const io = require("socket.io")(8800, {
  cors: {
    origins: FRONTEND,
  },
});

let activeUsers = [];

io.on("connection", (socket) => {
  // add new User
  socket.on("new-user-add", (newUserId) => {
    // if user is not added previously
    if (!activeUsers.some((user) => user.userId === newUserId)) {
      activeUsers.push({ userId: newUserId, socketId: socket.id });
      console.log("New User Connected", activeUsers);
    }
    // send all active users to new user
    io.emit("get-users", activeUsers);
  });

  socket.on("send-message", (data) => {
    const { receiverId } = data;
    const user = activeUsers.find((user) => user.userId === receiverId);
    console.log("sending", receiverId);
    console.log("data", data);
    if (user) io.to(user.socketId).emit("receive-message", data);
  });

  socket.on("disconnect", () => {
    // remove user from active users
    activeUsers = activeUsers.filter((user) => user.socketId !== socket.id);
    console.log("User Disconnected", activeUsers);
    // send all active users to all users
    io.emit("get-users", activeUsers);
  });
});

app.listen(3003,()=>{
  console.log("server running on port 3003")
})