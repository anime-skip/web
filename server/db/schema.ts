import {
  boolean,
  index,
  integer,
  numeric,
  pgTable,
  primaryKey,
  text,
  timestamp,
  unique,
  uniqueIndex,
  uuid,
  varchar,
} from "drizzle-orm/pg-core";
import { sql } from "drizzle-orm";

const createdAt = timestamp({ withTimezone: true, mode: "string" }).default(
  sql`CURRENT_TIMESTAMP`,
).notNull();
const createdByUserId = uuid().notNull();
const updatedAt = timestamp({ withTimezone: true, mode: "string" }).notNull();
const updatedByUserId = uuid().notNull();
const deletedAt = timestamp({ withTimezone: true, mode: "string" });
const deletedByUserId = uuid();

export const apiClients = pgTable("api_clients", {
  id: text().primaryKey().notNull(),
  createdAt,
  createdByUserId,
  updatedAt,
  updatedByUserId,
  deletedAt,
  deletedByUserId,
  userId: uuid().notNull(),
  appName: text().notNull(),
  description: text().notNull(),
  allowedOrigins: text().array(),
  rateLimitRpm: integer(),
});
export type DbApiClient = typeof apiClients.$inferSelect;
export type DbApiClientInsert = typeof apiClients.$inferInsert;

export const users = pgTable("users", {
  id: uuid().default(sql`uuid_generate_v4()`).primaryKey().notNull(),
  createdAt,
  deletedAt,
  username: text().notNull(),
  email: text().notNull(),
  passwordHash: text().notNull(),
  profileUrl: text().notNull(),
  emailVerified: boolean().notNull(),
  role: integer().notNull(),
}, (table) => [
  uniqueIndex("user_username").using(
    "btree",
    table.username.asc().nullsLast().op("text_ops"),
  ),
]);
export type DbUser = typeof users.$inferSelect;
export type DbUserInsert = typeof users.$inferInsert;

export const userReports = pgTable("user_reports", {
  id: uuid().primaryKey().notNull(),
  createdAt,
  createdByUserId,
  updatedAt,
  updatedByUserId,
  deletedAt,
  deletedByUserId,
  message: varchar({ length: 500 }).notNull(),
  reportedFromUrl: text().notNull(),
  resolved: boolean().default(false).notNull(),
  timestampId: uuid(),
  episodeId: uuid(),
  episodeUrl: text(),
  showId: uuid(),
  resolvedMessage: varchar({ length: 500 }),
}, (table) => [
  index("idx_user_created_at").using(
    "btree",
    table.createdAt.asc().nullsLast().op("timestamptz_ops"),
  ),
  index("idx_user_report_episode_id").using(
    "btree",
    table.episodeId.asc().nullsLast().op("uuid_ops"),
  ),
  index("idx_user_report_episode_url").using(
    "btree",
    table.episodeUrl.asc().nullsLast().op("text_ops"),
  ),
  index("idx_user_report_show_id").using(
    "btree",
    table.showId.asc().nullsLast().op("uuid_ops"),
  ),
  index("idx_user_report_timestamp_id").using(
    "btree",
    table.timestampId.asc().nullsLast().op("uuid_ops"),
  ),
  index("idx_user_resolved").using(
    "btree",
    table.resolved.asc().nullsLast().op("bool_ops"),
  ),
]);
export type DbUserReport = typeof userReports.$inferSelect;
export type DbUserReportInsert = typeof userReports.$inferInsert;

export const episodeUrls = pgTable("episode_urls", {
  url: text().primaryKey().notNull(),
  createdAt,
  createdByUserId,
  updatedAt,
  updatedByUserId,
  episodeId: uuid().notNull(),
  source: integer().notNull(),
  duration: numeric(),
  timestampsOffset: numeric(),
});
export type DbEpisodeUrlReport = typeof episodeUrls.$inferSelect;
export type DbEpisodeUrlReportInsert = typeof episodeUrls.$inferInsert;

export const episodes = pgTable("episodes", {
  id: uuid().default(sql`uuid_generate_v4()`).primaryKey().notNull(),
  createdAt,
  createdByUserId,
  updatedAt,
  updatedByUserId,
  deletedAt,
  deletedByUserId,
  season: text(),
  number: text(),
  absoluteNumber: text(),
  name: text(),
  showId: uuid().notNull(),
  baseDuration: numeric(),
});
export type DbepisodeUrlReport = typeof episodes.$inferSelect;
export type DbepisodeUrlReportInsert = typeof episodes.$inferInsert;

export const migrations = pgTable("migrations", {
  id: varchar({ length: 255 }).primaryKey().notNull(),
});

export const showAdmins = pgTable("show_admins", {
  id: uuid().default(sql`uuid_generate_v4()`).primaryKey().notNull(),
  createdAt,
  createdByUserId,
  updatedAt,
  updatedByUserId,
  deletedAt,
  deletedByUserId,
  showId: uuid().notNull(),
  userId: uuid().notNull(),
});
export type DbShowAdmin = typeof showAdmins.$inferSelect;
export type DbShowAdminInsert = typeof showAdmins.$inferInsert;

