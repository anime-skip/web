import Dataloader from "dataloader";
import { and, inArray, type SQL } from "drizzle-orm";
import type { PgTableWithColumns } from "drizzle-orm/pg-core";
import type { Database } from "server/services/db";

/**
 * Convert Gql inputs to a object that can be set when inserting or updating data. It removes any
 * `undefined` fields so they're not set, and keeps any null values so null can be saved in the DB.
 */
export function prepareGqlInputForDb<T extends Record<string, unknown>>(obj: T): StripNullish<T> {
  return Object.fromEntries(
    Object.entries(obj).filter(([_key, value]) => value !== undefined),
  ) as StripNullish<T>;
}

export type StripNullish<T> = {
  [K in keyof T]: Exclude<T[K], undefined | null>;
};

/**
 * Batches loads into a single `WHERE key IN (...)` query, returning every row that matches each key
 * (e.g. all timestamps for an episode). Rows within each group keep the order the query returned
 * them in. For keys that are unique, wrap the result with `unwrapOne`.
 */
export function createDrizzleDataloader<DbModel, GqlModel>(
  db: Database,
  // oxlint-lint-ignore no-explicit-any
  table: PgTableWithColumns<any>,
  groupKey: keyof DbModel,
  mapper: (db: DbModel) => GqlModel,
  options: { where?: SQL | (() => SQL | undefined); orderBy?: SQL } = {},
): Dataloader<string, GqlModel[]> {
  return new Dataloader<string, GqlModel[]>(async (ids) => {
    const keyFilter = inArray(table[groupKey as string], [...ids]);
    const extraWhere = typeof options.where === "function" ? options.where() : options.where;
    let query = db
      .select()
      .from(table)
      .where(extraWhere ? and(keyFilter, extraWhere) : keyFilter)
      .$dynamic();
    if (options.orderBy) query = query.orderBy(options.orderBy);
    const rows = (await query) as DbModel[];
    const groups = new Map<string, GqlModel[]>();
    for (const row of rows) {
      const key = String(row[groupKey]);
      const group = groups.get(key);
      if (group) group.push(mapper(row));
      else groups.set(key, [mapper(row)]);
    }
    return ids.map((id) => groups.get(id) ?? []);
  });
}

/**
 * Adapts a dataloader from `createDrizzleDataloader` for a unique key: `load` resolves the single
 * matching row, and rejects with `Row not found in <key>=<id>` when there isn't one. `loadMany`
 * returns an `Error` entry for missing rows, like Dataloader does for failed keys.
 */
export function unwrapOne<T>(
  loader: Dataloader<string, T[]>,
  key: PropertyKey,
): {
  load: (id: string) => Promise<T>;
  loadMany: (ids: string[]) => Promise<Array<T | Error>>;
} {
  const notFound = (id: string) => new Error(`Row not found in ${String(key)}=${id}`);
  return {
    load: async (id: string): Promise<T> => {
      const [row] = await loader.load(id);
      if (row === undefined) throw notFound(id);
      return row;
    },
    loadMany: async (ids: string[]): Promise<Array<T | Error>> => {
      const results = await loader.loadMany(ids);
      return results.map((rows, i) => {
        if (rows instanceof Error) return rows;
        return rows[0] ?? notFound(ids[i]);
      });
    },
  };
}
