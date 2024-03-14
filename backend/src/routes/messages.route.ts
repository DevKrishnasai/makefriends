import express from "express";
import { db } from "../db/db-connection";
import { messages } from "../db/schema";
import { asc, eq, or } from "drizzle-orm";
import { io, onlineUsers } from "../index";

const router = express.Router();

//get chats
router.post("/get", async (req, res) => {
  const { senderId, receiverId } = req.body;
  try {
    let chats = await db
      .select()
      .from(messages)
      .where(
        or(
          eq(messages.messageFromAndBy, senderId + "-" + receiverId),
          eq(messages.messageFromAndBy, receiverId + "-" + senderId)
        )
      )
      .orderBy(asc(messages.createdAt));
    res.status(200).json({
      chats,
      message: "success",
    });
  } catch (error) {
    res.status(404).json({ error });
  }
});

//save messages from user
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
        messageFromAndBy: senderId + "-" + receiverId,
      })
      .returning();
    if (onlineUsers[receiverId]) {
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
