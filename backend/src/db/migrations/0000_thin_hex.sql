CREATE TABLE "tiles" (
	"id" integer PRIMARY KEY NOT NULL,
	"x" integer NOT NULL,
	"y" integer NOT NULL,
	"owner_id" uuid,
	"claimed_at" timestamp with time zone
);
--> statement-breakpoint
CREATE TABLE "users" (
	"id" uuid PRIMARY KEY NOT NULL,
	"username" text NOT NULL,
	"color" text NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "tiles" ADD CONSTRAINT "tiles_owner_id_users_id_fk" FOREIGN KEY ("owner_id") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE no action;