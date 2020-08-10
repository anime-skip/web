export enum LocalStorageKeys {
  ACCESS_TOKEN = 'accessToken',
  ACCESS_TOKEN_EXPIRES_AT = 'accessTokenExpiresAt',
  REFRESH_TOKEN = 'refreshToken',
  REFRESH_TOKEN_EXPIRES_AT = 'refreshTokenExpiresAt',
}

export enum RequestState {
  LOADING,
  SUCCESS,
  FAILURE,
}