export const shows = pgTable("shows", {
  id: uuid().default(sql`uuid_generate_v4()`).primaryKey().notNull(),
  createdAt,
  createdByUserId,
  updatedAt,
  updatedByUserId,
  deletedAt,
  deletedByUserId,
  name: text(),
  originalName: text(),
  website: text(),
  image: text(),
});
export type DbShow = typeof shows.$inferSelect;
export type DbShowInsert = typeof shows.$inferInsert;

export const templates = pgTable("templates", {
  id: uuid().default(sql`uuid_generate_v4()`).primaryKey().notNull(),
  createdAt,
  createdByUserId,
  updatedAt,
  updatedByUserId,
  deletedAt,
  deletedByUserId,
  showId: uuid().notNull(),
  type: integer().notNull(),
  seasons: text().array(),
  sourceEpisodeId: uuid().notNull(),
}, (table) => [
  index("idx_template_show_id").using(
    "btree",
    table.showId.asc().nullsLast().op("uuid_ops"),
  ),
  index("idx_template_source_episode_id").using(
    "btree",
    table.sourceEpisodeId.asc().nullsLast().op("uuid_ops"),
  ),
]);
export type DbTemplate = typeof templates.$inferSelect;
export type DbTemplateInsert = typeof templates.$inferInsert;

export const timestampTypes = pgTable("timestamp_types", {
  id: uuid().default(sql`uuid_generate_v4()`).primaryKey().notNull(),
  createdAt,
  createdByUserId,
  updatedAt,
  updatedByUserId,
  deletedAt,
  deletedByUserId,
  name: text().notNull(),
  description: text().notNull(),
});
export type DbTimestampType = typeof timestampTypes.$inferSelect;
export type DbTimestampTypeInsert = typeof timestampTypes.$inferInsert;

export const timestamps = pgTable("timestamps", {
  id: uuid().default(sql`uuid_generate_v4()`).primaryKey().notNull(),
  createdAt,
  createdByUserId,
  updatedAt,
  updatedByUserId,
  deletedAt,
  deletedByUserId,
  at: numeric(),
  typeId: uuid().notNull(),
  episodeId: uuid().notNull(),
  source: integer().default(0).notNull(),
});
export type DbTimestamp = typeof timestamps.$inferSelect;
export type DbTimestampInsert = typeof timestamps.$inferInsert;

export const preferences = pgTable("preferences", {
  id: uuid().default(sql`uuid_generate_v4()`).primaryKey().notNull(),
  createdAt,
  updatedAt,
  deletedAt,
  userId: uuid().notNull(),
  enableAutoSkip: boolean().default(true).notNull(),
  enableAutoPlay: boolean().default(true).notNull(),
  skipBranding: boolean().default(true).notNull(),
  skipIntros: boolean().default(true).notNull(),
  skipNewIntros: boolean().default(false).notNull(),
  skipMixedIntros: boolean().default(false).notNull(),
  skipRecaps: boolean().default(true).notNull(),
  skipFiller: boolean().default(true).notNull(),
  skipCanon: boolean().default(false).notNull(),
  skipTransitions: boolean().default(true).notNull(),
  skipCredits: boolean().default(true).notNull(),
  skipNewCredits: boolean().default(false).notNull(),
  skipMixedCredits: boolean().default(true).notNull(),
  skipPreview: boolean().default(true).notNull(),
  skipTitleCard: boolean().default(true).notNull(),
  minimizeToolbarWhenEditing: boolean().default(
    false,
  ).notNull(),
  hideTimelineWhenMinimized: boolean().default(
    false,
  ).notNull(),
  colorTheme: integer().default(1).notNull(),
});
export type DbPreferences = typeof preferences.$inferSelect;
export type DbPreferencesInsert = typeof preferences.$inferInsert;

export const externalLinks = pgTable("external_links", {
  url: text().notNull(),
  showId: uuid().notNull(),
}, (table) => [
  primaryKey({
    columns: [table.url, table.showId],
    name: "external_links_pkey",
  }),
]);
export type DbExternalLink = typeof externalLinks.$inferSelect;
export type DbExternalLinkInsert = typeof externalLinks.$inferInsert;

export const templateTimestamps = pgTable("template_timestamps", {
  templateId: uuid().notNull(),
  timestampId: uuid().notNull(),
}, (table) => [
  primaryKey({
    columns: [table.templateId, table.timestampId],
    name: "template_timestamps_pkey",
  }),
  unique("template_timestamps_timestamp_id_key").on(table.timestampId),
]);
export type DbTemplateTimestamp = typeof templateTimestamps.$inferSelect;
export type DbTemplateTimestampInsert = typeof templateTimestamps.$inferInsert;
