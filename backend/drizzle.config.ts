import type { Config } from "drizzle-kit";
import dotenv from "dotenv";
dotenv.config();

// console.log(process.env.DB_HOST);
export default {
  schema: "./src/db/schema.ts",
  out: "./drizzle",
  driver: "pg",
  dbCredentials: {
    // connectionString: process.env.DB_URI!,

    host: process.env.DB_HOST!,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME!,
  },
} satisfies Config;
