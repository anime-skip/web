import type { Logger } from "server/utils/logger";
import type { ExternalLinkLookupService } from "./external-link-lookup-service";

/**
 * Aggregates multiple ExternalLinkLookupService implementations.
 * Collects links from all services and returns them combined.
 */
export function createAggregateExternalLinkService({
  logger,
  services,
}: {
  logger: Logger;
  services: Record<string, ExternalLinkLookupService>;
}): ExternalLinkLookupService {
  const serviceLogger = logger.extend("aggregate-external-link-service");

  const findLinks: ExternalLinkLookupService["findLinks"] = async (
    showName,
  ) => {
    const results = await Promise.all(
      Object.entries(services).map(async ([name, service]) => {
        try {
          const links = await service.findLinks(showName);
          if (links.length > 0) {
            serviceLogger.debug(
              `Found ${links.length} link(s) for "${showName}" from ${name}`,
            );
          }
          return links;
        } catch (err) {
          serviceLogger.error(
            `${name} failed to find links for "${showName}":`,
            err,
          );
          return [];
        }
      }),
    );

    const allLinks = results.flat();

    if (allLinks.length === 0) {
      serviceLogger.debug(`No external links found for "${showName}"`);
    }

    return allLinks;
  };

  return {
    findLinks,
  };
}
