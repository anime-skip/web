import { SearchEpisodesQueryVariables } from '~~/utils/graphql.generated';
import { useQuery } from 'vue-query';
import { QueryKeys } from '~~/utils/query-keys';
import { Ref } from 'vue';

export default function (variables: Ref<SearchEpisodesQueryVariables>) {
  const client = useApiClient(false);
  return useQuery({
    queryKey: [QueryKeys.SEARCH_EPISODES, variables],
    queryFn() {
      return client.searchEpisodes(variables.value);
    },
  });
}
