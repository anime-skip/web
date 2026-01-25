import {
  timestamps,
  templateTimestamps,
  type DbTimestamp,
} from "server/db/schema";
import type { AnimeSkipDatabase } from "./db";
import { and, inArray, isNull } from "drizzle-orm";
import type { TemplateTimestampService } from "./template-timestamp-service";

export interface TimestampService {
  softDeleteMany(
    tx: AnimeSkipDatabase,
    ids: string[],
    deletedByUserId: string,
    deletedAt: Date,
  ): Promise<DbTimestamp[]>;
  softDeleteCascade(
    tx: AnimeSkipDatabase,
    ids: string[],
    deletedByUserId: string,
    deletedAt: Date,
  ): Promise<DbTimestamp[]>;
}

export function createTimestampService({
  db: _,
  templateTimestampService,
}: {
  db: AnimeSkipDatabase;
  templateTimestampService: TemplateTimestampService;
}): TimestampService {
  const softDeleteMany: TimestampService["softDeleteMany"] = async (
    tx,
    ids,
    deletedByUserId,
    deletedAt,
  ) => {
    if (ids.length === 0) {
      return [];
    }
    const deleted = await tx
      .update(timestamps)
      .set({
        updatedAt: deletedAt.toISOString(),
        updatedByUserId: deletedByUserId,
        deletedAt: deletedAt.toISOString(),
        deletedByUserId,
      })
      .where(and(inArray(timestamps.id, ids), isNull(timestamps.deletedAt)))
      .returning();
    return deleted;
  };

  const softDeleteCascade: TimestampService["softDeleteCascade"] = async (
    tx,
    ids,
    deletedByUserId,
    deletedAt,
  ) => {
    if (ids.length === 0) {
      return [];
    }

    // 1. Soft delete the timestamps
    const deleted = await softDeleteMany(tx, ids, deletedByUserId, deletedAt);

    // 2. Find and delete related template timestamps
    const relatedTemplateTimestamps =
      await tx.query.templateTimestamps.findMany({
        where: inArray(templateTimestamps.timestampId, ids),
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
