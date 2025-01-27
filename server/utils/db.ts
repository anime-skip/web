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

export async function softDeleteApiClient(
  db: AnimeSkipDatabase,
  id: string,
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
    .where(eq(dbSchema.apiClients.id, id))
    .returning();
  return deleted;
}
