import { shows, type DbShow } from "server/db/schema";
import type { AnimeSkipDatabase } from "./db";
import { inArray } from "drizzle-orm";

export interface ShowService {
  softDeleteMany(
    tx: AnimeSkipDatabase,
    ids: string[],
    deletedByUserId: string,
    deletedAt: Date,
  ): Promise<DbShow[]>;
}

export function createShowService({
  db: _,
}: {
  db: AnimeSkipDatabase;
}): ShowService {
  const softDeleteMany: ShowService["softDeleteMany"] = async (
    tx,
    ids,
    deletedByUserId,
    deletedAt,
  ) => {
    const deleted = await tx
      .update(shows)
      .set({
        updatedAt: deletedAt.toISOString(),
        updatedByUserId: deletedByUserId,
        deletedAt: deletedAt.toISOString(),
        deletedByUserId,
      })
      .where(inArray(shows.id, ids))
      .returning();
    return deleted;
  };

  return {
    softDeleteMany,
  };
}
