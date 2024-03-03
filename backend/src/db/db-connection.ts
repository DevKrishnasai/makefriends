// import { pgTable, serial, text, varchar } from "drizzle-orm/pg-core";
import { drizzle } from "drizzle-orm/node-postgres";

import { Client } from "pg";

import dotenv from "dotenv";

dotenv.config();

// const client = new Client({
//   connectionString: "postgres://user:password@host:port/db",
// });

// or
const client = new Client({
  host: process.env.DB_HOST,
  port: 5432,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

client
  .connect()
  .then(() => {
    console.log("db connection established");
  })
  .catch((err) => {
    console.log(err);
  });
export const db = drizzle(client);
