import { externalLinks, type DbExternalLink } from "server/db/schema";
import type { AnimeSkipDatabase } from "./db";
import { and, eq, or } from "drizzle-orm";
import { ALLOWED_EXTERNAL_LINK_HOSTNAMES } from "server/utils/external-service-utils";

export interface ExternalLinkService {
  sanitizeUrl(url: string): string;
  deleteMany(
    tx: AnimeSkipDatabase,
    keys: Array<{ url: string; showId: string }>,
  ): Promise<DbExternalLink[]>;
  deleteCascade(
    tx: AnimeSkipDatabase,
    keys: Array<{ url: string; showId: string }>,
  ): Promise<DbExternalLink[]>;
}

export function createExternalLinkService({
  db: _,
}: {
  db: AnimeSkipDatabase;
}): ExternalLinkService {
  const sanitizeUrl: ExternalLinkService["sanitizeUrl"] = (url) => {
    const parsed = new URL(url);

    // Validate scheme
    if (parsed.protocol !== "https:") {
      throw new Error(
        `URL must use https scheme (url: ${url} | scheme: ${parsed.protocol})`,
      );
    }

    // Validate hostname
    const hostname = parsed.hostname;
    if (!ALLOWED_EXTERNAL_LINK_HOSTNAMES.includes(hostname)) {
      throw new Error(
        `URL does not have the required hostname (allowed: ${ALLOWED_EXTERNAL_LINK_HOSTNAMES.join(", ")} | url: ${url} | hostname: ${hostname})`,
      );
    }

    // Return sanitized URL (scheme + hostname + path, no query params or fragment)
    return `https://${hostname}${parsed.pathname}`;
  };

  const deleteMany: ExternalLinkService["deleteMany"] = async (tx, keys) => {
    if (keys.length === 0) {
      return [];
    }

    const conditions = keys.map((key) =>
      and(eq(externalLinks.url, key.url), eq(externalLinks.showId, key.showId)),
    );

    const deleted = await tx
      .delete(externalLinks)
      .where(or(...conditions))
      .returning();
    return deleted;
  };

  const deleteCascade: ExternalLinkService["deleteCascade"] = async (
    tx,
    keys,
  ) => {
    // Nothing to cascade - external links have no child entities
    return deleteMany(tx, keys);
  };

  return {
    sanitizeUrl,
    deleteMany,
    deleteCascade,
  };
}
