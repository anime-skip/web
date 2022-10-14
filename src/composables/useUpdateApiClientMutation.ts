import { useMutation, useQueryClient } from 'vue-query';
import { QueryKeys } from '~~/utils/query-keys';

export default function () {
  const client = useApiClient();
  const vueQuery = useQueryClient();

  return useMutation({
    mutationFn: client.updateApiClient,
    async onSuccess() {
      await vueQuery.invalidateQueries(QueryKeys.MY_API_CLEINTS);
    },
  });
}
