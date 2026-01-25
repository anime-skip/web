import {
  episodes,
  templates,
  timestamps,
  episodeUrls,
  type DbEpisode,
} from "server/db/schema";
import type { AnimeSkipDatabase } from "./db";
import { inArray, isNull, and } from "drizzle-orm";
import type { TemplateService } from "./template-service";
import type { TimestampService } from "./timestamp-service";
import type { EpisodeUrlService } from "./episode-url-service";

export interface EpisodeService {
  softDeleteMany(
    tx: AnimeSkipDatabase,
    ids: string[],
    deletedByUserId: string,
    deletedAt: Date,
  ): Promise<DbEpisode[]>;
  softDeleteCascade(
    tx: AnimeSkipDatabase,
    ids: string[],
    deletedByUserId: string,
    deletedAt: Date,
  ): Promise<DbEpisode[]>;
}

export function createEpisodeService({
  db: _,
  templateService,
  timestampService,
  episodeUrlService,
}: {
  db: AnimeSkipDatabase;
  templateService: TemplateService;
  timestampService: TimestampService;
  episodeUrlService: EpisodeUrlService;
}): EpisodeService {
  const softDeleteMany: EpisodeService["softDeleteMany"] = async (
    tx,
    ids,
    deletedByUserId,
    deletedAt,
  ) => {
    if (ids.length === 0) {
      return [];
    }
    const deleted = await tx
      .update(episodes)
      .set({
        updatedAt: deletedAt.toISOString(),
        updatedByUserId: deletedByUserId,
        deletedAt: deletedAt.toISOString(),
        deletedByUserId,
      })
      .where(inArray(episodes.id, ids))
      .returning();
    return deleted;
  };

  const softDeleteCascade: EpisodeService["softDeleteCascade"] = async (
    tx,
    ids,
    deletedByUserId,
    deletedAt,
  ) => {
    if (ids.length === 0) {
      return [];
    }

    // 1. Soft delete the episodes
    const deleted = await softDeleteMany(tx, ids, deletedByUserId, deletedAt);

    // 2. Find and cascade delete related templates (by sourceEpisodeId)
    const relatedTemplates = await tx.query.templates.findMany({
      where: and(
        inArray(templates.sourceEpisodeId, ids),
        isNull(templates.deletedAt),
      ),
    });
    if (relatedTemplates.length > 0) {
      await templateService.softDeleteCascade(
        tx,
        relatedTemplates.map((t) => t.id),
        deletedByUserId,
        deletedAt,
      );
    }

    // 3. Find and cascade delete related timestamps
    const relatedTimestamps = await tx.query.timestamps.findMany({
      where: and(
        inArray(timestamps.episodeId, ids),
        isNull(timestamps.deletedAt),
      ),
    });
    if (relatedTimestamps.length > 0) {
      await timestampService.softDeleteCascade(
        tx,
        relatedTimestamps.map((t) => t.id),
        deletedByUserId,
        deletedAt,
      );
    }

    // 4. Find and delete related episode URLs (hard delete)
    const relatedEpisodeUrls = await tx.query.episodeUrls.findMany({
      where: inArray(episodeUrls.episodeId, ids),
    });
    if (relatedEpisodeUrls.length > 0) {
      await episodeUrlService.deleteCascade(
        tx,
        relatedEpisodeUrls.map((eu) => eu.url),
      );
    }

    return deleted;
  };

  return {
    softDeleteMany,
    softDeleteCascade,
  };
}
