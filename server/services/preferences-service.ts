import type { DbPreferences } from "server/db/schema";
import type { AnimeSkipDatabase } from "./db";
import { todo } from "shared/utils";

export interface PreferencesService {
  softDeleteMany(
    tx: AnimeSkipDatabase,
    ids: string[],
    deletedByUserId: string,
    deletedAt: Date,
  ): Promise<DbPreferences>;
}

export function createPreferencesService({
  db: _,
}: {
  db: AnimeSkipDatabase;
}): PreferencesService {
  const softDeleteMany: PreferencesService["softDeleteMany"] = async (
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
