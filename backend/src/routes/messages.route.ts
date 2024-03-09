import express from "express";
import { db } from "../db/db-connection";
import { messages, users } from "../db/schema";
import { asc, eq, ne, or } from "drizzle-orm";
import { io, onlineUsers } from "../index";

const router = express.Router();

router.post("/get", async (req, res) => {
  const { senderId, receiverId } = req.body;
  //   console.log(senderId, receiverId);
  try {
    let chats = await db
      .select()
      .from(messages)
      .where(
        or(
          eq(messages.messageFromAndBy, senderId + "_" + receiverId),
          eq(messages.messageFromAndBy, receiverId + "_" + senderId)
        )
      )
      .orderBy(asc(messages.createdAt));
    console.log(chats.length);
    res.status(200).json({
      chats,
      message: "Success!",
    });
  } catch (error) {
    res.status(404).json({ error });
  }
});

router.post("/post", async (req, res) => {
  const { id, senderId, receiverId, message, messageType } = req.body;
  try {
    const msg = await db
      .insert(messages)
      .values({
        id,
        senderId,
        receiverId,
        message,
        messageType,
        messageFromAndBy: senderId + "_" + receiverId,
      })
      .returning();
    if (onlineUsers[receiverId]) {
      console.log("sent to online user");

      io.to(onlineUsers[receiverId]).emit("new_message", {
        id: msg[0].id,
        message: msg[0].message,
        messageType: msg[0].messageType,
        senderId: msg[0].senderId,
        receiverId: msg[0].receiverId,
        messageFromAndBy: msg[0].messageFromAndBy,
        createdAt: msg[0].createdAt,
      });
    }
    res.status(200).json({
      message: "Success!",
    });
  } catch (error) {
    res.status(404).json({ error });
  }
});

export default router;
