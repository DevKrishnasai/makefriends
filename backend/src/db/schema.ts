import { varchar, text, timestamp, pgTable } from "drizzle-orm/pg-core";

export const users = pgTable("users", {
  id: varchar("id").primaryKey().notNull(),
  username: varchar("username").notNull(),
  avatar: varchar("avatar").notNull(),
  email: varchar("email").notNull(),
  bio: text("bio"),
  friends: text("friends"),
  createdAt: timestamp("created_at", {
    mode: "string",
    withTimezone: true,
  }).defaultNow(),
});

export const messages = pgTable("messages", {
  id: varchar("id").primaryKey(),
  messageFromAndBy: varchar("message_from_and_by").notNull(),
  message: text("content").notNull(),
  messageType: varchar("content_type").notNull(),
  senderId: varchar("sender_id").references(() => users.id),
  receiverId: varchar("receiver_id").references(() => users.id),
  createdAt: timestamp("created_at", {
    mode: "string",
    withTimezone: true,
  }).defaultNow(),
});
