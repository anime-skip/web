import { useQuery } from 'vue-query';
import { QueryKeys } from '~~/utils/query-keys';
import { DAY, HOUR } from '~~/utils/time';

export default function () {
  const client = useApiClient(false);
  return useQuery({
    queryKey: QueryKeys.ALL_TIMESTAMP_TYPES,
    queryFn() {
      return client.allTimestampTypes();
    },
    staleTime: HOUR,
  });
}
