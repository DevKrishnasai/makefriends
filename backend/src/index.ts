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
const io = new Server(httpserver, {
  cors: {
    origin: "http://localhost:3000", // Replace with your frontend URL
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

global.onlineUsers = new Map<string, string>();
io.on("connection", (socket) => {
  console.log(`user with id-${socket.id} joined`);
  socket.on("add-user", (userId) => {
    console.log(userId);
    global.onlineUsers.set(userId, socket.id);
  });

  socket.on("disconnect", (userId) => {
    global.onlineUsers.delete(userId);
  });
});

httpserver.listen(port, async () => {
  console.log(`Server is running on port http://localhost:${port}`);
});
