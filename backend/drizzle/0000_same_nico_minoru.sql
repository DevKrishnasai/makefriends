CREATE TABLE IF NOT EXISTS "messages" (
	"id" varchar PRIMARY KEY NOT NULL,
	"message_from_and_by" varchar NOT NULL,
	"content" text NOT NULL,
	"content_type" varchar NOT NULL,
	"sender_id" varchar,
	"receiver_id" varchar,
	"created_at" timestamp with time zone DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "users" (
	"id" varchar PRIMARY KEY NOT NULL,
	"username" varchar NOT NULL,
	"avatar" varchar NOT NULL,
	"email" varchar NOT NULL,
	"bio" text DEFAULT 'Hey ,I am using MakeFriends',
	"friends" json DEFAULT '{"friends":[]}'::json,
	"friend_request_recieved" json DEFAULT '{"friends":[]}'::json,
	"friend_request_sent" json DEFAULT '{"friends":[]}'::json,
	"logs" json DEFAULT '{"logs":[]}'::json,
	"created_at" timestamp with time zone DEFAULT now()
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "messages" ADD CONSTRAINT "messages_sender_id_users_id_fk" FOREIGN KEY ("sender_id") REFERENCES "users"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "messages" ADD CONSTRAINT "messages_receiver_id_users_id_fk" FOREIGN KEY ("receiver_id") REFERENCES "users"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
