import type { DbShow } from "server/db/schema";
import type { AnimeSkipDatabase } from "./db";
import { todo } from "shared/utils";

export interface ShowService {
  softDeleteMany(
    tx: AnimeSkipDatabase,
    ids: string[],
    deletedByUserId: string,
    deletedAt: Date,
  ): Promise<DbShow>;
}

export function createShowService({
  db: _,
}: {
  db: AnimeSkipDatabase;
}): ShowService {
  const softDeleteMany: ShowService["softDeleteMany"] = async (
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
