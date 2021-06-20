import createAnimeSkipClient from '@anime-skip/axios-api';
import { UNAUTHORIZED_ERROR_MESSAGE } from './utils/constants';
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

  // TODO: un-hardcode the expiration dates
  const now = Date.now();
  const accessTokenExpiresAt = now + 12 * TimeUtils.HOURS;
  const refreshTokenExpiresAt = now + 7 * TimeUtils.DAYS;

  localStorage.setItem(LocalStorageKeys.ACCESS_TOKEN, accessToken);
  localStorage.setItem(LocalStorageKeys.ACCESS_TOKEN_EXPIRES_AT, String(accessTokenExpiresAt));
  localStorage.setItem(LocalStorageKeys.REFRESH_TOKEN, refreshToken);
  localStorage.setItem(LocalStorageKeys.REFRESH_TOKEN_EXPIRES_AT, String(refreshTokenExpiresAt));
}

export async function getAccessToken(
  client: ReturnType<typeof createAnimeSkipClient>,
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
    const {
      authToken: newAccessToken,
      refreshToken: newRefreshToken,
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    } = (await client.loginRefresh(`{ authToken refreshToken }`, { refreshToken }))!;

    persistTokens(newAccessToken, newRefreshToken);

    return newAccessToken;
  }

  persistTokens(undefined, undefined);
  throw UNAUTHORIZED_ERROR_MESSAGE;
}

function createExtendedClient() {
  const url = import.meta.env.VITE_API_URL;
  const clientId = 'th2oogUKrgOf1J8wMSIUPV0IpBMsLOJi';
  const client = createAnimeSkipClient(url, clientId);

  return {
    ...client,
    async isUsernameInUse(username: string): Promise<boolean> {
      try {
        await client.findUserByUsername(`{ username }`, { username });
        return true;
      } catch (_) {
        // TODO: throw actual errors
        return false;
      }
    },
  };
}

export default createExtendedClient();
