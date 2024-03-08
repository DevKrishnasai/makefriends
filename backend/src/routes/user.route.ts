import express from "express";
import { db } from "../db/db-connection";
import { users } from "../db/schema";
import { eq, ilike, ne, sql } from "drizzle-orm";

const router = express.Router();

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

router.get("/users/:id", async (req, res) => {
  const id = req.params.id;
  try {
    if (!id) {
      return res.status(400).json({
        message: "id is required",
      });
    }
    const usersData = await db.select().from(users).where(ne(users.id, id));
    return res.status(200).json({ users: usersData, message: "Success!" });
  } catch (error) {
    res.status(404).json({ error });
  }
});

router.get("/:id/:search", async (req, res) => {
  const search = req.params.search.toLowerCase();
  const id = req.params.id;
  try {
    console.log(search);
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
    console.log(usersData);
    return res.status(200).json({ users: usersData, message: "Success!" });
  } catch (error) {
    res.status(404).json({ error });
  }
});
export default router;
