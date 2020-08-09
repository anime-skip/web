import { MutationTree } from 'vuex';
import { State } from './state';
import { MutationTypes } from './mutation-types';
import { Api } from '@anime-skip/types';
import { RequestState } from '@/utils/enums';

export type Mutations = {
  [MutationTypes.SET_ACCOUNT_INFO](state: State, account?: Api.Account): void;
  [MutationTypes.SIGN_IN_REQUEST_STATE](state: State, requestState: RequestState): void;
  [MutationTypes.SIGN_IN_ERROR](state: State, error: string | undefined): void;
};

export const mutations: MutationTree<State> & Mutations = {
  [MutationTypes.SET_ACCOUNT_INFO](state, account) {
    state.preferences = account?.preferences;
    state.account = account && {
      emailVerified: account.emailVerified,
      username: account.username,
    };
    console.log('SET_ACCOUNT_INFO', state);
  },

  [MutationTypes.SIGN_IN_REQUEST_STATE](state, requestState) {
    state.signInRequestState = requestState;
  },

  [MutationTypes.SIGN_IN_ERROR](state, error) {
    state.signInError = error;
  },
};
