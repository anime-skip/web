import { useMutation, useQueryClient } from 'vue-query';
import {
  ResolveUserReportMutation,
  ResolveUserReportMutationVariables,
} from '~~/utils/graphql.generated';
import { QueryKeys } from '~~/utils/query-keys';

export default function () {
  const client = useApiClient();
  const vueQuery = useQueryClient();

  return useMutation({
    mutationFn(vars: ResolveUserReportMutationVariables): Promise<ResolveUserReportMutation> {
      return client.resolveUserReport(vars);
    },
    async onSuccess(data) {
      await vueQuery.invalidateQueries([QueryKeys.FIND_USER_REPORTS]);
      await vueQuery.invalidateQueries([QueryKeys.FIND_USER_REPORT, data.resolveUserReport.id]);
    },
  });
}
