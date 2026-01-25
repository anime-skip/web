import {
  type DbApiClient,
  DbColorTheme,
  type DbEpisode,
  DbEpisodeSource,
  type DbEpisodeUrl,
  type DbPreferences,
  type DbShow,
  type DbShowAdmin,
  DbTemplateType,
  DbTimestampSource,
  type DbTimestampType,
  type DbUser,
  DbUserRole,
} from "server/db/schema";
import type { DbTimestamp } from "server/db/schema";
import type { DbTemplateTimestamp } from "server/db/schema";
import type { DbExternalLink } from "server/db/schema";
import type { DbTemplate } from "server/db/schema";
import type { DbUserReport } from "server/db/schema";
import type { NoOptionals } from "shared/types";
import { todo } from "shared/utils";

type TypeSafeGqlMapping<T> = NoOptionals<Omit<T, "__typename">>;
// type TypeSafeDbMapping<T> = NoOptionals<T>;

// oxlint-lint-ignore no-explicit-any
const unresolved = Symbol("Needs resolved by GrahpQL") as any;

export function mapDbUserToGqlUser(db: DbUser): GqlUser {
  return {
    id: db.id,
    createdAt: db.createdAt,
    profileUrl: db.profileUrl,
    adminOfShows: unresolved,
    username: db.username,
    deletedAt: db.deletedAt,
  } satisfies TypeSafeGqlMapping<GqlUser>;
}

export function mapDbUserRoleToGqlRole(db: DbUserRole): GqlRole {
  switch (db) {
    case DbUserRole.Admin:
      return "ADMIN";
    case DbUserRole.Dev:
      return "DEV";
    case DbUserRole.Reviewer:
      return "REVIEWER";
    case DbUserRole.User:
      return "USER";
  }
  throw Error("Unknown DbUserRole: " + db);
}

export function mapDbUserToGqlAccount(db: DbUser): GqlAccount {
  return {
    id: db.id,
    createdAt: db.createdAt,
    deletedAt: db.deletedAt,
    username: db.username,
    email: db.email,
    profileUrl: db.profileUrl,
    adminOfShows: unresolved,
    emailVerified: db.emailVerified,
    role: mapDbUserRoleToGqlRole(db.role),
    preferences: unresolved,
  } satisfies TypeSafeGqlMapping<GqlAccount>;
}

export function mapGqlRoleToDbUserRole(gql: GqlRole): DbUserRole {
  switch (gql) {
    case "ADMIN":
      return DbUserRole.Admin;
    case "DEV":
      return DbUserRole.Dev;
    case "REVIEWER":
      return DbUserRole.Reviewer;
    case "USER":
      return DbUserRole.User;
  }
  throw Error("Unknown GqlRole: " + gql);
}

export function mapDbPreferencesToGqlPreferences(
  db: DbPreferences,
): GqlPreferences {
  return {
    id: db.id,
    createdAt: db.createdAt,
    updatedAt: db.updatedAt,
    deletedAt: db.deletedAt,
    userId: db.userId,
    user: unresolved,
    enableAutoSkip: db.enableAutoSkip,
    enableAutoPlay: db.enableAutoPlay,
    minimizeToolbarWhenEditing: db.minimizeToolbarWhenEditing,
    hideTimelineWhenMinimized: db.hideTimelineWhenMinimized,
    colorTheme: mapDbColorThemeToGqlColorTheme(db.colorTheme),
    skipBranding: db.skipBranding,
    skipIntros: db.skipIntros,
    skipNewIntros: db.skipNewIntros,
    skipMixedIntros: db.skipMixedIntros,
    skipRecaps: db.skipRecaps,
    skipFiller: db.skipFiller,
    skipCanon: db.skipCanon,
    skipTransitions: db.skipTransitions,
    skipCredits: db.skipCredits,
    skipNewCredits: db.skipNewCredits,
    skipMixedCredits: db.skipMixedCredits,
    skipPreview: db.skipPreview,
    skipTitleCard: db.skipTitleCard,
  } satisfies TypeSafeGqlMapping<GqlPreferences>;
}

