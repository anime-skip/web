import { createLogger } from "@aklinker1/logger";
import { and, asc, gt, inArray, isNull } from "drizzle-orm";
import { episodes, episodeUrls, shows, timestamps, users } from "server/db/schema";
import type { Alerter } from "server/services/alerter";
import type { Database } from "server/services/db";
import {
  validateEpisodeTimestamps,
  type ValidationTimestamp,
} from "server/utils/timestamp-validation";

const logger = createLogger("review-timestamps");

const DISCORD_MESSAGE_LIMIT = 2000;
const PAGE_SIZE = 500;

type DbEpisode = typeof episodes.$inferSelect;
type DbTimestamp = typeof timestamps.$inferSelect;

interface InvalidEpisode {
  episode: DbEpisode;
  timestamps: DbTimestamp[];
  errors: string[];
}

export interface ReviewTimestampsOptions {
  db: Database;
  alerter: Alerter;
}

export interface ReviewTimestampsResult {
  processed: number;
  invalid: number;
}

/**
 * Validate the timestamps of every episode, and post a Discord thread listing the episodes that
 * failed validation.
 */
export async function reviewTimestamps({
  db,
  alerter,
}: ReviewTimestampsOptions): Promise<ReviewTimestampsResult> {
  const types = await db.query.timestampTypes.findMany();
  const typeNames = new Map(types.map((type) => [type.id, type.name]));

  let processed = 0;
  const invalid: InvalidEpisode[] = [];

  // Keyset pagination, so we never hold every episode and timestamp in memory
  let lastId: string | undefined;
  while (true) {
    const page = await db.query.episodes.findMany({
      where: and(isNull(episodes.deletedAt), lastId ? gt(episodes.id, lastId) : undefined),
      orderBy: [asc(episodes.id)],
      limit: PAGE_SIZE,
    });
    if (page.length === 0) break;
    lastId = page[page.length - 1].id;

    const pageTimestamps = await db.query.timestamps.findMany({
      where: and(
        isNull(timestamps.deletedAt),
        inArray(
          timestamps.episodeId,
          page.map((episode) => episode.id),
        ),
      ),
      orderBy: [asc(timestamps.at)],
    });
    const timestampsByEpisodeId = Map.groupBy(pageTimestamps, (ts) => ts.episodeId);

    for (const episode of page) {
      processed++;
      const episodeTimestamps = timestampsByEpisodeId.get(episode.id) ?? [];
      const result = validateEpisodeTimestamps(
        {
          id: episode.id,
          baseDuration: episode.baseDuration == null ? null : Number(episode.baseDuration),
        },
        episodeTimestamps.map((ts): ValidationTimestamp => ({
          id: ts.id,
          at: Number(ts.at ?? 0),
          typeId: ts.typeId,
          episodeId: ts.episodeId,
        })),
      );

      if (!result.isValid) {
        invalid.push({
          episode,
          timestamps: episodeTimestamps,
          errors: (result.errors ?? []).map((error) => replaceTypeIds(error, typeNames)),
        });
      }
    }
  }

  const summary = `Processed ${processed} episodes, ${invalid.length} invalid`;
  logger.info(summary);

  if (invalid.length > 0) {
    const messages = await buildMessages(db, invalid, typeNames);
    logger.info(`Sending ${messages.length} messages to Discord`);
    await alerter.notifyInThread(
      summary,
      messages,
      `Timestamp Validation Results ${new Date().toDateString()}`,
    );
  }

  return { processed, invalid: invalid.length };
}

async function buildMessages(
  db: Database,
  invalid: InvalidEpisode[],
  typeNames: Map<string, string>,
): Promise<string[]> {
  const episodeIds = invalid.map((item) => item.episode.id);
  const showIds = [...new Set(invalid.map((item) => item.episode.showId))];
  const userIds = [
    ...new Set(
      invalid.flatMap((item) => [
        item.episode.createdByUserId,
        ...item.timestamps.map((ts) => ts.updatedByUserId),
      ]),
    ),
  ];

  const [showRows, userRows, urlRows] = await Promise.all([
    db.query.shows.findMany({ where: inArray(shows.id, showIds) }),
    db.query.users.findMany({ where: inArray(users.id, userIds) }),
    db.query.episodeUrls.findMany({ where: inArray(episodeUrls.episodeId, episodeIds) }),
  ]);
  const showsById = new Map(showRows.map((show) => [show.id, show]));
  const usersById = new Map(userRows.map((user) => [user.id, user]));
  const urlsByEpisodeId = Map.groupBy(urlRows, (url) => url.episodeId);

  const formatUser = (id: string) => {
    const user = usersById.get(id);
    return user ? `${user.username} (id=\`${id}\`)` : `<not found> (id=\`${id}\`)`;
  };

  return invalid.map(({ episode, timestamps: episodeTimestamps, errors }, i) => {
    const show = showsById.get(episode.showId);
    const contributorIds = [...new Set(episodeTimestamps.map((ts) => ts.updatedByUserId))];
    const urls = urlsByEpisodeId.get(episode.id) ?? [];

    const lines = [
      "▁▁▁▁▁▁▁▁▁▁",
      `_${i + 1}/${invalid.length}_`,
      `**Episode**: ${episode.name ?? "<nil>"} (id=\`${episode.id}\`)`,
      `**Number**: ${episode.number ?? "<nil>"}`,
      `**Absolute Number**: ${episode.absoluteNumber ?? "<nil>"}`,
      `**Season**: ${episode.season ?? "<nil>"}`,
      `**Created By**: ${formatUser(episode.createdByUserId)}`,
      `**Show**: ${show?.name ?? "<not found>"} (id=\`${episode.showId}\`)`,
      "**Contributors**",
      ...contributorIds.map((id) => ` • ${formatUser(id)}`),
      "**Timestamps**",
      ...episodeTimestamps.map(
        (ts) => ` • ${typeNames.get(ts.typeId) ?? ts.typeId} @ ${Number(ts.at ?? 0).toFixed(2)}`,
      ),
      "**Validation Errors**",
      ...errors.map((error) => ` • ${error}`),
      "**URLs**",
      ...urls.map((url) => ` • ${url.url}`),
      "_Delete this message once fixed_",
      "▔▔▔▔▔▔▔▔▔▔",
    ];

    const message = lines.join("\n");
    return message.length <= DISCORD_MESSAGE_LIMIT
      ? message
      : `${message.slice(0, DISCORD_MESSAGE_LIMIT - 4)}\n...`;
  });
}

function replaceTypeIds(text: string, typeNames: Map<string, string>): string {
  let result = text;
  for (const [id, name] of typeNames) {
    result = result.replaceAll(id, name);
  }
  return result;
}
