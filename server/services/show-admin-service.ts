import type { DbShowAdmin } from "server/db/schema";
import type { AnimeSkipDatabase } from "./db";
import { todo } from "shared/utils";

export interface ShowAdminService {
  softDeleteMany(
    tx: AnimeSkipDatabase,
    ids: string[],
    deletedByUserId: string,
    deletedAt: Date,
  ): Promise<DbShowAdmin>;
}

export function createShowAdminService({
  db: _,
}: {
  db: AnimeSkipDatabase;
}): ShowAdminService {
  const softDeleteMany: ShowAdminService["softDeleteMany"] = async (
    _tx,
    _ids,
    _deletedByUserId,
    _deletedAt,
  ) => {
    todo();
  };

  return {
    softDeleteMany,
  };
}
