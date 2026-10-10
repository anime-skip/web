import { createLogger } from "@aklinker1/logger";

import type { ExternalLinkLookupService } from "./external-link-lookup-service";

const logger = createLogger("anilist-external-link-service");

export function createAnilistExternalLinkService(): ExternalLinkLookupService {
  const findLinks: ExternalLinkLookupService["findLinks"] = async (showName) => {
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

    // Failures throw so callers can tell "no match" apart from "Anilist is unavailable"
    const response = await fetch("https://graphql.anilist.co", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ query, variables }),
    });

    if (!response.ok) {
      throw new AnilistRequestError(
        `Anilist request failed: ${response.status} ${response.statusText}`,
        response.status,
      );
    }

    const data = (await response.json()) as AnilistResponse;

    if (data.errors) {
      throw new AnilistRequestError(
        `Anilist API returned errors: ${JSON.stringify(data.errors)}`,
        response.status,
      );
    }

    const results = data.data?.anime?.results;
    if (!results || results.length === 0) {
      logger.debug(`No Anilist results found`, { showName });
      return [];
    }

    const siteUrl = results[0]?.siteUrl;
    if (!siteUrl) {
      logger.debug(`Anilist has no siteUrl`, { showName });
      return [];
    }

    logger.debug(`Found Anilist link`, { showName, siteUrl });
    return [siteUrl];
  };

  return {
    findLinks,
  };
}

export class AnilistRequestError extends Error {
  constructor(
    message: string,
    readonly status: number,
  ) {
    super(message);
    this.name = "AnilistRequestError";
  }
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
