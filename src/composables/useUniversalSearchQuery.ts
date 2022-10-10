import { Ref } from 'vue';
import { useQuery } from 'vue-query';
import { QueryKeys } from '~~/utils/query-keys';

export interface UniversalSearchVariables {
  query?: string;
  limit: number;
}

export default function (variables: Ref<UniversalSearchVariables>) {
  const client = useApiClient(false);
  return useQuery({
    queryKey: [QueryKeys.UNIVERSAL_SEARCH, variables],
    async queryFn() {
      const [shows, episodes] = await Promise.all([
        client.searchShows({
          search: variables.value.query,
          limit: variables.value.limit,
        }),
        client.searchEpisodes({
          search: variables.value.query,
          limit: variables.value.limit,
        }),
      ]);
      return {
        shows,
        episodes,
      };
    },
  });
}
