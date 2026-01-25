import { logger } from "server/utils/logger";
import type { ThirdPartyService } from "./third-party-service";

const serviceLogger = logger.extend("aggregate-third-party-service");

export function createAggregateThirdPartyService({
  services,
}: {
  services: Record<string, ThirdPartyService>;
}): ThirdPartyService {
  const findEpisodeByName: ThirdPartyService["findEpisodeByName"] = async (
    name,
  ) => {
    const results: GqlThirdPartyEpisode[][] = await Promise.all(
      Object.entries(services).map(async ([key, service]) => {
        try {
          return await service.findEpisodeByName(name);
        } catch (err) {
          serviceLogger.error(
            `${key} failed to find episode by name ("${name}"):`,
            err,
          );
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
