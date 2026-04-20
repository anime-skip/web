import { drizzle, BunSQLDatabase } from "drizzle-orm/bun-sql";
// import { migrate } from "drizzle-orm/bun-sql/migrator";
import * as dbSchema from "server/db/schema";
import { env } from "server/env";
import { logger } from "server/utils/logger";

const dbLogger = logger.extend("db");

export async function openAnimeSkipDatabase(): Promise<AnimeSkipDatabase> {
  dbLogger.info("Opening database...");
  const db = drizzle({
    connection: {
      url: env.DATABASE_URL,
      tls: true,
    },
    casing: "snake_case",
    // Uncomment to load SQL queries
    // logger: {
    //   logQuery: dbLogger.debug,
    // },
    schema: dbSchema,
  });

  // dbLogger.info("Running migrations...");
  // await migrate(db, {
  //   migrationsFolder: "server/drizzle",
  // });

  return db;
}

export type AnimeSkipDatabase = BunSQLDatabase<typeof dbSchema>;
