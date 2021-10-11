import { ActionTypes } from '@/store/action-types';
import { computed } from 'vue';
import { useStore } from 'vuex';

export default function useAccount(store = useStore()) {
  const account = computed(() => store.state.account);
  const isEmailVerified = computed<boolean>(() => !!account.value?.emailVerified);
  const username = computed<string>(() => account.value?.username ?? '');
  const email = computed<string>(() => account.value?.email ?? '');

  return {
    account,
    isEmailVerified,
    username,
    email,
  };
}

export function useReloadAccount(store = useStore()) {
  return async () => await store.dispatch(ActionTypes.RELOAD_ACCOUNT, undefined);
}
