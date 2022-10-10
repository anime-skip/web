import { GraphQLClient } from 'graphql-request';

export function createBaseGraphqlClient(): GraphQLClient {
  const config = useRuntimeConfig();
  return new GraphQLClient(config.public.API_URL, {
    headers: { 'X-Client-ID': config.public.API_CLIENT_ID },
  });
}
