import { createLogger } from "@aklinker1/logger";

import type { ExternalLinkLookupService } from "./external-link-lookup-service";

const logger = createLogger("aggregate-external-link-service");

/**
 * Aggregates multiple ExternalLinkLookupService implementations. Collects links from all services
 * and returns them combined.
 */
export function createAggregateExternalLinkService({
  services,
}: {
  services: Record<string, ExternalLinkLookupService>;
}): ExternalLinkLookupService {
  const findLinks: ExternalLinkLookupService["findLinks"] = async (showName) => {
    const results = await Promise.all(
      Object.entries(services).map(async ([serviceName, service]) => {
        try {
          const links = await service.findLinks(showName);
          if (links.length > 0) {
            logger.debug("Found external links", {
              links: links.length,
              serviceName,
              showName,
            });
          }
          return links;
        } catch (error) {
          logger.error("Failed to find links", {
            serviceName,
            showName,
            error,
          });
          return [];
        }
      }),
    );

    const allLinks = results.flat();

    if (allLinks.length === 0) {
      logger.debug("No external links found", {
        showName,
      });
    }

    return allLinks;
  };

  return {
    findLinks,
  };
}
