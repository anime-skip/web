import type { Logger } from "server/utils/logger";
import type { ExternalLinkLookupService } from "./external-link-lookup-service";

export function createAnilistExternalLinkService({
  logger,
}: {
  logger: Logger;
}): ExternalLinkLookupService {
  const serviceLogger = logger.extend("anilist-external-link-service");

  const findLinks: ExternalLinkLookupService["findLinks"] = async (
    showName,
  ) => {
    const query = `
      query ($search: String) {
        anime: Page(perPage: 1) {
          results: media(type: ANIME, search: $search) {
            title {
              english
            }
            siteUrl
          }
        }
      }
    `;

    const variables = { search: showName };

    try {
      const response = await fetch("https://graphql.anilist.co", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ query, variables }),
      });

      if (!response.ok) {
        serviceLogger.error(
          `Anilist API request failed: ${response.status} ${response.statusText}`,
        );
        return [];
      }

      const data = (await response.json()) as AnilistResponse;

      if (data.errors) {
        serviceLogger.error(`Anilist API errors:`, data.errors);
        return [];
      }

      const results = data.data?.anime?.results;
      if (!results || results.length === 0) {
        serviceLogger.debug(`No Anilist results found for "${showName}"`);
        return [];
      }

      const siteUrl = results[0]?.siteUrl;
      if (!siteUrl) {
        serviceLogger.debug(`Anilist result for "${showName}" has no siteUrl`);
        return [];
      }

      serviceLogger.debug(`Found Anilist link for "${showName}": ${siteUrl}`);
      return [siteUrl];
    } catch (err) {
      serviceLogger.error(
        `Failed to fetch Anilist links for "${showName}":`,
        err,
      );
      return [];
    }
  };

  return {
    findLinks,
  };
}

interface AnilistResponse {
  data?: {
    anime?: {
      results?: Array<{
        title?: {
          english?: string;
        };
        siteUrl?: string;
      }>;
    };
  };
  errors?: unknown[];
}
