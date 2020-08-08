import { ActionTree, ActionContext } from 'vuex';
import { State } from './state';
import { Mutations } from './mutations';
import { ActionTypes } from './action-types';

type AugmentedActionContext = {
  commit<K extends keyof Mutations>(
    key: K,
    payload: Parameters<Mutations[K]>[1],
  ): ReturnType<Mutations[K]>;
} & Omit<ActionContext<State, State>, 'commit'>;

export interface Actions {
  [ActionTypes.SIGN_UP](
    context: AugmentedActionContext,
    payload: { username: string; email: string; passwordHash: string; recaptchaResponse: string },
  ): Promise<void>;
  [ActionTypes.SIGN_IN](
    context: AugmentedActionContext,
    payload: { usernameOrEmail: string; passwordHash: string; recaptchaResponse: string },
  ): Promise<void>;
}

export const actions: ActionTree<State, State> & Actions = {
  async [ActionTypes.SIGN_UP](context, payload) {
    console.info('signUp', payload);
  },
  async [ActionTypes.SIGN_IN](context, payload) {
    console.info('signIn', payload);
  },
};
