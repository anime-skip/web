import { timestampTypes, type DbTimestampType } from "server/db/schema";
import type { AnimeSkipDatabase } from "./db";
import { inArray } from "drizzle-orm";

export interface TimestampTypeService {
  softDeleteMany(
    tx: AnimeSkipDatabase,
    ids: string[],
    deletedByUserId: string,
    deletedAt: Date,
  ): Promise<DbTimestampType[]>;
}

export function createTimestampTypeService({
  db: _,
}: {
  db: AnimeSkipDatabase;
}): TimestampTypeService {
  const softDeleteMany: TimestampTypeService["softDeleteMany"] = async (
    tx,
    ids,
    deletedByUserId,
    deletedAt,
  ) => {
    const deleted = await tx
      .update(timestampTypes)
      .set({
        updatedAt: deletedAt.toISOString(),
        updatedByUserId: deletedByUserId,
        deletedAt: deletedAt.toISOString(),
        deletedByUserId,
      })
      .where(inArray(timestampTypes.id, ids))
      .returning();
    return deleted;
  };

  return {
    softDeleteMany,
  };
}
