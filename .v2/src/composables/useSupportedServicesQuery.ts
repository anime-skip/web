import { useQuery } from 'vue-query';
import { getLatestRemoteConfig } from '~~/utils/remote-config';
import { DAY } from '~~/utils/time';

export default function () {
  return useQuery({
    queryKey: 'supported-services',
    queryFn: () => getLatestRemoteConfig().then(res => res.services),
    staleTime: DAY,
  });
}
