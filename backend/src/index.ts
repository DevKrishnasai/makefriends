import express from "express";
import dotenv from "dotenv";
import http from "http";
import { Server } from "socket.io";
import userRoute from "./routes/user.route";
import cors from "cors";
import messagesRoute from "./routes/messages.route";
dotenv.config();

const port = process.env.PORT || 5000;
const api = process.env.API;
const app = express();
const httpserver = http.createServer(app);
export const io = new Server(httpserver, {
  cors: {
    origin: process.env.FRONTEND_URL,
    methods: ["GET", "POST"],
    allowedHeaders: ["my-custom-header"],
    credentials: true,
  },
});

// Middlewares
app.use(express.json());
app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);

app.get("/", (req, res) => {
  res.json({ message: "Server is running" });
});

// Routes
app.use(`/${api}`, userRoute);
app.use(`/${api}/messages`, messagesRoute);

export const onlineUsers = {};

io.on("connection", (socket) => {
  const userId: string = socket.handshake.query.userId.toString();
  if (userId !== undefined) {
    onlineUsers[userId] = socket.id;
  }
  console.log(`User with ID ${userId} connected`);
  io.emit("onlineUsers", Object.keys(onlineUsers));

  socket.on("typing", (obj) => {
    if (onlineUsers[obj.receiverId]) {
      io.to(onlineUsers[obj.receiverId]).emit("typing", obj);
    }
  });

  socket.on("online", (id) => {
    console.log("online", id);
    onlineUsers[userId] = socket.id;
    io.emit("onlineUsers", Object.keys(onlineUsers));
  });

  socket.on("offline", (id) => {
    console.log("offline", id);
    delete onlineUsers[id];
    io.emit("onlineUsers", Object.keys(onlineUsers));
  });

  socket.on("disconnect", () => {
    console.log(`User with ID ${userId} disconnected`);
    delete onlineUsers[userId];
    io.emit("onlineUsers", Object.keys(onlineUsers));
  });
});

httpserver.listen(port, async () => {
  console.log(`Server is running on port http://localhost:${port}`);
});
