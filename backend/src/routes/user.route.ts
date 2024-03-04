import express from "express";
import { db } from "../db/db-connection";
import { userScheme } from "../db/schema";
import { eq } from "drizzle-orm";

const router = express.Router();

router.get("/:id", async (req, res) => {
  try {
    let user = await db
      .select()
      .from(userScheme)
      .where(eq(userScheme.id, req.params.id));

    if (!user.length) {
      await db.insert(userScheme).values({
        id: req.params.id,
        name: "sai",
        age: 47,
      });

      let user = await db
        .select()
        .from(userScheme)
        .where(eq(userScheme.id, req.params.id));

      return res.status(200).json({ user, message: "Success!" });
    }

    return res.status(200).json({ user, message: "Success!" });
  } catch (error) {
    res.status(404).json({
      error: error.message,
    });
  }
});

export default router;
