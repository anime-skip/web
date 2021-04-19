import { ActionTree, ActionContext } from 'vuex';
import { State } from './state';
import { Mutations } from './mutations';
import { ActionTypes } from './action-types';
import { MutationTypes } from './mutation-types';
import { UNAUTHORIZED_ERROR_MESSAGE, LOG_IN_REDIRECT } from '../utils/constants';
import api, { persistTokens } from '@/api';
import { RequestState } from '@/utils/enums';
import Errors from '@/utils/errors';
import plugins from '@/plugins';

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
      setErrorMessage(message: string | undefined): void;
      customRedirect?: string;
    },
  ): Promise<void>;
  [ActionTypes.LOG_IN](
    context: AugmentedActionContext,
    payload: {
      usernameOrEmail: string;
      password: string;
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
    { username, email, password, recaptchaResponse, customRedirect, setErrorMessage },
  ) {
    commit(MutationTypes.LOG_IN_REQUEST_STATE, RequestState.LOADING);
    setErrorMessage(undefined);

    try {
      const { account, authToken, refreshToken } = await callApi(
        dispatch,
        api.createAccount,
        username,
        email.toLowerCase(),
        password,
        recaptchaResponse,
      );
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
    { usernameOrEmail, password, customRedirect, setErrorMessage },
  ) {
    commit(MutationTypes.LOG_IN_REQUEST_STATE, RequestState.LOADING);
    setErrorMessage(undefined);

    try {
      const response = await callApi(dispatch, api.loginManual, usernameOrEmail, password);
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
