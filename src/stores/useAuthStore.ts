import { AuthDetailsFragment, LoggedInAccountFragment } from '~~/utils/graphql.generated';
import { StorageSerializers } from '@vueuse/core';

export const useAuthStore = defineStore('auth', () => {
  const auth = useLocalStorage<AuthDetailsFragment>('@auth/login', null, {
    serializer: StorageSerializers.object,
  });

  function setLoggedInDetails(authDetails: AuthDetailsFragment) {
    auth.value = authDetails;
  }
  function setAccount(account: LoggedInAccountFragment) {
    auth.value = {
      ...auth.value,
      account,
    };
  }
  function clearLoggedInDetails() {
    auth.value = null;
  }

  const accessToken = computed(() => auth.value?.authToken);
  const refreshToken = computed(() => auth.value?.refreshToken);
  const account = computed(() => auth.value?.account);
  return {
    accessToken,
    refreshToken,
    account,
    setLoggedInDetails,
    setAccount,
    clearLoggedInDetails,
  };
});
