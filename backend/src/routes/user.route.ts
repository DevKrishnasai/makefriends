import express from "express";
import { db } from "../db/db-connection";
import { users } from "../db/schema";
import { eq, ilike, ne, sql } from "drizzle-orm";

const router = express.Router();

//add user to database
router.post("/user", async (req, res) => {
  try {
    let user = await db.select().from(users).where(eq(users.id, req.body.id));

    if (!user.length) {
      await db.insert(users).values({
        id: req.body.id,
        avatar: req.body.avatar,
        email: req.body.email,
        username: req.body.username,
      });
      return res.status(200).json({ user, message: "Success!" });
    }

    return res.status(200).json({ user, message: "Success!" });
  } catch (error) {
    res.status(404).json({
      error: error.message,
    });
  }
});

//get friends list
router.get("/users/:id", async (req, res) => {
  const id = req.params.id;
  try {
    if (!id) {
      return res.status(400).json({
        message: "id is required",
      });
    }

    const user = await db.select().from(users).where(eq(users.id, id));
    const friendsList: string[] = user[0].friends["friends"];
    const friends = [];
    for (let i = 0; i < friendsList.length; i++) {
      const friend = await db
        .select()
        .from(users)
        .where(eq(users.id, friendsList[i]));
      friends.push(friend[0]);
    }

    return res.status(200).json({ users: friends, message: "Success!" });
  } catch (error) {
    res.status(404).json({ error });
  }
});

//request user and add them
router.get("/user/request/:id/:friendId", async (req, res) => {
  const id = req.params.id;
  const requestId = req.params.friendId;
  try {
    if (!id || !requestId) {
      return res.status(400).json({
        message: "id is required",
      });
    }
    // const usersData = await db.select().from(users).where(eq(users.id, id));
    // if (!usersData.length) {
    //   return res.status(400).json({
    //     message: "user not found",
    //   });
    // }
    // const friends: string[] = usersData[0].friends["friends"];
    // if (friends.includes(requestId)) {
    //   return res.status(200).json({
    //     message: "already friend",
    //   });
    // }

    // friends.push(requestId);
    // await db.update(users).set(usersData[0]).where(eq(users.id, id));

    const oppositeUser = await db
      .select()
      .from(users)
      .where(eq(users.id, requestId));
    if (!oppositeUser.length) {
      return res.status(400).json({
        message: "user not found",
      });
    }
    const friends: string[] = oppositeUser[0].friendRequests["friends"];
    if (friends.includes(id)) {
      return res.status(200).json({
        message: "already sent friend request",
      });
    }
    friends.push(id);
    await db.update(users).set(oppositeUser[0]).where(eq(users.id, requestId));
    return res.status(200).json({
      message: "friend request sent",
    });

    // return res.status(200).json({ message: "Successfully sent request" });
  } catch (error) {
    console.log(error);
    res.status(404).json({ error });
  }
});

//search users
router.get("/:id/:search", async (req, res) => {
  const search = req.params.search.toLowerCase();
  const id = req.params.id;
  try {
    if (!search) {
      return res.status(400).json({
        message: "search is required",
      });
    }
    const usersData = await db
      .select()
      .from(users)
      .where(
        sql`LOWER(${users.username}) LIKE LOWER(${"%" + search + "%"}) AND ${
          users.id
        } <> ${id}`
      );
    return res.status(200).json({ users: usersData, message: "Success!" });
  } catch (error) {
    res.status(404).json({ error });
  }
});
export default router;
