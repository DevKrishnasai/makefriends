import type { Config } from "drizzle-kit";
import dotenv from "dotenv";
dotenv.config();

// // console.log(process.env.DB_HOST);
export default {
  schema: "./src/db/schema.ts",
  out: "./drizzle",
  dbCredentials: {
    connectionString: process.env.DB_URI!,
  },
  driver: "pg",
} satisfies Config;
