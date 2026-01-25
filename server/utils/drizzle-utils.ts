import type { PgTableWithColumns } from "drizzle-orm/pg-core";
import { inArray } from "drizzle-orm";
import Dataloader from "dataloader";
import type { AnimeSkipDatabase } from "server/services/db";

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

export function createDrizzleDataloader<DbModel, GqlModel>(
  db: AnimeSkipDatabase,
  // oxlint-lint-ignore no-explicit-any
  table: PgTableWithColumns<any>,
  idKey: keyof DbModel,
  mapper: (db: DbModel) => GqlModel,
) {
  return new Dataloader(async (ids) => {
    const rows: DbModel[] = await db
      .select()
      .from(table)
      .where(inArray(table[idKey], [...ids]));
    return rows.map(mapper);
  });
}
