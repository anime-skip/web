import { AuthDetailsFragment, LoggedInAccountFragment, Role } from '~~/utils/graphql.generated';
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

  const canAccessAdminDashboard = computed(() =>
    [Role.Admin, Role.Dev, Role.Reviewer].includes(account.value?.role),
  );
  const canAccessUserReports = computed(() =>
    [Role.Admin, Role.Dev, Role.Reviewer].includes(account.value?.role),
  );
  const canAccessValidationErrors = computed(() =>
    [Role.Admin, Role.Dev].includes(account.value?.role),
  );
  const canChangeApiClientRateLimit = computed(() =>
    [Role.Admin, Role.Dev].includes(account.value?.role),
  );

  return {
    accessToken,
    refreshToken,
    account,
    setLoggedInDetails,
    setAccount,
    clearLoggedInDetails,
    canAccessAdminDashboard,
    canAccessUserReports,
    canAccessValidationErrors,
    canChangeApiClientRateLimit,
  };
});
