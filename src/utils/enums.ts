export enum LocalStorageKeys {
  ACCESS_TOKEN = 'accessToken',
  ACCESS_TOKEN_EXPIRES_AT = 'accessTokenExpiresAt',
  REFRESH_TOKEN = 'refreshToken',
  REFRESH_TOKEN_EXPIRES_AT = 'refreshTokenExpiresAt',
}

export enum SessionStorageKeys {
  EXTENSION_INSTALLED = 'extensionInstalled',
  EXTENSION_LOGGED_IN = 'extensionLoggedIn',
}

export enum RequestState {
  NOT_REQUESTED,
  LOADING,
  SUCCESS,
  FAILURE,
}
