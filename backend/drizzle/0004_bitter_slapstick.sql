ALTER TABLE "users" DROP CONSTRAINT "users_friends_users_id_fk";
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "users" ADD CONSTRAINT "users_friends_users_id_fk" FOREIGN KEY ("friends") REFERENCES "users"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
