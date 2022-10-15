import { Ref } from 'nuxt/dist/app/compat/capi';
import { QueryMyApiClientsArgs } from '~~/utils/graphql.generated';
import { useInfiniteQuery } from 'vue-query';
import { QueryKeys } from '~~/utils/query-keys';
import { withPagination } from '~~/utils/with-pagination';

export default function (vars: Ref<Omit<QueryMyApiClientsArgs, 'offset'>>) {
  const client = useApiClient();
  const DEFAULT_LIMIT = 10;

  return useInfiniteQuery({
    queryKey: [QueryKeys.MY_API_CLEINTS, vars],
    async queryFn({ pageParam = 0 }) {
      const fn = withPagination(client.myApiClients, res => res.myApiClients, DEFAULT_LIMIT);
      return fn({ ...vars.value, offset: pageParam });
    },
    getNextPageParam(res) {
      return res.nextOffset;
    },
  });
}
