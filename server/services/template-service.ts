import {
  templates,
  templateTimestamps,
  type DbTemplate,
} from "server/db/schema";
import type { AnimeSkipDatabase } from "./db";
import { and, inArray, isNull } from "drizzle-orm";
import type { TemplateTimestampService } from "./template-timestamp-service";

export interface TemplateService {
  softDeleteMany(
    tx: AnimeSkipDatabase,
    ids: string[],
    deletedByUserId: string,
    deletedAt: Date,
  ): Promise<DbTemplate[]>;
  softDeleteCascade(
    tx: AnimeSkipDatabase,
    ids: string[],
    deletedByUserId: string,
    deletedAt: Date,
  ): Promise<DbTemplate[]>;
}

export function createTemplateService({
  db: _,
  templateTimestampService,
}: {
  db: AnimeSkipDatabase;
  templateTimestampService: TemplateTimestampService;
}): TemplateService {
  const softDeleteMany: TemplateService["softDeleteMany"] = async (
    tx,
    ids,
    deletedByUserId,
    deletedAt,
  ) => {
    if (ids.length === 0) {
      return [];
    }
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

  const softDeleteCascade: TemplateService["softDeleteCascade"] = async (
    tx,
    ids,
    deletedByUserId,
    deletedAt,
  ) => {
    if (ids.length === 0) {
      return [];
    }

    // 1. Soft delete the templates
    const deleted = await softDeleteMany(tx, ids, deletedByUserId, deletedAt);

    // 2. Find and delete related template timestamps
    const relatedTemplateTimestamps =
      await tx.query.templateTimestamps.findMany({
        where: inArray(templateTimestamps.templateId, ids),
      });
    if (relatedTemplateTimestamps.length > 0) {
      await templateTimestampService.deleteCascade(
        tx,
        relatedTemplateTimestamps.map((tt) => ({
          templateId: tt.templateId,
          timestampId: tt.timestampId,
        })),
      );
    }

    return deleted;
  };

  return {
    softDeleteMany,
    softDeleteCascade,
  };
}
