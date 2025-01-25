import type { GqlResolvers } from "server/graphql/resolver-types.gen.ts";
import { todo } from "shared/utils.ts";

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
    createdBy: ({ createdByUserId: id }, _, ctx) =>
      ctx.dataloaders.users.load(id),
    updatedBy: ({ updatedByUserId: id }, _, ctx) =>
      ctx.dataloaders.users.load(id),
    deletedBy: ({ deletedByUserId: id }, _, ctx) =>
      id == null ? null : ctx.dataloaders.users.load(id),
  },
};
