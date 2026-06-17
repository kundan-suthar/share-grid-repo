CREATE UNIQUE INDEX "tiles_xy_unique_idx" ON "tiles" USING btree ("x","y");--> statement-breakpoint
CREATE INDEX "tiles_owner_id_idx" ON "tiles" USING btree ("owner_id");--> statement-breakpoint
CREATE INDEX "users_created_at_idx" ON "users" USING btree ("created_at");