export interface ThirdPartyService {
  findEpisodeByName(name: string): Promise<GqlThirdPartyEpisode[]>;
}
