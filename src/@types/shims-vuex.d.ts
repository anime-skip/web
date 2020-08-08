import { Store as MyStore } from '../store';

declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $store: MyStore;
  }
}

// Vuex@4.0.0-beta.1 is missing the typing for `useStore`. See https://github.com/vuejs/vuex/issues/1736
declare module 'vuex' {
  export function useStore(key?: string): MyStore;
}
