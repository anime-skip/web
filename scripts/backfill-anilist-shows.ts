// This script was created apart of https://github.com/anime-skip/player/issues/246 and it:
//
// 1. Goes through all the shows in the database
// 2. Looks them up by name in anilist
// 3. Adds the Anilist site URL as an external link for the show IF a match is found

import { openAnimeSkipDatabase } from "server/services/db";
import { createAnilistExternalLinkService } from "server/services/anilist-external-link-service";
import { createLogger } from "@aklinker1/logger";
import { createTimer } from "shared/time";
import { externalLinks, shows } from "server/db/schema";
import { isNull } from "drizzle-orm";
import { styleText } from "node:util";

const logger = createLogger("backfill-anilist-shows");

async function main() {
  const timer = createTimer();

  logger.info("Opening database...");
  const db = await openAnimeSkipDatabase();

  const anilistService = createAnilistExternalLinkService();

  logger.info("Getting all shows...");
  const allShows = await db.query.shows.findMany({
    where: isNull(shows.deletedAt),
  });

  const showCount = allShows.length;
  logger.info(`Found ${styleText("cyan", String(showCount))} shows`);

  logger.info("Looking for Anilist matches:");

  for (let i = 0; i < allShows.length; i++) {
    const show = allShows[i];

    // Rate limiting: Anilist allows ~90 requests per minute
    await sleep(60_000 / 90);

    if (!show.name) {
      logger.warn(
        `(${i + 1}/${showCount}) ${styleText("dim", show.id)} - NO NAME`,
      );
      continue;
    }

    const links = await anilistService.findLinks(show.name);

    if (links.length === 0) {
      logger.info(
        `(${i + 1}/${showCount}) ${show.name} - ${styleText("yellow", "NO URL")}`,
      );
    } else {
      const url = links[0];
      try {
        await db
          .insert(externalLinks)
          .values({
            url,
            showId: show.id,
          })
          .onConflictDoNothing();
        logger.info(
          `(${i + 1}/${showCount}) ${show.name} - ${styleText("green", url)}`,
        );
      } catch (err) {
        // Handle duplicate key errors gracefully
        if (
          err instanceof Error &&
          err.message.includes("duplicate key value violates unique constraint")
        ) {
          logger.info(
            `(${i + 1}/${showCount}) ${show.name} - ${styleText("cyan", url)} (already exists)`,
          );
        } else {
          throw err;
        }
      }
    }
  }

  logger.info(`Completed in ${timer.duration()}`);
  process.exit(0);
}

function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

main().catch((err) => {
  logger.error("Error:", err);
  process.exit(1);
});
