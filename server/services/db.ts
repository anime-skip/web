import { createLogger } from "@aklinker1/logger";
import { drizzle, BunSQLDatabase } from "drizzle-orm/bun-sql";
import { migrate } from "drizzle-orm/bun-sql/migrator";
import * as dbSchema from "server/db/schema";
import { seedDatabase } from "server/db/seed";
import { env } from "server/env";

const logger = createLogger("db");

export async function openAnimeSkipDatabase(): Promise<AnimeSkipDatabase> {
  const { DATABASE_URL, DATABASE_ENABLE_SEEDING } = env;
  if (!DATABASE_URL) throw Error("env.DATABASE_URL is required to open the database");

  logger.info("Opening database");
  const db = drizzle({
    connection: {
      url: DATABASE_URL,
      tls: true,
    },
    casing: "snake_case",
    // Uncomment to load SQL queries
    // logger: {
    //   logQuery: dbLogger.debug,
    // },
    schema: dbSchema,
  });

  logger.info("Running migrations");
  const migrateStart = Date.now();
  await migrate(db, {
    migrationsFolder: "server/db/drizzle",
  });
  logger.info("Migrations complete", { durationMs: Date.now() - migrateStart });

  // The jobs worker opens its own connection, only seed once
  if (DATABASE_ENABLE_SEEDING && Bun.isMainThread) await seedDatabase(db);

  return db;
}

export type AnimeSkipDatabase = BunSQLDatabase<typeof dbSchema>;
