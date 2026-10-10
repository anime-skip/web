// Ported from public-api/cmd/validate-timestamps. Runs the same review the jobs worker runs every
// week: validates every episode's timestamps and posts a Discord thread listing the invalid ones.
//
// Exits with code 1 if any episode is invalid.

import { createLogger } from "@aklinker1/logger";
import { container } from "server/dependencies";
import { reviewTimestamps } from "server/jobs/review-timestamps";
import { createTimer } from "shared/time";

const logger = createLogger("review-timestamps");

async function main() {
  const timer = createTimer();
  const { db, alerter } = container.registrations;

  const result = await reviewTimestamps({ db, alerter });

  logger.info(`Completed in ${timer.duration()}`);
  process.exit(result.invalid > 0 ? 1 : 0);
}

main().catch((err) => {
  logger.error("Error:", err);
  process.exit(1);
});
