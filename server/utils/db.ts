import { drizzle, NodePgDatabase } from "drizzle-orm/node-postgres";
import type {
  PgColumn,
  PgTableWithColumns,
  TableConfig,
} from "drizzle-orm/pg-core";
import { eq, inArray } from "drizzle-orm";
import { migrate } from "drizzle-orm/node-postgres/migrator";
import * as dbSchema from "server/db/schema.ts";
import { logger } from "server/utils/logger.ts";
import Dataloader from "dataloader";
import { todo } from "shared/utils.ts";

const dbLogger = logger.extend("db");

export async function openAnimeSkipDatabase(): Promise<AnimeSkipDatabase> {
  const url = Deno.env.get("AS_DATABASE_URL");
  if (!url) {
    logger.error("AS_DATABASE_URL environment variable not set");
    Deno.exit(1);
  }
  dbLogger.info("Opening database...");
  const db = drizzle(url, {
    casing: "snake_case",
    logger: {
      logQuery: dbLogger.debug,
    },
    schema: dbSchema,
  });

  // dbLogger.info("Running migrations...");
  // await migrate(db, {
  //   migrationsFolder: "server/drizzle",
  // });

  return db;
}

export type AnimeSkipDatabase = NodePgDatabase<typeof dbSchema>;

///
/// Utils
///

/**
 * Convert Gql inputs to a object that can be set when inserting or updating
 * data. It removes any `undefined` fields so they're not set, and keeps any
 * null values so null can be saved in the DB.
 */
export function prepareGqlInputForDb<T extends Record<string, unknown>>(
  obj: T,
): StripNullish<T> {
  return Object.fromEntries(
    Object.entries(obj).filter(([_, value]) => value !== undefined),
  ) as StripNullish<T>;
}

export type StripNullish<T> = {
  [K in keyof T]: Exclude<T[K], undefined | null>;
};

///
/// Dataloaders
///

export function createDrizzleDataloader<DbModel, GqlModel>(
  db: AnimeSkipDatabase,
  // deno-lint-ignore no-explicit-any
  table: PgTableWithColumns<any>,
  idKey: keyof DbModel,
  mapper: (db: DbModel) => GqlModel,
) {
  return new Dataloader(async (ids) => {
    // @ts-expect-error: We don't type the table, so there's a type error here
    const rows: DbModel[] = await db.select().from(table).where(
      inArray(table[idKey], [...ids]),
    );
    return rows.map(mapper);
  });
}

///
/// Deletes
///

export async function softDeleteApiClients(
  db: AnimeSkipDatabase,
  ids: string[],
  userId: string,
  now: Date,
): Promise<dbSchema.DbApiClient> {
  const [deleted] = await db.update(dbSchema.apiClients)
    .set({
      updatedAt: now.toISOString(),
      updatedByUserId: userId,
      deletedAt: now.toISOString(),
      deletedByUserId: userId,
    })
    .where(inArray(dbSchema.apiClients.id, ids))
    .returning();
  return deleted;
}

export async function softDeleteEpisodes(
  db: AnimeSkipDatabase,
  ids: string[],
  userId: string,
  now: Date,
): Promise<dbSchema.DbEpisode> {
  todo();
}

export async function hardDeleteEpisodeUrls(
  db: AnimeSkipDatabase,
  urls: string[],
): Promise<dbSchema.DbEpisodeUrl> {
  todo();
}

export async function hardDeleteExternalLinks(
  db: AnimeSkipDatabase,
  compoundIds: Array<{ url: string; showId: string }>,
): Promise<dbSchema.DbExternalLink> {
  todo();
}

export async function softDeletePreferences(
  db: AnimeSkipDatabase,
  ids: string[],
  userId: string,
  now: Date,
): Promise<dbSchema.DbPreferences> {
  todo();
}

export async function softDeleteShowAdmins(
  db: AnimeSkipDatabase,
  ids: string[],
  userId: string,
  now: Date,
): Promise<dbSchema.DbShowAdmin> {
  todo();
}

export async function softDeleteShows(
  db: AnimeSkipDatabase,
  ids: string[],
  userId: string,
  now: Date,
): Promise<dbSchema.DbShow> {
  todo();
}

export async function softDeleteTemplates(
  db: AnimeSkipDatabase,
  ids: string[],
  userId: string,
  now: Date,
): Promise<dbSchema.DbTemplate> {
  todo();
}

export async function hardDeleteTemplateTimestamps(
  db: AnimeSkipDatabase,
  compoundIds: Array<{ templateId: string; timestampId: string }>,
): Promise<dbSchema.DbTemplateTimestamp> {
  todo();
}

export async function softDeleteTimestamps(
  db: AnimeSkipDatabase,
  ids: string[],
  userId: string,
  now: Date,
): Promise<dbSchema.DbTimestamp> {
  todo();
}

export async function softDeleteTimestampTypes(
  db: AnimeSkipDatabase,
  ids: string[],
  userId: string,
  now: Date,
): Promise<dbSchema.DbTimestampType> {
  todo();
}

export async function softDeleteUserReports(
  db: AnimeSkipDatabase,
  ids: string[],
  userId: string,
  now: Date,
): Promise<dbSchema.DbUserReport> {
  todo();
}

export async function softDeleteUsers(
  db: AnimeSkipDatabase,
  ids: string[],
  userId: string,
  now: Date,
): Promise<dbSchema.DbUser> {
  todo();
}
