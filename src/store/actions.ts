import api, { persistTokens } from '@/api';
import plugins from '@/plugins';
import { RequestState } from '@/utils/enums';
import Errors from '@/utils/errors';
import { ActionContext, ActionTree } from 'vuex';
import { LOG_IN_REDIRECT, UNAUTHORIZED_ERROR_MESSAGE } from '../utils/constants';
import { ActionTypes } from './action-types';
import { MutationTypes } from './mutation-types';
import { Mutations } from './mutations';
import { State } from './state';

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
      passwordHash: string;
      recaptchaResponse: string;
      setErrorMessage(message: string | undefined): void;
      customRedirect?: string;
    },
  ): Promise<void>;
  [ActionTypes.LOG_IN](
    context: AugmentedActionContext,
    payload: {
      usernameEmail: string;
      passwordHash: string;
      setErrorMessage(message: string | undefined): void;
      customRedirect?: string;
    },
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
    { username, email, passwordHash, recaptchaResponse, customRedirect, setErrorMessage },
  ) {
    commit(MutationTypes.LOG_IN_REQUEST_STATE, RequestState.LOADING);
    setErrorMessage(undefined);

    try {
      const response = await callApi(
        dispatch,
        api.createAccount,
        `{
          authToken
          refreshToken
          account {
            id
            username
            email
            emailVerified
            profileUrl
          }
        }`,
        {
          username,
          email: email.toLowerCase(),
          passwordHash,
          recaptchaResponse,
        },
      );
      if (response == null) throw Error('Internal error: account not available');
      const { account, authToken, refreshToken } = response;

      persistTokens(authToken, refreshToken);

      commit(MutationTypes.SET_ACCOUNT_INFO, account);
      commit(MutationTypes.LOG_IN_REQUEST_STATE, RequestState.SUCCESS);
      await plugins.router.push({ path: customRedirect ?? LOG_IN_REDIRECT });
    } catch (err) {
      commit(MutationTypes.LOG_IN_REQUEST_STATE, RequestState.FAILURE);
      setErrorMessage(Errors.signUpErrorMessage(err));
    }
  },
  async [ActionTypes.LOG_IN](
    { commit, dispatch },
    { usernameEmail, passwordHash, customRedirect, setErrorMessage },
  ) {
    commit(MutationTypes.LOG_IN_REQUEST_STATE, RequestState.LOADING);
    setErrorMessage(undefined);

    try {
      const response = await callApi(
        dispatch,
        api.login,
        `{
          authToken
          refreshToken
          account {
            id
            username
            email
            emailVerified
            profileUrl
          }
        }`,
        { passwordHash, usernameEmail },
      );
      if (response == null) throw Error('Internal error: account not available');
      persistTokens(response.authToken, response.refreshToken);

      commit(MutationTypes.SET_ACCOUNT_INFO, response.account);
      await plugins.router.push({ path: customRedirect ?? LOG_IN_REDIRECT });
      commit(MutationTypes.LOG_IN_REQUEST_STATE, RequestState.SUCCESS);
    } catch (err) {
      commit(MutationTypes.LOG_IN_REQUEST_STATE, RequestState.FAILURE);
      setErrorMessage(Errors.logInErrorMessage(err));
    }
  },
  [ActionTypes.LOG_OUT]({ commit }, customRedirect) {
    // Clear account
    commit(MutationTypes.SET_ACCOUNT_INFO, undefined);

    // Clear tokens
    persistTokens(undefined, undefined);

    // Navigate to sign-in page
    let url = '/log-in';
    if (customRedirect) {
      url += `&redirect=${encodeURI(customRedirect)}`;
    }
    plugins.router.push({ path: url });
  },
};
