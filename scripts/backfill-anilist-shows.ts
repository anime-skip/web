// This script was created apart of https://github.com/anime-skip/player/issues/246 and it:
//
// 1. Finds all shows without an Anilist external link
// 2. Looks them up by name in Anilist
// 3. Adds the Anilist site URL as an external link for the show IF a match is found
//
// The same logic runs on a schedule in the jobs worker (limited to recently created shows). Use
// this script for a full, one-off backfill.
//
// Usage: bun scripts/backfill-anilist-shows.ts [--dry-run]

import { createLogger } from "@aklinker1/logger";
import { container } from "server/dependencies";
import { backfillAnilistShows } from "server/jobs/backfill-anilist-shows";
import { createTimer } from "shared/time";

const logger = createLogger("backfill-anilist-shows");

async function main() {
  const timer = createTimer();
  const dryRun = process.argv.includes("--dry-run");

  const { db, anilistExternalLinkService } = container.registrations;
  const result = await backfillAnilistShows({
    db,
    anilist: anilistExternalLinkService,
    dryRun,
  });

  logger.info(`Completed in ${timer.duration()}`);
  process.exit(result.aborted ? 1 : 0);
}

main().catch((err) => {
  logger.error("Error:", err);
  process.exit(1);
});
