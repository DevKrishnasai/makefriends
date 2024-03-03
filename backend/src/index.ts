import express from "express";
import dotenv from "dotenv";
import http from "http";
import { db } from "./db/db-connection";
import { userScheme } from "./db/schema";

dotenv.config();
const app = express();
const port = process.env.PORT || 5000;

const server = http.createServer(app);

app.get("/", (req, res) => {
  res.json({
    message: "Hello World!",
  });
});

server.listen(port, async () => {
  console.log(`Server is running on port http://localhost:${port}`);
  // await db.insert(userScheme).values({
  //   id: "2",
  //   name: "vishal",
  //   age: 20,
  // });
  // const data = await db.select().from(userScheme);
  // console.log(data);
});
