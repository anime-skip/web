import { ActionTree, ActionContext } from 'vuex';
import { State } from './state';
import { Mutations } from './mutations';
import { ActionTypes } from './action-types';
import { MutationTypes } from './mutation-types';
import { UNAUTHORIZED_ERROR_MESSAGE, SIGN_IN_REDIRECT } from '../utils/constants';
import api, { persistTokens } from '@/api';
import { RequestState } from '@/utils/enums';
import Errors from '@/utils/errors';
import router from '@/router';

//#region Types
type AugmentedActionContext = {
  commit<K extends keyof Mutations>(
    key: K,
    payload: Parameters<Mutations[K]>[1],
  ): ReturnType<Mutations[K]>;
} & Omit<ActionContext<State, State>, 'commit'>;

export interface Actions {
  [ActionTypes.SIGN_UP](
    context: AugmentedActionContext,
    payload: {
      username: string;
      email: string;
      password: string;
      recaptchaResponse: string;
      customRedirect?: string;
    },
  ): Promise<void>;
  [ActionTypes.SIGN_IN](
    context: AugmentedActionContext,
    payload: { usernameOrEmail: string; password: string; customRedirect?: string },
  ): Promise<void>;
  [ActionTypes.LOG_OUT](context: AugmentedActionContext, customRedirect?: string): void;
}
//#endregion

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const callApi = async <A extends any[], R>(
  dispatch: AugmentedActionContext['dispatch'],
  apiMethod: (...args: A) => Promise<R>,
  ...args: A
): Promise<R> => {
  try {
    return await apiMethod.apply(api, args);
  } catch (err) {
    if (err.message == UNAUTHORIZED_ERROR_MESSAGE) {
      dispatch(ActionTypes.LOG_OUT, undefined);
    }
    throw err;
  }
};

export const actions: ActionTree<State, State> & Actions = {
  async [ActionTypes.SIGN_UP](
    { commit, dispatch },
    { username, email, password, recaptchaResponse, customRedirect },
  ) {
    console.log('signUp', { username, email, password, recaptchaResponse });
    commit(MutationTypes.SIGN_IN_REQUEST_STATE, RequestState.LOADING);
    commit(MutationTypes.SIGN_IN_ERROR, undefined);
    try {
      const response = await callApi(
        dispatch,
        api.createAccount,
        username,
        email,
        password,
        recaptchaResponse,
      );
      persistTokens(response.authToken, response.refreshToken);
      commit(MutationTypes.SET_ACCOUNT_INFO, response.account);
      commit(MutationTypes.SIGN_IN_REQUEST_STATE, RequestState.SUCCESS);

      const redirectUrl = customRedirect ?? SIGN_IN_REDIRECT;
      console.log('redirecting to: ', redirectUrl);
      router.push({ path: redirectUrl });
    } catch (err) {
      commit(MutationTypes.SIGN_IN_REQUEST_STATE, RequestState.FAILURE);
      commit(MutationTypes.SIGN_IN_ERROR, Errors.signUpErrorMessage(err));
    }
  },
  async [ActionTypes.SIGN_IN]({ commit, dispatch }, { usernameOrEmail, password, customRedirect }) {
    console.log('signIn', { usernameOrEmail, password });
    commit(MutationTypes.SIGN_IN_REQUEST_STATE, RequestState.LOADING);
    commit(MutationTypes.SIGN_IN_ERROR, undefined);
    try {
      const response = await callApi(dispatch, api.loginManual, usernameOrEmail, password);
      persistTokens(response.authToken, response.refreshToken);
      commit(MutationTypes.SET_ACCOUNT_INFO, response.account);
      commit(MutationTypes.SIGN_IN_REQUEST_STATE, RequestState.SUCCESS);

      const redirectUrl = customRedirect ?? SIGN_IN_REDIRECT;
      console.log('redirecting to: ', redirectUrl);
      router.push({ path: redirectUrl });
    } catch (err) {
      commit(MutationTypes.SIGN_IN_REQUEST_STATE, RequestState.FAILURE);
      commit(MutationTypes.SIGN_IN_ERROR, Errors.signInErrorMessage(err));
    }
  },
  [ActionTypes.LOG_OUT]({ commit }, customRedirect) {
    // Clear account
    commit(MutationTypes.SET_ACCOUNT_INFO, undefined);

    // Clear tokens
    persistTokens(undefined, undefined);

    // Navigate to sign-in page
    let url = '/sign-in';
    if (customRedirect) {
      url += `&redirect=${encodeURI(customRedirect)}`;
    }
    router.push({ path: url });
  },
};
