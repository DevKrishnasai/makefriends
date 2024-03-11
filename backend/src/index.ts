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
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
    allowedHeaders: ["my-custom-header"],
    credentials: true,
  },
});

// Middlewares
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:3000",
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);

// Routes
app.use(`/${api}`, userRoute);
app.use(`/${api}/messages`, messagesRoute);

export const onlineUsers = {};

io.on("connection", (socket) => {
  const userId: string = socket.handshake.query.userId.toString();
  if (userId !== undefined) {
    onlineUsers[userId] = socket.id;
  }
  console.log(`user with id-${userId} joined`);
  io.emit("onlineUsers", Object.keys(onlineUsers));

  socket.on("typing", (obj) => {
    if (Object.keys(onlineUsers).includes(obj.receiverId)) {
      io.to(onlineUsers[obj.receiverId]).emit("typing", obj);
    }
  });

  socket.on("disconnect", () => {
    console.log(`user with id-${userId} disconnected`);
    delete onlineUsers[userId];
    io.emit("onlineUsers", Object.keys(onlineUsers));
  });
});

httpserver.listen(port, async () => {
  console.log(`Server is running on port http://localhost:${port}`);
});
