// Define data types and tables
import { varchar, text, timestamp, pgTable } from "drizzle-orm/pg-core";

export const users = pgTable("users", {
  id: varchar("id").primaryKey().notNull(),
  username: varchar("username").notNull(),
  avatar: varchar("avatar").notNull(),
  email: varchar("email").notNull(),
  bio: text("bio"),
  friends: varchar("friends")
    .array()
    .references(() => users.id, {
      onUpdate: "no action",
      onDelete: "cascade",
    }),
  createdAt: timestamp("created_at", {
    mode: "string",
    withTimezone: true,
  }),
});

export const messages = pgTable("messages", {
  id: varchar("id").primaryKey(),
  content: text("content").notNull(),
  contentType: varchar("content_type").notNull(),
  senderId: varchar("sender_id").references(() => users.id),
  receiverId: varchar("receiver_id").references(() => users.id),
  createdAt: timestamp("created_at", {
    mode: "string",
    withTimezone: true,
  }),
});
