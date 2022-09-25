import { AuthDetailsFragment } from '~~/utils/graphql.generated';
import { StorageSerializers } from '@vueuse/core';
import { Ref } from 'vue';

export const useAuthStore = definePiniaStore('auth', () => {
  const auth = useLocalStorage<AuthDetailsFragment>('@auth/login', null, {
    serializer: StorageSerializers.object,
  });

  function setLoggedInDetails(authDetails: AuthDetailsFragment) {
    auth.value = authDetails;
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
    clearLoggedInDetails,
  };
});
