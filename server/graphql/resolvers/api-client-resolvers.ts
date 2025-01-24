import type { GqlResolvers } from "server/graphql/resolver-types.gen.ts";
import { todo } from "shared/utils.ts";
import {
  createMaybeUserResolver,
  createUserResolver,
} from "server/graphql/utils.ts";

export const apiClientResolvers: GqlResolvers = {
  Mutation: {
    createApiClient: (_parent, _args, _ctx) => todo(),
    updateApiClient: (_parent, _args, _ctx) => todo(),
    deleteApiClient: (_parent, _args, _ctx) => todo(),
  },
  Query: {
    findApiClient: (_parent, _args, _ctx) => todo(),
    myApiClients: (_parent, _args, _ctx) => todo(),
  },
  ApiClient: {
    createdBy: createUserResolver("createdByUserId"),
    updatedBy: createUserResolver("updatedByUserId"),
    deletedBy: createMaybeUserResolver("deletedByUserId"),
  },
};
