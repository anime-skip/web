import { GetterTypes } from './getter-types';
import { GetterTree } from 'vuex';
import { State } from './state';

export type Getters = {
  [GetterTypes.IS_SIGNED_IN](state: State): boolean;
};

export const getters: GetterTree<State, State> & Getters = {
  [GetterTypes.IS_SIGNED_IN](state): boolean {
    return state.account != null;
  },
};
