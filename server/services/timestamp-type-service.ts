import { inArray } from "drizzle-orm";
import { timestampTypes, type DbTimestampType } from "server/db/schema";

import type { Database } from "./db";

export interface TimestampTypeService {
  softDeleteMany(
    tx: Database,
    ids: string[],
    deletedByUserId: string,
    deletedAt: Date,
  ): Promise<DbTimestampType[]>;
  softDeleteCascade(
    tx: Database,
    ids: string[],
    deletedByUserId: string,
    deletedAt: Date,
  ): Promise<DbTimestampType[]>;
}

export function createTimestampTypeService({ db: _db }: { db: Database }): TimestampTypeService {
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

  const softDeleteCascade: TimestampTypeService["softDeleteCascade"] = async (
    tx,
    ids,
    deletedByUserId,
    deletedAt,
  ) => {
    // Since timestamp types are soft deleted, we don't need to update existing timestamps to a
    // different type. They'll stay the same type, that type just won't be returned by
    // allTimestampTypes anymore.
    return softDeleteMany(tx, ids, deletedByUserId, deletedAt);
  };

  return {
    softDeleteMany,
    softDeleteCascade,
  };
}
