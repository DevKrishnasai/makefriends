import { integer, pgTable, varchar, uuid } from "drizzle-orm/pg-core";

export const userScheme = pgTable("users", {
  id: varchar("id").primaryKey(),
  name: varchar("name"),
  age: integer("age"),
});
