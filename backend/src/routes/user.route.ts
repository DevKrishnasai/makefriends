import express from "express";
import { db } from "../db/db-connection";
import { messages, users } from "../db/schema";
import { asc, desc, eq, or, sql } from "drizzle-orm";
import { io, onlineUsers } from "../index";

const router = express.Router();

//accept or reject requests by user
router.put("/request-accept-or-reject", async (req, res) => {
  const { id, acceptId, status } = req.body;
  try {
    if (!id || !acceptId || !status) {
      return res.status(400).json({
        message: "id, acceptId and status are required",
      });
    }

    const user = await db.select().from(users).where(eq(users.id, id));
    if (!user.length) {
      return res.status(400).json({
        message: "user not found",
      });
    }

    const acceptUser = await db
      .select()
      .from(users)
      .where(eq(users.id, acceptId));
    if (!acceptUser.length) {
      return res.status(400).json({
        message: "user not found maybe account deleted",
      });
    }

    let friendRequestsList: string[] =
      user[0].friendRequestsRecieved["friends"];

    friendRequestsList = friendRequestsList.filter(
      (requests) => requests !== acceptId
    );

    let friendsList: string[] = user[0].friends["friends"];
    if (status === "Accepted") {
      friendsList.push(acceptId);
    }
    await db
      .update(users)
      .set({
        friendRequestsRecieved: {
          friends: friendRequestsList,
        },
        friends: {
          friends: friendsList,
        },
      })
      .where(eq(users.id, id));

    if (status === "Accepted") {
      console.log("in Accept");
      let friends: string[] = acceptUser[0].friends["friends"];
      if (!friends.includes(id)) {
        console.log("in Accept inside");
        friends.push(id);
        io.to(onlineUsers[acceptId]).emit("accepted", user[0]);
      }
      await db
        .update(users)
        .set({
          friends: {
            friends,
          },
        })
        .where(eq(users.id, acceptId));
    } else {
      io.to(onlineUsers[acceptId]).emit("rejected", user[0]);
    }

    return res.status(201).json({
      message: `request ${status.toLowerCase()}`,
    });
  } catch (error) {
    console.log(error);
  }
});

//get friend requests
router.get("/requests/:id", async (req, res) => {
  const id = req.params.id;
  try {
    if (!id) {
      return res.status(400).json({
        message: "id is required",
      });
    }
    const user = await db.select().from(users).where(eq(users.id, id));
    const friendRequestsList: string[] =
      user[0].friendRequestsRecieved["friends"];
    const friendRequests = [];
    for (let i = 0; i < friendRequestsList.length; i++) {
      const friendRequest = await db
        .select()
        .from(users)
        .where(eq(users.id, friendRequestsList[i]));
      friendRequests.push(friendRequest[0]);
    }
    console.log("friendRequests: " + friendRequests);
    return res.status(200).json({ users: friendRequests, message: "Success!" });
  } catch (error) {
    res.status(404).json({ error });
  }
});

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

    console.log("we r in get side bar");

    const user = await db.select().from(users).where(eq(users.id, id));
    const friendsList: string[] = user[0].friends["friends"];
    let friendsWithLastChat = [];
    for (let i = 0; i < friendsList.length; i++) {
      let chats = await db
        .select()
        .from(messages)
        .where(
          or(
            eq(messages.messageFromAndBy, id + "-" + friendsList[i]),
            eq(messages.messageFromAndBy, friendsList[i] + "-" + id)
          )
        )
        .orderBy(desc(messages.createdAt));
      console.log(chats[0]);
      const friend = await db
        .select()
        .from(users)
        .where(eq(users.id, friendsList[i]));
      let row: any;
      if (!chats.length) {
        row = {
          id: friend[0].id,
          avatar: friend[0].avatar,
          username: friend[0].username,
          email: friend[0].email,
          bio: friend[0].bio,
          friends: friend[0].friends,
          createdAt: friend[0].createdAt,
          message: "",
          messageFrom: "",
          messageType: "",
        };
      } else {
        row = {
          id: friend[0].id,
          avatar: friend[0].avatar,
          username: friend[0].username,
          email: friend[0].email,
          bio: friend[0].bio,
          friends: friend[0].friends,
          createdAt: friend[0].createdAt,
          message: chats[0].message,
          messageFrom: chats[0].messageFromAndBy.split("-")[0],
          messageType: chats[0].messageType,
          lastTime: chats[0].createdAt,
        };
      }

      friendsWithLastChat.push(row);

      console.log(friend[0]);
    }
    console.log("friendsWithLastChat", friendsWithLastChat);

    return res
      .status(200)
      .json({ users: friendsWithLastChat, message: "Success!" });
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
    const user = await db.select().from(users).where(eq(users.id, id));
    if (!user.length) {
      return res.status(400).json({
        message: "user not found",
      });
    }
    const friend = user[0].friendRequestsRecieved["friends"];
    if (friend.includes(requestId)) {
      return res.status(400).json({
        message: "already requested for friend check notifications",
      });
    }

    const oppositeUser = await db
      .select()
      .from(users)
      .where(eq(users.id, requestId));
    if (!oppositeUser.length) {
      return res.status(400).json({
        message: "user not found",
      });
    }
    const friends: string[] = oppositeUser[0].friendRequestsRecieved["friends"];
    if (friends.includes(id)) {
      return res.status(200).json({
        message: "already sent friend request",
      });
    }
    friends.push(id);
    await db.update(users).set(oppositeUser[0]).where(eq(users.id, requestId));

    const isReqUserOnline = Object.keys(onlineUsers).includes(requestId);
    if (isReqUserOnline) {
      const friend = await db
        .select({
          username: users.username,
          avatar: users.avatar,
          id: users.id,
          email: users.email,
          bio: users.bio,
        })
        .from(users)
        .where(eq(users.id, id));
      io.to(onlineUsers[requestId]).emit("friendRequest", friend);
    }

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
