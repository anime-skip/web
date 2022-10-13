import { Ref } from 'nuxt/dist/app/compat/capi';
import { QueryFindUserReportsArgs } from '~~/utils/graphql.generated';
import { useInfiniteQuery } from 'vue-query';
import { QueryKeys } from '~~/utils/query-keys';
import { withPagination } from '~~/utils/with-pagination';

export default function (vars: Ref<Omit<QueryFindUserReportsArgs, 'offset'>>) {
  const client = useApiClient();
  const DEFAULT_LIMIT = 10;

  return useInfiniteQuery({
    queryKey: [QueryKeys.FIND_USER_REPORTS, vars],
    async queryFn({ pageParam = 0 }) {
      const fn = withPagination(client.findUserReports, res => res.findUserReports, DEFAULT_LIMIT);
      return fn({ ...vars.value, offset: pageParam });
    },
    getNextPageParam(res) {
      return res.nextOffset;
    },
  });
}
