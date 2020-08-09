import { Api } from '@anime-skip/types';
import { RequestState } from '@/utils/enums';

export interface State {
  // Account
  account?: Omit<Api.Account, 'preferences'>;
  preferences?: Api.Preferences;
  signInRequestState: RequestState;
  signInError?: string;
}

export const state: State = {
  account: undefined,
  preferences: undefined,
  signInRequestState: RequestState.SUCCESS,
  signInError: undefined,
};
