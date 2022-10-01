import { Ref } from 'vue';
import { useQuery } from 'vue-query';
import { RecentlyAddedEpisodesQueryVariables } from '~~/utils/graphql.generated';
import { QueryKeys } from '~~/utils/query-keys';

export default function (vars: Ref<RecentlyAddedEpisodesQueryVariables>) {
  return useQuery([QueryKeys.RECENTLY_ADDED_EPISODES, vars], () =>
    useApiClient(false).recentlyAddedEpisodes(vars.value),
  );
}
