export interface State {
  // Account
  accessToken?: string;
  accessTokenExpiresAt?: number;
  refreshToken?: string;
  refreshTokenExpiresAt?: number;
  account?: {};
}

export const state: State = {
  accessToken: undefined,
  accessTokenExpiresAt: undefined,
  refreshToken: undefined,
  refreshTokenExpiresAt: undefined,
  account: undefined,
};
