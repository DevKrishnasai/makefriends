//for local development
// import { drizzle } from "drizzle-orm/node-postgres";
// import { Pool } from "pg";
// import dotenv from "dotenv";

// dotenv.config();

// const client = new Pool({
//   connectionString: process.env.DB_URI,
// });

// client
//   .connect()
//   .then(() => {
//     // console.log("db connection established");
//   })
//   .catch((err) => {
//     // console.log(err);
//   });

// export const db = drizzle(client);

//for production
import { drizzle } from "drizzle-orm/neon-http";
import { neon } from "@neondatabase/serverless";
import dotenv from "dotenv";

dotenv.config();

const sql = neon(process.env.DB_URI!);
export const db = drizzle(sql);