export function mapDbColorThemeToGqlColorTheme(
  db: DbColorTheme,
): GqlColorTheme {
  switch (db) {
    case DbColorTheme.AnimeSkipBlue:
      return "ANIME_SKIP_BLUE";
    case DbColorTheme.CrunchyrollOrange:
      return "CRUNCHYROLL_ORANGE";
    case DbColorTheme.FunimationPurple:
      return "FUNIMATION_PURPLE";
    case DbColorTheme.PerService:
      return "PER_SERVICE";
    case DbColorTheme.VrvYellow:
      return "VRV_YELLOW";
  }
  throw Error("Unknown DbColorTheme: " + db);
}

export function mapGqlColorThemeToDbColorTheme(
  gql: GqlColorTheme,
): DbColorTheme {
  switch (gql) {
    case "ANIME_SKIP_BLUE":
      return DbColorTheme.AnimeSkipBlue;
    case "CRUNCHYROLL_ORANGE":
      return DbColorTheme.CrunchyrollOrange;
    case "FUNIMATION_PURPLE":
      return DbColorTheme.FunimationPurple;
    case "PER_SERVICE":
      return DbColorTheme.PerService;
    case "VRV_YELLOW":
      return DbColorTheme.VrvYellow;
  }
  throw Error("Unknown GqlColorTheme: " + gql);
}

export function mapDbApiClientToGqlApiClient(db: DbApiClient): GqlApiClient {
  return {
    id: db.id,
    createdAt: db.createdAt,
    createdByUserId: db.createdByUserId,
    createdBy: unresolved,
    updatedAt: db.updatedAt,
    updatedByUserId: db.updatedByUserId,
    updatedBy: unresolved,
    deletedAt: db.deletedAt,
    deletedByUserId: db.deletedByUserId,
    deletedBy: unresolved,
    userId: db.userId,
    user: unresolved,
    appName: db.appName,
    description: db.description,
    rateLimitRpm: db.rateLimitRpm,
  } satisfies TypeSafeGqlMapping<GqlApiClient>;
}

export function mapDbUserReportToGqlUserReport(
  db: DbUserReport,
): GqlUserReport {
  return {
    id: db.id,
    createdAt: db.createdAt,
    createdByUserId: db.createdByUserId,
    createdBy: unresolved,
    updatedAt: db.updatedAt,
    updatedByUserId: db.updatedByUserId,
    updatedBy: unresolved,
    deletedAt: db.deletedAt,
    deletedByUserId: db.deletedByUserId,
    deletedBy: unresolved,
    message: db.message,
    reportedFromUrl: db.reportedFromUrl,
    resolved: db.resolved,
    resolvedMessage: db.resolvedMessage,
    timestampId: db.timestampId,
    timestamp: unresolved,
    episodeId: db.episodeId,
    episode: unresolved,
    episodeUrlString: db.episodeUrl,
    episodeUrl: unresolved,
    showId: db.showId,
    show: unresolved,
  } satisfies TypeSafeGqlMapping<GqlUserReport>;
}

export function mapDbEpisodeUrlToGqlEpisodeUrl(
  db: DbEpisodeUrl,
): GqlEpisodeUrl {
  return {
    url: db.url,
    createdAt: db.createdAt,
    createdByUserId: db.createdByUserId,
    createdBy: unresolved,
    updatedAt: db.updatedAt,
    updatedByUserId: db.updatedByUserId,
    updatedBy: unresolved,
    duration: Number(db.duration),
    timestampsOffset: Number(db.timestampsOffset),
    episodeId: db.episodeId,
    episode: unresolved,
    source: mapDbEpisodeSourceToGqlEpisodeSource(db.source),
  } satisfies TypeSafeGqlMapping<GqlEpisodeUrl>;
}

export function mapUrlToDbEpisodeSource(url: string): DbEpisodeSource {
  if (url.includes("vrv")) {
    return DbEpisodeSource.Vrv;
  }
  if (url.includes("funimation")) {
    return DbEpisodeSource.Funimation;
  }
  if (url.includes("crunchyroll")) {
    return DbEpisodeSource.Crunchyroll;
  }
  return DbEpisodeSource.Unknown;
}

