// Ported from public-api/cmd/validate-timestamps. This script:
//
// 1. Loads every episode and its timestamps
// 2. Runs them through the timestamp validation rules
// 3. Posts a Discord thread listing every episode that failed validation
//
// Exits with code 1 if any episode is invalid.

import { styleText } from "node:util";

import { createLogger } from "@aklinker1/logger";
import { asc, inArray, isNull } from "drizzle-orm";
import { episodes, episodeUrls, shows, timestamps, users } from "server/db/schema";
import { openAnimeSkipDatabase } from "server/services/db";
import { createDiscordAlerter } from "server/services/discord-alerter";
import {
  validateEpisodeTimestamps,
  type ValidationTimestamp,
} from "server/utils/timestamp-validation";
import { createTimer } from "shared/time";

const logger = createLogger("review-timestamps");

const DISCORD_MESSAGE_LIMIT = 2000;

interface InvalidEpisode {
  episode: typeof episodes.$inferSelect;
  timestamps: (typeof timestamps.$inferSelect)[];
  errors: string[];
}

async function main() {
  const timer = createTimer();

  logger.info("Opening database...");
  const db = await openAnimeSkipDatabase();

  logger.info("Loading episodes, timestamps, and timestamp types...");
  const [allEpisodes, allTimestamps, allTypes] = await Promise.all([
    db.query.episodes.findMany({ where: isNull(episodes.deletedAt) }),
    db.query.timestamps.findMany({
      where: isNull(timestamps.deletedAt),
      orderBy: [asc(timestamps.at)],
    }),
    db.query.timestampTypes.findMany(),
  ]);
  const typeNames = new Map(allTypes.map((type) => [type.id, type.name]));

  const timestampsByEpisodeId = Map.groupBy(allTimestamps, (ts) => ts.episodeId);

  const invalid: InvalidEpisode[] = [];
  for (const [i, episode] of allEpisodes.entries()) {
    logger.debug(
      `${i + 1}/${allEpisodes.length} (${(((i + 1) / allEpisodes.length) * 100).toFixed(2)}%)`,
    );

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

  const summary = `Processed ${allEpisodes.length} episodes, ${invalid.length} invalid`;
  logger.info(summary);
  logger.info(`Completed in ${timer.duration()}`);

  if (invalid.length === 0) {
    process.exit(0);
  }

  const messages = await buildMessages(db, invalid, typeNames);
  logger.info(`Sending ${styleText("cyan", String(messages.length))} messages to Discord...`);
  await createDiscordAlerter().notifyInThread(
    summary,
    messages,
    `Timestamp Validation Results ${new Date().toDateString()}`,
  );

  process.exit(1);
}

async function buildMessages(
  db: Awaited<ReturnType<typeof openAnimeSkipDatabase>>,
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

main().catch((err) => {
  logger.error("Error:", err);
  process.exit(1);
});
