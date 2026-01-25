import type { DbTimestampType } from "server/db/schema";
import type { AnimeSkipDatabase } from "./db";
import { todo } from "shared/utils";

export interface TimestampTypeService {
  softDeleteMany(
    tx: AnimeSkipDatabase,
    ids: string[],
    deletedByUserId: string,
    deletedAt: Date,
  ): Promise<DbTimestampType>;
}

export function createTimestampTypeService({
  db: _,
}: {
  db: AnimeSkipDatabase;
}): TimestampTypeService {
  const softDeleteMany: TimestampTypeService["softDeleteMany"] = async (
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
