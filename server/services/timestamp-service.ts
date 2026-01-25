import type { DbTimestamp } from "server/db/schema";
import type { AnimeSkipDatabase } from "./db";
import { todo } from "shared/utils";

export interface TimestampService {
  softDeleteMany(
    tx: AnimeSkipDatabase,
    ids: string[],
    deletedByUserId: string,
    deletedAt: Date,
  ): Promise<DbTimestamp>;
}

export function createTimestampService({
  db: _,
}: {
  db: AnimeSkipDatabase;
}): TimestampService {
  const softDeleteMany: TimestampService["softDeleteMany"] = async (
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
