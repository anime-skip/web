import { inArray } from "drizzle-orm";
import { showAdmins, type DbShowAdmin } from "server/db/schema";

import type { Database } from "./db";

export interface ShowAdminService {
  softDeleteMany(
    tx: Database,
    ids: string[],
    deletedByUserId: string,
    deletedAt: Date,
  ): Promise<DbShowAdmin[]>;
  softDeleteCascade(
    tx: Database,
    ids: string[],
    deletedByUserId: string,
    deletedAt: Date,
  ): Promise<DbShowAdmin[]>;
}

export function createShowAdminService({ db: _db }: { db: Database }): ShowAdminService {
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

  const softDeleteCascade: ShowAdminService["softDeleteCascade"] = async (
    tx,
    ids,
    deletedByUserId,
    deletedAt,
  ) => {
    // No-op cascade - show admins have no dependent entities
    return softDeleteMany(tx, ids, deletedByUserId, deletedAt);
  };

  return {
    softDeleteMany,
    softDeleteCascade,
  };
}
