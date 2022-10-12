import { Ref } from 'nuxt/dist/app/compat/capi';
import { QueryFindUserReportsArgs } from '~~/utils/graphql.generated';
import { useInfiniteQuery } from 'vue-query';
import { QueryKeys } from '~~/utils/query-keys';

export default function (vars: Ref<QueryFindUserReportsArgs>) {
  const client = useApiClient();
  return useInfiniteQuery({
    queryKey: [QueryKeys.FIND_USER_REPORTS, vars],
    queryFn() {
      return client.findUserReports(vars.value);
    },
  });
}
