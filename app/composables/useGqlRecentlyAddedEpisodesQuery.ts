import { useQuery } from "@tanstack/vue-query";
import { queryGraphql } from "app/utils/graphql-utils";
import { VueQueryKey } from "app/utils/vue-query-keys";

export default function () {
  return useQuery({
    queryKey: [VueQueryKey.recentlyAddedEpisodes],
    queryFn: async () => {
      const data = await queryGraphql<{
        recentlyAddedEpisodes: RecentEpisode[];
      }>(QUERY_NAME, QUERY);
      return data.recentlyAddedEpisodes;
    },
  });
}

const QUERY_NAME = `GetRecentlyAddedEpisodes`;

const QUERY = `
  query ${QUERY_NAME} {
    recentlyAddedEpisodes {
      id
      name
      number
      absoluteNumber
      season
      createdAt
      show { name }
    }
  }
`;

export type RecentEpisode = Pick<
  GqlEpisode,
  "id" | "name" | "number" | "absoluteNumber" | "season" | "show" | "createdAt"
> & {
  show: Pick<GqlShow, "name">;
};
