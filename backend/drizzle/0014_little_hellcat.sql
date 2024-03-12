ALTER TABLE "users" ADD COLUMN "friend_request_recieved" json DEFAULT '{"friends":[]}'::json;--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "friend_request_sent" json DEFAULT '{"friends":[]}'::json;--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "logs" json DEFAULT '{"logs":[]}'::json;--> statement-breakpoint
ALTER TABLE "users" DROP COLUMN IF EXISTS "friendRequest";