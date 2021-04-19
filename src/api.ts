import AxiosApi from '@anime-skip/axios-api';
import { Api } from '@anime-skip/types';
import { LocalStorageKeys } from './utils/enums';
import TimeUtils from './utils/time';
import { UNAUTHORIZED_ERROR_MESSAGE } from './utils/constants';

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
  throw UNAUTHORIZED_ERROR_MESSAGE;
}

export class ExtendedApi extends AxiosApi {
  public constructor() {
    super(getAccessToken, import.meta.env.VITE_API_URL);
  }

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

  public async getAllTimestampTypes(): Promise<Api.TimestampType[]> {
    const response = await this.sendUnauthorizedGraphql<'allTimestampTypes', Api.TimestampType[]>({
      query: `{
        allTimestampTypes {
          id
          name
          description
        }
      }`,
    });
    return response.data.allTimestampTypes;
  }

  public async recentlyAddedEpisodes(
    limit?: number,
    offset?: number,
  ): Promise<(Api.Episode & { createdAt: number })[]> {
    const response = await this.sendUnauthorizedGraphql<
      'recentlyAddedEpisodes',
      (Api.Episode & { createdAt: number })[]
    >({
      query: `query RecentlyAddedEpisodes($limit: Int, $offset: Int) {
        recentlyAddedEpisodes(limit: $limit, offset: $offset) {
          id name season number absoluteNumber createdAt
          show {
            name
          }
        }
      }`,
      variables: {
        limit,
        offset,
      },
    });
    return response.data.recentlyAddedEpisodes;
  }
}

export default new ExtendedApi();
