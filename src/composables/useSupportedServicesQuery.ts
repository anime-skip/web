import { useQuery } from 'vue-query';
import { QueryKeys } from '~~/utils/query-keys';
import { getLatestRemoteConfig } from '~~/utils/remote-config';
import { DAY } from '~~/utils/time';

export default function () {
  return useQuery({
    queryKey: QueryKeys.SUPPORTED_SERVICES,
    queryFn: () => getLatestRemoteConfig().then(res => res.services),
    staleTime: DAY,
    cacheTime: DAY,
    refetchOnWindowFocus: false,
  });
}
