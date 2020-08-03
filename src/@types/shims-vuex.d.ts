import { Store } from 'vuex';
import State from '@/store/state';

declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $store: Store<typeof State>;
  }
}

// Vuex@4.0.0-beta.1 is missing the typing for `useStore`. See https://github.com/vuejs/vuex/issues/1736
declare module 'vuex' {
  export function useStore(key?: string): Store<typeof State>;
}
