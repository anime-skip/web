import { useAuthStore } from '~~/stores/useAuthStore';
import { DEFAULT_PROFILE_URL } from '~~/utils/constants';

export default function () {
  const auth = useAuthStore();
  return computed(() => auth.account?.profileUrl || DEFAULT_PROFILE_URL);
}
