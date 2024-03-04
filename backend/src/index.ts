import express from "express";
import dotenv from "dotenv";
import http from "http";
import { Server } from "socket.io";
import userRoute from "./routes/user.route";
import cors from "cors";
dotenv.config();

const port = process.env.PORT || 5000;

const app = express();
const httpserver = http.createServer(app);
const io = new Server(httpserver);
app.use(
  cors({
    origin: "http://localhost:3000",
  })
);
app.use(express.json());
app.use("/", userRoute);

io.on("connection", (socket) => {
  console.log(socket.id);
});

httpserver.listen(port, async () => {
  console.log(`Server is running on port http://localhost:${port}`);
});
