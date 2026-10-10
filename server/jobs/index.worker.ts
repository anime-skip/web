import { createLogger } from "@aklinker1/logger";
import { Cron } from "croner";
import { container } from "server/dependencies";

import { backfillAnilistShows } from "./backfill-anilist-shows";
import { reviewTimestamps } from "./review-timestamps";

declare var self: Worker;

const logger = createLogger("worker");

/** Run `job` on a cron schedule (UTC). Runs never overlap and errors never stop the schedule. */
function schedule(name: string, pattern: string, job: () => Promise<unknown>) {
  const cron = new Cron(
    pattern,
    {
      name,
      timezone: "UTC",
      protect: () => logger.warn(`Skipping job, previous run still in progress`, { name }),
      catch: (error) => logger.error(`Job failed`, { name, error }),
    },
    async () => {
      logger.info(`Running job`, { name });
      await job();
    },
  );
  logger.info("Scheduled job", { name, pattern, next: cron.nextRun()?.toISOString() });
}

const deps = container.registrations;

// Link newly created shows to Anilist. The window is wider than the interval so a failed or
// aborted run gets retried on the next one.
schedule("backfill-anilist-shows", "0 0 * * *", () =>
  backfillAnilistShows({
    db: deps.db,
    anilist: deps.anilistExternalLinkService,
    createdWithinDays: 7,
  }),
);

// Midnight on Wednesdays, same as the old GitHub workflow
schedule("review-timestamps", "0 0 * * 3", () => reviewTimestamps(deps));

self.postMessage("initialized");
