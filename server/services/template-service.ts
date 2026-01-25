import { templates, type DbTemplate } from "server/db/schema";
import type { AnimeSkipDatabase } from "./db";
import { inArray } from "drizzle-orm";

export interface TemplateService {
  softDeleteMany(
    tx: AnimeSkipDatabase,
    ids: string[],
    deletedByUserId: string,
    deletedAt: Date,
  ): Promise<DbTemplate[]>;
}

export function createTemplateService({
  db: _,
}: {
  db: AnimeSkipDatabase;
}): TemplateService {
  const softDeleteMany: TemplateService["softDeleteMany"] = async (
    tx,
    ids,
    deletedByUserId,
    deletedAt,
  ) => {
    const deleted = await tx
      .update(templates)
      .set({
        updatedAt: deletedAt.toISOString(),
        updatedByUserId: deletedByUserId,
        deletedAt: deletedAt.toISOString(),
        deletedByUserId,
      })
      .where(inArray(templates.id, ids))
      .returning();
    return deleted;
  };

  return {
    softDeleteMany,
  };
}
