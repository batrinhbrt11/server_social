const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const helmet = require("helmet");
const morgan = require("morgan");
const userRoute = require("./routes/user");
const authRoute = require("./routes/auth");
const adminRoute = require("./routes/admin");
const falcutyRoute = require("./routes/falcuty");
const commentRoute = require("./routes/comment");
const post = require("./routes/post");
const socketio = require("socket.io");
const jwt = require("jsonwebtoken");
const PORT = 5000;
dotenv.config();
mongoose.connect(
  process.env.MONGO_URL,
  { useNewUrlParser: true, useUnifiedTopology: true },
  () => {
    console.log("Connected to MongoDB");
  }
);

//middleware
app.use(express.json());
app.use(helmet());
app.use(morgan("common"));

app.use("/api/users", userRoute);
app.use("/api/auth", authRoute);
app.use("/api/posts", post);
app.use("/api/falcuty", falcutyRoute);
app.use("/api/admin", adminRoute);
app.use("/api/comments", commentRoute);

const server = app.listen(PORT, () => {
  console.log("server is running 5000");
});


// Setup socket.io
const io = socketio(server);

io.use(async (socket, next) => {
  try {
    const token = socket.handshake.query.token;
    const payload = await jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    socket.userId = payload._id;
    next();
  } catch (err) {
    console.log("lỗi")
  }
});

io.on('connection', (socket) => {
  console.log(`${socket.userId} connected`);
  socket.on("postNoification", ({message}) => {
      io.emit("newNotification", message)
      console.log(`received: ${message}`);
  })
  socket.on('disconnect', () => {
  })
})
