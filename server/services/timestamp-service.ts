import {
  timestamps,
  templateTimestamps,
  type DbTimestamp,
  type DbTimestampInsert,
} from "server/db/schema";
import type { AnimeSkipDatabase } from "./db";
import { and, eq, inArray, isNull } from "drizzle-orm";
import type { TemplateTimestampService } from "./template-timestamp-service";

export interface TimestampService {
  updateAll(
    tx: AnimeSkipDatabase,
    create: Omit<DbTimestampInsert, "id">[],
    update: Array<{ id: string; updates: Partial<DbTimestampInsert> }>,
    deleteIds: string[],
    userId: string,
    now: Date,
  ): Promise<{
    created: DbTimestamp[];
    updated: DbTimestamp[];
    deleted: DbTimestamp[];
  }>;
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
  const updateAll: TimestampService["updateAll"] = async (
    tx,
    create,
    update,
    deleteIds,
    userId,
    now,
  ) => {
    const created: DbTimestamp[] = [];
    const updated: DbTimestamp[] = [];
    const deleted: DbTimestamp[] = [];

    // Create timestamps
    for (const toCreate of create) {
      const [row] = await tx
        .insert(timestamps)
        .values({
          ...toCreate,
          createdAt: now.toISOString(),
          createdByUserId: userId,
          updatedAt: now.toISOString(),
          updatedByUserId: userId,
        })
        .returning();
      created.push(row);
    }

    // Update timestamps
    for (const toUpdate of update) {
      const [row] = await tx
        .update(timestamps)
        .set({
          ...toUpdate.updates,
          updatedAt: now.toISOString(),
          updatedByUserId: userId,
        })
        .where(eq(timestamps.id, toUpdate.id))
        .returning();
      if (row) {
        updated.push(row);
      }
    }

    // Delete timestamps (soft delete with cascade)
    if (deleteIds.length > 0) {
      const deletedRows = await softDeleteCascade(tx, deleteIds, userId, now);
      deleted.push(...deletedRows);
    }

    return { created, updated, deleted };
  };

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
    updateAll,
    softDeleteMany,
    softDeleteCascade,
  };
}
