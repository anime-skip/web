import { useAuthStore } from '~~/stores/useAuthStore';
import { useQuery } from 'vue-query';
import { QueryKeys } from '~~/utils/query-keys';
import { HOUR } from '~~/utils/time';

export default function () {
  const auth = useAuthStore();
  const client = useApiClient();

  return useQuery({
    queryKey: [QueryKeys.MY_ACCOUNT, auth.account?.id],
    queryFn() {
      return client.account();
    },
    staleTime: HOUR,
    cacheTime: HOUR,
    enabled: computed(() => !!auth.account),
  });
}
