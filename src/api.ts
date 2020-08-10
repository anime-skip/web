import AxiosApi from '@anime-skip/axios-api';
import { Api } from '@anime-skip/types';
import { LocalStorageKeys } from './utils/enums';
import TimeUtils from './utils/time';

export function persistTokens(accessToken: string, refreshToken: string): void;
export function persistTokens(accessToken: undefined, refreshToken: undefined): void;
export function persistTokens(accessToken?: string, refreshToken?: string): void {
  if (accessToken == null || refreshToken == null) {
    localStorage.removeItem(LocalStorageKeys.ACCESS_TOKEN);
    localStorage.removeItem(LocalStorageKeys.ACCESS_TOKEN_EXPIRES_AT);
    localStorage.removeItem(LocalStorageKeys.REFRESH_TOKEN);
    localStorage.removeItem(LocalStorageKeys.REFRESH_TOKEN_EXPIRES_AT);
    return;
  }

  const now = Date.now();
  const accessTokenExpiresAt = now + 12 * TimeUtils.HOURS;
  const refreshTokenExpiresAt = now + 7 * TimeUtils.DAYS;

  localStorage.setItem(LocalStorageKeys.ACCESS_TOKEN, accessToken);
  localStorage.setItem(LocalStorageKeys.ACCESS_TOKEN_EXPIRES_AT, String(accessTokenExpiresAt));
  localStorage.setItem(LocalStorageKeys.REFRESH_TOKEN, refreshToken);
  localStorage.setItem(LocalStorageKeys.REFRESH_TOKEN_EXPIRES_AT, String(refreshTokenExpiresAt));
}

export async function getAccessToken(
  refreshAccessToken: (refreshToken: string) => Promise<Api.LoginRefreshResponse>,
): Promise<string> {
  const accessToken = localStorage.getItem(LocalStorageKeys.ACCESS_TOKEN);
  const accessTokenExpiresAt = Number(
    localStorage.getItem(LocalStorageKeys.ACCESS_TOKEN_EXPIRES_AT),
  );
  const now = Date.now();

  if (!!accessToken && accessTokenExpiresAt > now) return accessToken;

  const refreshToken = localStorage.getItem(LocalStorageKeys.REFRESH_TOKEN);
  const refreshTokenExpiresAt = Number(
    localStorage.getItem(LocalStorageKeys.REFRESH_TOKEN_EXPIRES_AT),
  );

  if (!!refreshToken && refreshTokenExpiresAt > now) {
    const { authToken: newAccessToken, refreshToken: newRefreshToken } = await refreshAccessToken(
      refreshToken,
    );

    persistTokens(newAccessToken, newRefreshToken);

    return newAccessToken;
  }

  persistTokens(undefined, undefined);
  throw 'Unauthorized - login';
}

export class ExtendedApi extends AxiosApi {
  public async isUsernameInUse(username: string): Promise<boolean> {
    try {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      await this.sendUnauthorizedGraphql<'findUserByUsername', any>({
        query: `{
          findUserByUsername(username: "${username}") {
            username
          }
        }`,
      });
      return true;
    } catch (err) {
      return false;
    }
  }
}

export default new ExtendedApi(getAccessToken);