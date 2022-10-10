import { useQuery } from 'vue-query';
import { CountsQuery } from '~~/utils/graphql.generated';
import { QueryKeys } from '~~/utils/query-keys';

const FALLBACK_COUNTS: CountsQuery = {
  counts: {
    // Counts come from running the query on 2022/10/02
    episodes: 4482,
    timestamps: 23807,
    shows: 406,
  },
};

export default function () {
  const client = useApiClient(false);
  return useQuery({
    queryKey: QueryKeys.COUNTS,
    queryFn() {
      return client.counts().catch(() => FALLBACK_COUNTS);
    },
    refetchInterval: 5e3,
    refetchOnWindowFocus: false,
  });
}
