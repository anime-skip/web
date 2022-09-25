import { getSdk } from '~~/utils/graphql.generated';
import { createAuthorizedGraphqlClient } from '~~/utils/authorized-graphql-client';
import { createBaseGraphqlClient } from '~~/utils/base-graphql-client';

export default (authorized = true) =>
  getSdk(authorized ? createAuthorizedGraphqlClient() : createBaseGraphqlClient());
