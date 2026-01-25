// This script was created apart of https://github.com/anime-skip/player/issues/246 and it:
//
// 1. Goes through all the shows in the database
// 2. Looks them up by name in anilist
// 3. Adds the Anilist site URL as an external link for the show IF a match is found

import { openAnimeSkipDatabase } from "server/services/db";
import { createAnilistExternalLinkService } from "server/services/anilist-external-link-service";
import { logger, Color } from "server/utils/logger";
import { createTimer } from "shared/time";
import { externalLinks, shows } from "server/db/schema";
import { isNull } from "drizzle-orm";

const scriptLogger = logger.extend("backfill-anilist-shows");

async function main() {
  const timer = createTimer();

  scriptLogger.info("Opening database...");
  const db = await openAnimeSkipDatabase();

  const anilistService = createAnilistExternalLinkService({ logger });

  scriptLogger.info("Getting all shows...");
  const allShows = await db.query.shows.findMany({
    where: isNull(shows.deletedAt),
  });

  const showCount = allShows.length;
  scriptLogger.info(`Found ${Color.Cyan}${showCount}${Color.Reset} shows`);

  scriptLogger.info("Looking for Anilist matches:");

  for (let i = 0; i < allShows.length; i++) {
    const show = allShows[i];

    // Rate limiting: Anilist allows ~90 requests per minute
    await sleep(60_000 / 90);

    if (!show.name) {
      scriptLogger.warn(
        `(${i + 1}/${showCount}) ${Color.Dim}[${show.id}]${Color.Reset} - NO NAME`,
      );
      continue;
    }

    const links = await anilistService.findLinks(show.name);

    if (links.length === 0) {
      scriptLogger.info(
        `(${i + 1}/${showCount}) ${show.name} - ${Color.Yellow}NO URL${Color.Reset}`,
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
        scriptLogger.info(
          `(${i + 1}/${showCount}) ${show.name} - ${Color.Green}${url}${Color.Reset}`,
        );
      } catch (err) {
        // Handle duplicate key errors gracefully
        if (
          err instanceof Error &&
          err.message.includes("duplicate key value violates unique constraint")
        ) {
          scriptLogger.info(
            `(${i + 1}/${showCount}) ${show.name} - ${Color.Cyan}${url}${Color.Reset} (already exists)`,
          );
        } else {
          throw err;
        }
      }
    }
  }

  scriptLogger.info(`Completed in ${timer.duration()}`);
  process.exit(0);
}

function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

main().catch((err) => {
  scriptLogger.error("Error:", err);
  process.exit(1);
});
