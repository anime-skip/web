import { showAdmins, type DbShowAdmin } from "server/db/schema";
import type { AnimeSkipDatabase } from "./db";
import { inArray } from "drizzle-orm";

export interface ShowAdminService {
  softDeleteMany(
    tx: AnimeSkipDatabase,
    ids: string[],
    deletedByUserId: string,
    deletedAt: Date,
  ): Promise<DbShowAdmin[]>;
}

export function createShowAdminService({
  db: _,
}: {
  db: AnimeSkipDatabase;
}): ShowAdminService {
  const softDeleteMany: ShowAdminService["softDeleteMany"] = async (
    tx,
    ids,
    deletedByUserId,
    deletedAt,
  ) => {
    const deleted = await tx
      .update(showAdmins)
      .set({
        updatedAt: deletedAt.toISOString(),
        updatedByUserId: deletedByUserId,
        deletedAt: deletedAt.toISOString(),
        deletedByUserId,
      })
      .where(inArray(showAdmins.id, ids))
      .returning();
    return deleted;
  };

  return {
    softDeleteMany,
  };
}
