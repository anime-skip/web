import { SearchShowsQueryVariables } from '~~/utils/graphql.generated';
import { useQuery } from 'vue-query';
import { QueryKeys } from '~~/utils/query-keys';
import { Ref } from 'vue';

export default function (variables: Ref<SearchShowsQueryVariables>) {
  const client = useApiClient(false);
  return useQuery({
    queryKey: [QueryKeys.SEARCH_SHOWS, variables],
    queryFn() {
      return client.searchShows(variables.value);
    },
  });
}
