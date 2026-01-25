import {
  shows,
  showAdmins,
  templates,
  episodes,
  externalLinks,
  type DbShow,
} from "server/db/schema";
import type { AnimeSkipDatabase } from "./db";
import { inArray, isNull, and } from "drizzle-orm";
import type { ShowAdminService } from "./show-admin-service";
import type { TemplateService } from "./template-service";
import type { EpisodeService } from "./episode-service";
import type { ExternalLinkService } from "./external-link-service";

export interface ShowService {
  softDeleteMany(
    tx: AnimeSkipDatabase,
    ids: string[],
    deletedByUserId: string,
    deletedAt: Date,
  ): Promise<DbShow[]>;
  softDeleteCascade(
    tx: AnimeSkipDatabase,
    ids: string[],
    deletedByUserId: string,
    deletedAt: Date,
  ): Promise<DbShow[]>;
}

export function createShowService({
  db: _,
  showAdminService,
  templateService,
  episodeService,
  externalLinkService,
}: {
  db: AnimeSkipDatabase;
  showAdminService: ShowAdminService;
  templateService: TemplateService;
  episodeService: EpisodeService;
  externalLinkService: ExternalLinkService;
}): ShowService {
  const softDeleteMany: ShowService["softDeleteMany"] = async (
    tx,
    ids,
    deletedByUserId,
    deletedAt,
  ) => {
    if (ids.length === 0) {
      return [];
    }
    const deleted = await tx
      .update(shows)
      .set({
        updatedAt: deletedAt.toISOString(),
        updatedByUserId: deletedByUserId,
        deletedAt: deletedAt.toISOString(),
        deletedByUserId,
      })
      .where(inArray(shows.id, ids))
      .returning();
    return deleted;
  };

  const softDeleteCascade: ShowService["softDeleteCascade"] = async (
    tx,
    ids,
    deletedByUserId,
    deletedAt,
  ) => {
    if (ids.length === 0) {
      return [];
    }

    // 1. Soft delete the shows
    const deleted = await softDeleteMany(tx, ids, deletedByUserId, deletedAt);

    // 2. Find and cascade delete related show admins
    const relatedShowAdmins = await tx.query.showAdmins.findMany({
      where: and(inArray(showAdmins.showId, ids), isNull(showAdmins.deletedAt)),
    });
    if (relatedShowAdmins.length > 0) {
      await showAdminService.softDeleteCascade(
        tx,
        relatedShowAdmins.map((sa) => sa.id),
        deletedByUserId,
        deletedAt,
      );
    }

    // 3. Find and cascade delete related templates
    const relatedTemplates = await tx.query.templates.findMany({
      where: and(inArray(templates.showId, ids), isNull(templates.deletedAt)),
    });
    if (relatedTemplates.length > 0) {
      await templateService.softDeleteCascade(
        tx,
        relatedTemplates.map((t) => t.id),
        deletedByUserId,
        deletedAt,
      );
    }

    // 4. Find and cascade delete related episodes
    const relatedEpisodes = await tx.query.episodes.findMany({
      where: and(inArray(episodes.showId, ids), isNull(episodes.deletedAt)),
    });
    if (relatedEpisodes.length > 0) {
      await episodeService.softDeleteCascade(
        tx,
        relatedEpisodes.map((e) => e.id),
        deletedByUserId,
        deletedAt,
      );
    }

    // 5. Find and delete related external links (hard delete)
    const relatedExternalLinks = await tx.query.externalLinks.findMany({
      where: inArray(externalLinks.showId, ids),
    });
    if (relatedExternalLinks.length > 0) {
      await externalLinkService.deleteCascade(
        tx,
        relatedExternalLinks.map((el) => ({ url: el.url, showId: el.showId })),
      );
    }

    return deleted;
  };

  return {
    softDeleteMany,
    softDeleteCascade,
  };
}
