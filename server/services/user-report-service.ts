import { userReports, type DbUserReport } from "server/db/schema";
import type { AnimeSkipDatabase } from "./db";
import { inArray } from "drizzle-orm";

export interface UserReportService {
  softDeleteMany(
    tx: AnimeSkipDatabase,
    ids: string[],
    deletedByUserId: string,
    deletedAt: Date,
  ): Promise<DbUserReport[]>;
  softDeleteCascade(
    tx: AnimeSkipDatabase,
    ids: string[],
    deletedByUserId: string,
    deletedAt: Date,
  ): Promise<DbUserReport[]>;
}

export function createUserReportService({
  db: _,
}: {
  db: AnimeSkipDatabase;
}): UserReportService {
  const softDeleteMany: UserReportService["softDeleteMany"] = async (
    tx,
    ids,
    deletedByUserId,
    deletedAt,
  ) => {
    const deleted = await tx
      .update(userReports)
      .set({
        updatedAt: deletedAt.toISOString(),
        updatedByUserId: deletedByUserId,
        deletedAt: deletedAt.toISOString(),
        deletedByUserId,
      })
      .where(inArray(userReports.id, ids))
      .returning();
    return deleted;
  };

  const softDeleteCascade: UserReportService["softDeleteCascade"] = async (
    tx,
    ids,
    deletedByUserId,
    deletedAt,
  ) => {
    // No-op cascade - user reports have nothing to cascade
    return softDeleteMany(tx, ids, deletedByUserId, deletedAt);
  };

  return {
    softDeleteMany,
    softDeleteCascade,
  };
}