export function mapDbEpisodeToGqlEpisode(db: DbEpisode): GqlEpisode {
  return {
    id: db.id,
    createdAt: db.createdAt,
    createdByUserId: db.createdByUserId,
    createdBy: unresolved,
    updatedAt: db.updatedAt,
    updatedByUserId: db.updatedByUserId,
    updatedBy: unresolved,
    deletedAt: db.deletedAt,
    deletedByUserId: db.deletedByUserId,
    deletedBy: unresolved,
    season: db.season,
    number: db.number,
    absoluteNumber: db.absoluteNumber,
    baseDuration: Number(db.baseDuration),
    name: db.name,
    show: unresolved,
    showId: db.showId,
    timestamps: unresolved,
    urls: unresolved,
    template: unresolved,
    userReports: unresolved,
  } satisfies TypeSafeGqlMapping<GqlEpisode>;
}

export function mapDbEpisodeSourceToGqlEpisodeSource(
  db: DbEpisodeSource,
): GqlEpisodeSource {
  switch (db) {
    case DbEpisodeSource.Crunchyroll:
      return "CRUNCHYROLL";
    case DbEpisodeSource.Funimation:
      return "FUNIMATION";
    case DbEpisodeSource.Unknown:
      return "UNKNOWN";
    case DbEpisodeSource.Vrv:
      return "VRV";
  }
  throw Error("Unknown DbEpisodeSource: " + db);
}

export function mapGqlEpisodeSourceToDbEpisodeSource(
  gql: GqlEpisodeSource,
): DbEpisodeSource {
  switch (gql) {
    case "CRUNCHYROLL":
      return DbEpisodeSource.Crunchyroll;
    case "FUNIMATION":
      return DbEpisodeSource.Funimation;
    case "UNKNOWN":
      return DbEpisodeSource.Unknown;
    case "VRV":
      return DbEpisodeSource.Vrv;
  }
  throw Error("Unknown GqlEpisodeSource: " + gql);
}

export function mapDbShowAdminToGqlShowAdmin(db: DbShowAdmin): GqlShowAdmin {
  return {
    id: db.id,
    createdAt: db.createdAt,
    createdByUserId: db.createdByUserId,
    createdBy: unresolved,
    updatedAt: db.updatedAt,
    updatedByUserId: db.updatedByUserId,
    updatedBy: unresolved,
    deletedAt: db.deletedAt,
    deletedByUserId: db.deletedByUserId,
    deletedBy: unresolved,
    showId: db.showId,
    show: unresolved,
    userId: db.userId,
    user: unresolved,
  } satisfies TypeSafeGqlMapping<GqlShowAdmin>;
}

export function mapDbShowToGqlShow(db: DbShow): GqlShow {
  // TODO: Add migration to fix this at the DB layer
  if (db.name == null) {
    throw Error("DbShow.name is required, but got: " + db.name);
  }

  return {
    id: db.id,
    createdAt: db.createdAt,
    createdByUserId: db.createdByUserId,
    createdBy: unresolved,
    updatedAt: db.updatedAt,
    updatedByUserId: db.updatedByUserId,
    updatedBy: unresolved,
    deletedAt: db.deletedAt,
    deletedByUserId: db.deletedByUserId,
    deletedBy: unresolved,
    name: db.name,
    originalName: db.originalName,
    website: db.website,
    image: db.image,
    admins: unresolved,
    episodes: unresolved,
    templates: unresolved,
    externalLinks: unresolved,
    seasonCount: unresolved,
    episodeCount: unresolved,
  } satisfies TypeSafeGqlMapping<GqlShow>;
}

