import { MutationTree } from 'vuex';
import { State } from './state';
import { MutationTypes } from './mutation-types';
import { Api } from '@anime-skip/types';
import { RequestState } from '@/utils/enums';

export type Mutations = {
  [MutationTypes.SET_ACCOUNT_INFO](state: State, account?: Api.Account): void;
  [MutationTypes.LOG_IN_REQUEST_STATE](state: State, requestState: RequestState): void;
};

export const mutations: MutationTree<State> & Mutations = {
  [MutationTypes.SET_ACCOUNT_INFO](state, account) {
    state.preferences = account?.preferences;
    state.account = account && {
      emailVerified: account.emailVerified,
      username: account.username,
      email: account.email,
    };
  },

  [MutationTypes.LOG_IN_REQUEST_STATE](state, requestState) {
    state.signInRequestState = requestState;
  },
};
