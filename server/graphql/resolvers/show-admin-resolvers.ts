import type { GqlResolvers } from "server/graphql/resolver-types.gen.ts";
import { todo } from "shared/utils.ts";

export const showAdminResolvers: GqlResolvers = {
  Mutation: {
    createShowAdmin: (_parent, _args, _ctx) => todo(),
    deleteShowAdmin: (_parent, _args, _ctx) => todo(),
  },
  Query: {
    findShowAdmin: (_parent, _args, _ctx) => todo(),
    findShowAdminsByShowId: (_parent, _args, _ctx) => todo(),
    findShowAdminsByUserId: (_parent, _args, _ctx) => todo(),
  },
  ShowAdmin: {
    createdBy: ({ createdByUserId: id }, _, ctx) =>
      ctx.usersDataloader.load(id),
    updatedBy: ({ updatedByUserId: id }, _, ctx) =>
      ctx.usersDataloader.load(id),
    deletedBy: ({ deletedByUserId: id }, _, ctx) =>
      id == null ? null : ctx.usersDataloader.load(id),
    show: (_parent, _args, _ctx) => todo(),
    user: (_parent, _args, _ctx) => todo(),
  },
};
