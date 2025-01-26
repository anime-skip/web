import type { GqlResolvers } from "server/graphql/resolver-types.gen.ts";
import { todo } from "shared/utils.ts";

export const showAdminResolvers: GqlResolvers = {
  Mutation: {
    createShowAdmin: (_parent, _args, _ctx) => todo(),

    deleteShowAdmin: (_parent, _args, _ctx) => todo(),
  },
  Query: {
    findShowAdmin: (_parent, args, ctx) =>
      ctx.dataloaders.showAdmins.load(args.showAdminId),

    findShowAdminsByShowId: (_parent, _args, _ctx) => todo(),

    findShowAdminsByUserId: (_parent, _args, _ctx) => todo(),
  },
  ShowAdmin: {
    createdBy: ({ createdByUserId: id }, _, ctx) =>
      ctx.dataloaders.users.load(id),

    updatedBy: ({ updatedByUserId: id }, _, ctx) =>
      ctx.dataloaders.users.load(id),

    deletedBy: ({ deletedByUserId: id }, _, ctx) =>
      id == null ? null : ctx.dataloaders.users.load(id),

    show: (parent, _args, ctx) => ctx.dataloaders.shows.load(parent.showId),

    user: (parent, _args, ctx) => ctx.dataloaders.users.load(parent.userId),
  },
};
