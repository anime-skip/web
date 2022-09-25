import { getSdk } from '../utils/graphql.generated';
import { GraphQLClient } from 'graphql-request';

const BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://api.anime-skip.com';

export default function () {
  const client = new GraphQLClient(BASE_URL);
  return getSdk(client);
}
