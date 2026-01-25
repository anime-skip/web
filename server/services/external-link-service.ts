import { externalLinks, type DbExternalLink } from "server/db/schema";
import type { AnimeSkipDatabase } from "./db";
import { and, eq, or } from "drizzle-orm";

export interface ExternalLinkService {
  deleteMany(
    tx: AnimeSkipDatabase,
    keys: Array<{ url: string; showId: string }>,
  ): Promise<DbExternalLink[]>;
}

export function createExternalLinkService({
  db: _,
}: {
  db: AnimeSkipDatabase;
}): ExternalLinkService {
  const deleteMany: ExternalLinkService["deleteMany"] = async (tx, keys) => {
    if (keys.length === 0) {
      return [];
    }

    const conditions = keys.map((key) =>
      and(eq(externalLinks.url, key.url), eq(externalLinks.showId, key.showId)),
    );

    const deleted = await tx
      .delete(externalLinks)
      .where(or(...conditions))
      .returning();
    return deleted;
  };

  return {
    deleteMany,
  };
}
