import { Ref } from 'vue';
import { useQuery } from 'vue-query';
import { QueryFindUserReportArgs } from '~~/utils/graphql.generated';
import { QueryKeys } from '~~/utils/query-keys';

export default function (vars: Ref<QueryFindUserReportArgs>) {
  const client = useApiClient();

  return useQuery({
    queryKey: [QueryKeys.FIND_USER_REPORT, computed(() => vars.value.id)],
    queryFn() {
      return client.findUserReport(vars.value);
    },
  });
}
