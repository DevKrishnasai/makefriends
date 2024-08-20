import { migrate } from "drizzle-orm/node-postgres/migrator";
import { db } from "./db-connection";

async function migrateDatabase() {
  await migrate(db, { migrationsFolder: "./drizzle" });
  // console.log("Database migrated");
  process.exit(0);
}

migrateDatabase().catch((err) => {
  // console.log(err);
  process.exit(0);
});
