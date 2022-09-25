import { GraphQLClient } from 'graphql-request';
import { createBaseGraphqlClient } from './base-graphql-client';
import { getSdk } from './graphql.generated';
import { useAuthStore } from '~~/stores/useAuthStore';
import { configureRefreshFetch } from 'refresh-fetch';

export function createAuthorizedGraphqlClient(): GraphQLClient {
  const config = useRuntimeConfig();
  const baseClient = getSdk(createBaseGraphqlClient());
  const auth = useAuthStore();

  return new GraphQLClient(config.public.API_URL, {
    fetch: configureRefreshFetch({
      fetch,
      async refreshToken() {
        const data = await baseClient.loginRefresh({ refreshToken: auth.refreshToken });
        auth.setLoggedInDetails(data.loginRefresh);
      },
      shouldRefreshToken(error) {
        // res.status === 200 && !!error.find(e => e.message === 'Access token is expired');
        console.log(error);
        return false;
      },
    }),
    headers: () => ({ Authorization: `Bearer ${auth.accessToken}` }),
  });
}
