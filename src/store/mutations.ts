import { RequestState } from '@/utils/enums';
import { MutationTree } from 'vuex';
import { MutationTypes } from './mutation-types';
import { State } from './state';

export type Mutations = {
  [MutationTypes.SET_ACCOUNT_INFO](state: State, account?: State['account']): void;
  [MutationTypes.LOG_IN_REQUEST_STATE](state: State, requestState: RequestState): void;
};

export const mutations: MutationTree<State> & Mutations = {
  [MutationTypes.SET_ACCOUNT_INFO](state, account) {
    state.account = account;
  },

  [MutationTypes.LOG_IN_REQUEST_STATE](state, requestState) {
    state.signInRequestState = requestState;
  },
};
