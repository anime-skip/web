-- Current sql file was generated after introspecting the database
-- If you want to run this migration please uncomment this code before executing migrations
CREATE TABLE "api_clients" (
	"id" text PRIMARY KEY NOT NULL,
	"created_at" timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"created_by_user_id" uuid NOT NULL,
	"updated_at" timestamp with time zone NOT NULL,
	"updated_by_user_id" uuid NOT NULL,
	"deleted_at" timestamp with time zone,
	"deleted_by_user_id" uuid,
	"user_id" uuid NOT NULL,
	"app_name" text NOT NULL,
	"description" text NOT NULL,
	"allowed_origins" text[],
	"rate_limit_rpm" integer
);
--> statement-breakpoint
CREATE TABLE "users" (
	"id" uuid PRIMARY KEY DEFAULT uuid_generate_v4() NOT NULL,
	"created_at" timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"deleted_at" timestamp with time zone,
	"username" text NOT NULL,
	"email" text NOT NULL,
	"password_hash" text NOT NULL,
	"profile_url" text NOT NULL,
	"email_verified" boolean NOT NULL,
	"role" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE "user_reports" (
	"id" uuid PRIMARY KEY NOT NULL,
	"created_at" timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"created_by_user_id" uuid NOT NULL,
	"updated_at" timestamp with time zone NOT NULL,
	"updated_by_user_id" uuid NOT NULL,
	"deleted_at" timestamp with time zone,
	"deleted_by_user_id" uuid,
	"message" varchar(500) NOT NULL,
	"reported_from_url" text NOT NULL,
	"resolved" boolean DEFAULT false NOT NULL,
	"timestamp_id" uuid,
	"episode_id" uuid,
	"episode_url" text,
	"show_id" uuid,
	"resolved_message" varchar(500)
);
--> statement-breakpoint
CREATE TABLE "episode_urls" (
	"url" text PRIMARY KEY NOT NULL,
	"created_at" timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"created_by_user_id" uuid NOT NULL,
	"updated_at" timestamp with time zone NOT NULL,
	"updated_by_user_id" uuid NOT NULL,
	"episode_id" uuid NOT NULL,
	"source" integer NOT NULL,
	"duration" numeric,
	"timestamps_offset" numeric
);
--> statement-breakpoint
CREATE TABLE "episodes" (
	"id" uuid PRIMARY KEY DEFAULT uuid_generate_v4() NOT NULL,
	"created_at" timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"created_by_user_id" uuid NOT NULL,
	"updated_at" timestamp with time zone NOT NULL,
	"updated_by_user_id" uuid NOT NULL,
	"deleted_at" timestamp with time zone,
	"deleted_by_user_id" uuid,
	"season" text,
	"number" text,
	"absolute_number" text,
	"name" text,
	"show_id" uuid NOT NULL,
	"base_duration" numeric
);
--> statement-breakpoint
CREATE TABLE "migrations" (
	"id" varchar(255) PRIMARY KEY NOT NULL
);
--> statement-breakpoint
CREATE TABLE "show_admins" (
	"id" uuid PRIMARY KEY DEFAULT uuid_generate_v4() NOT NULL,
	"created_at" timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"created_by_user_id" uuid NOT NULL,
	"updated_at" timestamp with time zone NOT NULL,
	"updated_by_user_id" uuid NOT NULL,
	"deleted_at" timestamp with time zone,
	"deleted_by_user_id" uuid,
	"show_id" uuid NOT NULL,
	"user_id" uuid NOT NULL
);
--> statement-breakpoint
CREATE TABLE "shows" (
	"id" uuid PRIMARY KEY DEFAULT uuid_generate_v4() NOT NULL,
	"created_at" timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"created_by_user_id" uuid NOT NULL,
	"updated_at" timestamp with time zone NOT NULL,
	"updated_by_user_id" uuid NOT NULL,
	"deleted_at" timestamp with time zone,
	"deleted_by_user_id" uuid,
	"name" text,
	"original_name" text,
	"website" text,
	"image" text
);
--> statement-breakpoint
CREATE TABLE "templates" (
	"id" uuid PRIMARY KEY DEFAULT uuid_generate_v4() NOT NULL,
	"created_at" timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"created_by_user_id" uuid NOT NULL,
	"updated_at" timestamp with time zone NOT NULL,
	"updated_by_user_id" uuid NOT NULL,
	"deleted_at" timestamp with time zone,
	"deleted_by_user_id" uuid,
	"show_id" uuid NOT NULL,
	"type" integer NOT NULL,
	"seasons" text[],
	"source_episode_id" uuid NOT NULL
);
--> statement-breakpoint
CREATE TABLE "timestamp_types" (
	"id" uuid PRIMARY KEY DEFAULT uuid_generate_v4() NOT NULL,
	"created_at" timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"created_by_user_id" uuid NOT NULL,
	"updated_at" timestamp with time zone NOT NULL,
	"updated_by_user_id" uuid NOT NULL,
	"deleted_at" timestamp with time zone,
	"deleted_by_user_id" uuid,
	"name" text NOT NULL,
	"description" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE "timestamps" (
	"id" uuid PRIMARY KEY DEFAULT uuid_generate_v4() NOT NULL,
	"created_at" timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"created_by_user_id" uuid NOT NULL,
	"updated_at" timestamp with time zone NOT NULL,
	"updated_by_user_id" uuid NOT NULL,
	"deleted_at" timestamp with time zone,
	"deleted_by_user_id" uuid,
	"at" numeric,
	"type_id" uuid NOT NULL,
	"episode_id" uuid NOT NULL,
	"source" integer DEFAULT 0 NOT NULL
);
--> statement-breakpoint
CREATE TABLE "preferences" (
	"id" uuid PRIMARY KEY DEFAULT uuid_generate_v4() NOT NULL,
	"created_at" timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"updated_at" timestamp with time zone NOT NULL,
	"deleted_at" timestamp with time zone,
	"user_id" uuid NOT NULL,
	"enable_auto_skip" boolean DEFAULT true NOT NULL,
	"enable_auto_play" boolean DEFAULT true NOT NULL,
	"skip_branding" boolean DEFAULT true NOT NULL,
	"skip_intros" boolean DEFAULT true NOT NULL,
	"skip_new_intros" boolean DEFAULT false NOT NULL,
	"skip_mixed_intros" boolean DEFAULT false NOT NULL,
	"skip_recaps" boolean DEFAULT true NOT NULL,
	"skip_filler" boolean DEFAULT true NOT NULL,
	"skip_canon" boolean DEFAULT false NOT NULL,
	"skip_transitions" boolean DEFAULT true NOT NULL,
	"skip_credits" boolean DEFAULT true NOT NULL,
	"skip_new_credits" boolean DEFAULT false NOT NULL,
	"skip_mixed_credits" boolean DEFAULT true NOT NULL,
	"skip_preview" boolean DEFAULT true NOT NULL,
	"skip_title_card" boolean DEFAULT true NOT NULL,
	"minimize_toolbar_when_editing" boolean DEFAULT false NOT NULL,
	"hide_timeline_when_minimized" boolean DEFAULT false NOT NULL,
	"color_theme" integer DEFAULT 1 NOT NULL
);
--> statement-breakpoint
CREATE TABLE "external_links" (
	"url" text NOT NULL,
	"show_id" uuid NOT NULL,
	CONSTRAINT "external_links_pkey" PRIMARY KEY("url","show_id")
);
--> statement-breakpoint
CREATE TABLE "template_timestamps" (
	"template_id" uuid NOT NULL,
	"timestamp_id" uuid NOT NULL,
	CONSTRAINT "template_timestamps_pkey" PRIMARY KEY("template_id","timestamp_id"),
	CONSTRAINT "template_timestamps_timestamp_id_key" UNIQUE("timestamp_id")
);
--> statement-breakpoint
CREATE UNIQUE INDEX "user_username" ON "users" USING btree ("username" text_ops);--> statement-breakpoint
CREATE INDEX "idx_user_created_at" ON "user_reports" USING btree ("created_at" timestamptz_ops);--> statement-breakpoint
CREATE INDEX "idx_user_report_episode_id" ON "user_reports" USING btree ("episode_id" uuid_ops);--> statement-breakpoint
CREATE INDEX "idx_user_report_episode_url" ON "user_reports" USING btree ("episode_url" text_ops);--> statement-breakpoint
CREATE INDEX "idx_user_report_show_id" ON "user_reports" USING btree ("show_id" uuid_ops);--> statement-breakpoint
CREATE INDEX "idx_user_report_timestamp_id" ON "user_reports" USING btree ("timestamp_id" uuid_ops);--> statement-breakpoint
CREATE INDEX "idx_user_resolved" ON "user_reports" USING btree ("resolved" bool_ops);--> statement-breakpoint
CREATE INDEX "idx_template_show_id" ON "templates" USING btree ("show_id" uuid_ops);--> statement-breakpoint
CREATE INDEX "idx_template_source_episode_id" ON "templates" USING btree ("source_episode_id" uuid_ops);
