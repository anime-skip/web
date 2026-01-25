import type { DbExternalLink } from "server/db/schema";
import type { AnimeSkipDatabase } from "./db";
import { todo } from "shared/utils";

export interface ExternalLinkService {
  deleteMany(
    tx: AnimeSkipDatabase,
    keys: Array<{ url: string; showId: string }>,
  ): Promise<DbExternalLink>;
}

export function createExternalLinkService({
  db: _,
}: {
  db: AnimeSkipDatabase;
}): ExternalLinkService {
  const deleteMany: ExternalLinkService["deleteMany"] = async (_tx, _keys) => {
    todo();
  };

  return {
    deleteMany,
  };
}
