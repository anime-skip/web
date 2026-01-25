import { episodes, shows, timestamps } from "server/db/schema";
import type { DbEpisode, DbShow, DbTimestamp } from "server/db/schema";
import type { AnimeSkipDatabase } from "./db";
import { and, eq, ilike, isNull } from "drizzle-orm";
import type { ThirdPartyService } from "./third-party-service";
import { mapDbTimestampTypeToGqlTimestampType } from "server/graphql/mappers";

export function createDbThirdPartyService({
  db,
}: {
  db: AnimeSkipDatabase;
}): ThirdPartyService {
  const findEpisodeByName: ThirdPartyService["findEpisodeByName"] = async (
    name,
  ) => {
    // Find episodes where name contains the search string (case-insensitive)
    const matchingEpisodes = await db.query.episodes.findMany({
      where: and(ilike(episodes.name, `%${name}%`), isNull(episodes.deletedAt)),
    });

    const results: GqlThirdPartyEpisode[] = [];

    for (const episode of matchingEpisodes) {
      // Find the associated show
      const show = await db.query.shows.findFirst({
        where: eq(shows.id, episode.showId),
      });

      if (!show) {
        // Skip episodes without a valid show
        continue;
      }

      // Find timestamps for this episode
      const episodeTimestamps = await db.query.timestamps.findMany({
        where: and(
          eq(timestamps.episodeId, episode.id),
          isNull(timestamps.deletedAt),
        ),
      });

      const types = await db.query.timestampTypes.findMany();
      const typeMap = types.reduce<Record<string, GqlTimestampType>>(
        (map, type) => {
          map[type.id] = mapDbTimestampTypeToGqlTimestampType(type);
          return map;
        },
        {},
      );

      // Map to third-party types
      const thirdPartyShow = mapToThirdPartyShow(show);
      const thirdPartyTimestamps = episodeTimestamps.map((timestamp) =>
        mapToGqlThirdPartyTimestamp(timestamp, typeMap[timestamp.typeId]),
      );
      const thirdPartyEpisode = mapToGqlThirdPartyEpisode(
        episode,
        thirdPartyShow,
        thirdPartyTimestamps,
      );

      results.push(thirdPartyEpisode);
    }

    return results;
  };

  return {
    findEpisodeByName,
  };
}

function mapToThirdPartyShow(show: DbShow): GqlThirdPartyShow {
  return {
    name: show.name ?? "",
    createdAt: show.createdAt,
    updatedAt: show.updatedAt,
  };
}

export function mapToGqlThirdPartyShow(db: DbShow): GqlThirdPartyShow {
  return {
    name: db.name ?? "",
    createdAt: db.createdAt,
    updatedAt: db.updatedAt,
  };
}

export function mapToGqlThirdPartyTimestamp(
  db: DbTimestamp,
  type: GqlTimestampType,
): GqlThirdPartyTimestamp {
  return {
    id: db.id,
    at: Number(db.at),
    typeId: db.typeId,
    type,
  };
}

export function mapToGqlThirdPartyEpisode(
  episode: DbEpisode,
  show: GqlThirdPartyShow,
  timestamps: GqlThirdPartyTimestamp[],
): GqlThirdPartyEpisode {
  return {
    id: episode.id,
    season: episode.season,
    number: episode.number,
    absoluteNumber: episode.absoluteNumber,
    baseDuration: episode.baseDuration ? Number(episode.baseDuration) : null,
    name: episode.name,
    source: "ANIME_SKIP",
    showId: episode.showId,
    show,
    timestamps,
  };
}
