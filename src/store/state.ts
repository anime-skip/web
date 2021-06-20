import { Api } from '@/@types/api';
import { RequestState } from '@/utils/enums';

export interface State {
  // Account
  account?: Api.StateAccount;
  preferences?: Api.StatePreferences;
  signInRequestState: RequestState;
  signInError?: string;
}

export const state: State = {
  account: undefined,
  preferences: undefined,
  signInRequestState: RequestState.SUCCESS,
};