export function mapDbTemplateToGqlTemplate(db: DbTemplate): GqlTemplate {
  return {
    id: db.id,
    createdAt: db.createdAt,
    createdByUserId: db.createdByUserId,
    createdBy: unresolved,
    updatedAt: db.updatedAt,
    updatedByUserId: db.updatedByUserId,
    updatedBy: unresolved,
    deletedAt: db.deletedAt,
    deletedByUserId: db.deletedByUserId,
    deletedBy: unresolved,
    showId: db.showId,
    show: unresolved,
    type: mapDbTemplateTypeToGqlTemplateType(db.type),
    seasons: db.seasons,
    sourceEpisodeId: db.sourceEpisodeId,
    sourceEpisode: unresolved,
    timestamps: unresolved,
    timestampIds: unresolved,
  } satisfies TypeSafeGqlMapping<GqlTemplate>;
}

export function mapDbTemplateTypeToGqlTemplateType(
  db: DbTemplateType,
): GqlTemplateType {
  switch (db) {
    case DbTemplateType.Seasons:
      return "SEASONS";
    case DbTemplateType.Show:
      return "SHOW";
  }
  throw Error("Unknown DbEpisodeSource: " + db);
}

export function mapGqlTemplateTypeToDbTemplateType(
  gql: GqlTemplateType,
): DbTemplateType {
  switch (gql) {
    case "SEASONS":
      return DbTemplateType.Seasons;
    case "SHOW":
      return DbTemplateType.Show;
  }
  throw Error("Unknown GqlTemplateType: " + gql);
}

export function mapDbTimestampTypeToGqlTimestampType(
  db: DbTimestampType,
): GqlTimestampType {
  return {
    id: db.id,
    createdAt: db.createdAt,
    createdByUserId: db.createdByUserId,
    createdBy: unresolved,
    updatedAt: db.updatedAt,
    updatedByUserId: db.updatedByUserId,
    updatedBy: unresolved,
    deletedAt: db.deletedAt,
    deletedByUserId: db.deletedByUserId,
    deletedBy: unresolved,
    name: db.name,
    description: db.description,
  } satisfies TypeSafeGqlMapping<GqlTimestampType>;
}

export function mapDbTimestampToGqlTimestamp(db: DbTimestamp): GqlTimestamp {
  return {
    id: db.id,
    createdAt: db.createdAt,
    createdByUserId: db.createdByUserId,
    createdBy: unresolved,
    updatedAt: db.updatedAt,
    updatedByUserId: db.updatedByUserId,
    updatedBy: unresolved,
    deletedAt: db.deletedAt,
    deletedByUserId: db.deletedByUserId,
    deletedBy: unresolved,
    at: Number(db.at),
    source: mapDbTimestampSourceToGqlTimestampSource(db.source),
    typeId: db.typeId,
    type: unresolved,
    episodeId: db.episodeId,
    episode: unresolved,
  } satisfies TypeSafeGqlMapping<GqlTimestamp>;
}

export function mapDbTimestampSourceToGqlTimestampSource(
  db: DbTimestampSource,
): GqlTimestampSource {
  switch (db) {
    case DbTimestampSource.AnimeSkip:
      return "ANIME_SKIP";
    case DbTimestampSource.BetterVrv:
      return "BETTER_VRV";
  }
  throw Error("Unknown TimestampSource: " + db);
}

export function mapGqlTimestampSourceToDbTimestampSource(
  gql: GqlTimestampSource,
): DbTimestampSource {
  switch (gql) {
    case "ANIME_SKIP":
      return DbTimestampSource.AnimeSkip;
    case "BETTER_VRV":
      return DbTimestampSource.BetterVrv;
  }
  throw Error("Unknown GqlTimestampSource: " + gql);
}

export function mapDbExternalLinkToGqlExternalLink(
  db: DbExternalLink,
): GqlExternalLink {
  return {
    url: db.url,
    showId: db.showId,
    show: unresolved,
    service: unresolved,
    serviceId: unresolved,
  } satisfies TypeSafeGqlMapping<GqlExternalLink>;
}

export function mapDbTemplateTimestampToGqlTemplateTimestamp(
  db: DbTemplateTimestamp,
): GqlTemplateTimestamp {
  return {
    templateId: db.templateId,
    template: unresolved,
    timestampId: db.timestampId,
    timestamp: unresolved,
  } satisfies TypeSafeGqlMapping<GqlTemplateTimestamp>;
}
