import VuexPersistence from 'vuex-persist';
import { State } from '../state';

export default new VuexPersistence<State>({
  storage: window.localStorage,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  reducer: ({ signInError, signInRequestState, ...persistedState }) => persistedState,
}).plugin;
