CREATE INDEX "idx_api_client_user_id" ON "api_clients" USING btree ("user_id");--> statement-breakpoint
CREATE INDEX "idx_user_email" ON "users" USING btree ("email");--> statement-breakpoint
CREATE INDEX "idx_episode_url_episode_id" ON "episode_urls" USING btree ("episode_id");--> statement-breakpoint
CREATE INDEX "idx_episode_show_id" ON "episodes" USING btree ("show_id");--> statement-breakpoint
CREATE INDEX "idx_show_admin_show_id" ON "show_admins" USING btree ("show_id");--> statement-breakpoint
CREATE INDEX "idx_show_admin_user_id" ON "show_admins" USING btree ("user_id");--> statement-breakpoint
CREATE INDEX "idx_timestamp_episode_id" ON "timestamps" USING btree ("episode_id");--> statement-breakpoint
CREATE INDEX "idx_timestamp_type_id" ON "timestamps" USING btree ("type_id");--> statement-breakpoint
CREATE INDEX "idx_timestamp_created_by_user_id" ON "timestamps" USING btree ("created_by_user_id");--> statement-breakpoint
CREATE INDEX "idx_preferences_user_id" ON "preferences" USING btree ("user_id");--> statement-breakpoint
CREATE INDEX "idx_external_link_show_id" ON "external_links" USING btree ("show_id");