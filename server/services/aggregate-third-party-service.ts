import { createLogger } from "@aklinker1/logger";

import type { ThirdPartyService } from "./third-party-service";

const logger = createLogger("aggregate-third-party-service");

export function createAggregateThirdPartyService({
  services,
}: {
  services: Record<string, ThirdPartyService>;
}): ThirdPartyService {
  const findEpisodeByName: ThirdPartyService["findEpisodeByName"] = async (name) => {
    const results: GqlThirdPartyEpisode[][] = await Promise.all(
      Object.entries(services).map(async ([key, service]) => {
        try {
          return await service.findEpisodeByName(name);
        } catch (error) {
          logger.error("Failed to find episode by name", {
            key,
            name,
            error,
          });
          return [];
        }
      }),
    );

    return results.flat();
  };

  return {
    findEpisodeByName,
  };
}
