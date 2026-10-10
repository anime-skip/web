import { createLogger } from "@aklinker1/logger";
import { and, gte, isNotNull, isNull, notExists, sql } from "drizzle-orm";
import { externalLinks, shows } from "server/db/schema";
import type { Database } from "server/services/db";
import type { ExternalLinkLookupService } from "server/services/external-link-lookup-service";
import { DAY } from "shared/time";

const logger = createLogger("backfill-anilist-shows");

/** Anilist allows ~90 requests per minute. */
const REQUEST_INTERVAL_MS = 60_000 / 90;

export interface BackfillAnilistShowsOptions {
  db: Database;
  /** Should be backed by Anilist, since we only look for shows missing an Anilist link. */
  anilist: ExternalLinkLookupService;
  /**
   * Only look at shows created within this many days. Shows with no Anilist match are never marked
   * as checked, so a recurring run should use a window to avoid re-querying them forever. Leave
   * undefined to check every show without a link (one-off backfill).
   */
  createdWithinDays?: number;
  /** Log matches without writing them. */
  dryRun?: boolean;
}

export interface BackfillAnilistShowsResult {
  checked: number;
  linked: number;
  /** True if the run stopped early because Anilist returned an error. */
  aborted: boolean;
}

/**
 * Find shows that don't have an Anilist external link yet, look each up by name, and add the link
 * when there's a match.
 */
export async function backfillAnilistShows(
  options: BackfillAnilistShowsOptions,
): Promise<BackfillAnilistShowsResult> {
  const { db, anilist, createdWithinDays, dryRun = false } = options;

  const hasAnilistLink = db
    .select({ one: sql`1` })
    .from(externalLinks)
    .where(
      and(
        sql`${externalLinks.showId} = ${shows.id}`,
        sql`${externalLinks.url} LIKE 'https://anilist.co/%'`,
      ),
    );

  const candidates = await db.query.shows.findMany({
    where: and(
      isNull(shows.deletedAt),
      isNotNull(shows.name),
      notExists(hasAnilistLink),
      createdWithinDays == null
        ? undefined
        : gte(shows.createdAt, new Date(Date.now() - createdWithinDays * DAY).toISOString()),
    ),
  });

  const total = candidates.length;
  logger.info(`Looking up ${total} show(s) on Anilist${dryRun ? " (dry run)" : ""}`);

  const result: BackfillAnilistShowsResult = { checked: 0, linked: 0, aborted: false };

  for (const [i, show] of candidates.entries()) {
    const progress = `(${i + 1}/${total}) ${show.name}`;
    if (i > 0) await sleep(REQUEST_INTERVAL_MS);

    let links: string[];
    try {
      links = await anilist.findLinks(show.name!);
    } catch (error) {
      // Likely rate limited or Anilist is down, don't burn through the remaining shows
      logger.error(`${progress} - Anilist request failed, aborting`, { error });
      result.aborted = true;
      break;
    }
    result.checked++;

    const url = links[0];
    if (!url) {
      logger.info(`${progress} - no match`);
      continue;
    }

    if (!dryRun) {
      await db.insert(externalLinks).values({ url, showId: show.id }).onConflictDoNothing();
    }
    result.linked++;
    logger.info(`${progress} - ${url}`);
  }

  logger.info("Finished", { ...result });
  return result;
}

function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
