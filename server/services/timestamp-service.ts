import { timestamps, type DbTimestamp } from "server/db/schema";
import type { AnimeSkipDatabase } from "./db";
import { inArray } from "drizzle-orm";

export interface TimestampService {
  softDeleteMany(
    tx: AnimeSkipDatabase,
    ids: string[],
    deletedByUserId: string,
    deletedAt: Date,
  ): Promise<DbTimestamp[]>;
}

export function createTimestampService({
  db: _,
}: {
  db: AnimeSkipDatabase;
}): TimestampService {
  const softDeleteMany: TimestampService["softDeleteMany"] = async (
    tx,
    ids,
    deletedByUserId,
    deletedAt,
  ) => {
    const deleted = await tx
      .update(timestamps)
      .set({
        updatedAt: deletedAt.toISOString(),
        updatedByUserId: deletedByUserId,
        deletedAt: deletedAt.toISOString(),
        deletedByUserId,
      })
      .where(inArray(timestamps.id, ids))
      .returning();
    return deleted;
  };

  return {
    softDeleteMany,
  };
}
