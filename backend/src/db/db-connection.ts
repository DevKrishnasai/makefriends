// import { drizzle } from "drizzle-orm/node-postgres";
// import { Client, Pool } from "pg";
// import dotenv from "dotenv";

// dotenv.config();

// // const client = new Pool({
// //   connectionString: process.env.DB_URI,
// // });

// // or
// const client = new Client({
//   host: process.env.DB_HOST,
//   port: 5432,
//   user: process.env.DB_USER,
//   password: process.env.DB_PASSWORD,
//   database: process.env.DB_NAME,
// });

// client
//   .connect()
//   .then(() => {
//     console.log("db connection established");
//   })
//   .catch((err) => {
//     console.log(err);
//   });

// export const db = drizzle(client);

// import { drizzle } from "drizzle-orm/postgres-js";
// import postgres from "postgres";
// import dotenv from "dotenv";

// dotenv.config();

// const connectionString = process.env.DB_URI;

// // Disable prefetch as it is not supported for "Transaction" pool mode
// export const client = postgres(connectionString, { prepare: false });
// export const db = drizzle(client);

import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
import dotenv from "dotenv";

dotenv.config();

const client = new Pool({
  connectionString: process.env.DB_URI,
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
