import express from "express";
import { db } from "../db/db-connection";
import { messages, users } from "../db/schema";
import { asc, eq, ne, or } from "drizzle-orm";

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
    await db.insert(messages).values({
      id,
      senderId,
      receiverId,
      message,
      messageType,
      messageFromAndBy: senderId + "_" + receiverId,
    });
    res.status(200).json({
      message: "Success!",
    });
  } catch (error) {
    res.status(404).json({ error });
  }
});

export default router;
