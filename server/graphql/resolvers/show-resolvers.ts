import type { GqlResolvers } from "server/graphql/resolver-types.gen.ts";
import { todo } from "shared/utils.ts";
import { getEpisodesByShowId } from "server/graphql/resolvers/episode-resolvers.ts";
import { getShowAdminsByShowId } from "server/graphql/resolvers/show-admin-resolvers.ts";
import { getTemplatesByShowId } from "server/graphql/resolvers/template-resolvers.ts";

export const showResolvers: GqlResolvers = {
  Mutation: {
    createShow: (_parent, _args, _ctx) => todo(),

    updateShow: (_parent, _args, _ctx) => todo(),

    deleteShow: (_parent, _args, _ctx) => todo(),
  },
  Query: {
    findShow: (_parent, args, ctx) => ctx.dataloaders.shows.load(args.showId),

    findShowsByExternalId: (_parent, _args, _ctx) => todo(),

    searchShows: (_parent, _args, _ctx) => todo(),
  },
  Show: {
    createdBy: ({ createdByUserId: id }, _, ctx) =>
      ctx.dataloaders.users.load(id),

    updatedBy: ({ updatedByUserId: id }, _, ctx) =>
      ctx.dataloaders.users.load(id),

    deletedBy: ({ deletedByUserId: id }, _, ctx) =>
      id ? ctx.dataloaders.users.load(id) : null,

    admins: (parent, _args, ctx) => getShowAdminsByShowId(ctx, parent.id),

    episodes: (parent, _args, ctx) => getEpisodesByShowId(ctx, parent.id),

    templates: (parent, _args, ctx) => getTemplatesByShowId(ctx, parent.id),

    externalLinks: (_parent, _args, _ctx) => todo(),

    seasonCount: (_parent, _args, _ctx) => todo(),

    episodeCount: (_parent, _args, _ctx) => todo(),
  },
};
