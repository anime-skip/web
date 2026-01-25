import type { DbTemplateTimestamp } from "server/db/schema";
import type { AnimeSkipDatabase } from "./db";
import { todo } from "shared/utils";

export interface TemplateTimestampService {
  deleteMany(
    tx: AnimeSkipDatabase,
    keys: Array<{ templateId: string; timestampId: string }>,
  ): Promise<DbTemplateTimestamp>;
}

export function createTemplateTimestampService({
  db: _,
}: {
  db: AnimeSkipDatabase;
}): TemplateTimestampService {
  const deleteMany: TemplateTimestampService["deleteMany"] = async (
    _tx,
    _keys,
  ) => {
    todo();
  };

  return {
    deleteMany,
  };
}
