import type { GqlResolvers } from "server/graphql/resolver-types.gen";
import { todo } from "shared/utils";
import type { NoOptionals } from "shared/types";
import { type DbExternalLinkInsert, externalLinks } from "server/db/schema";
import { mapDbExternalLinkToGqlExternalLink } from "server/graphql/mappers";

export const externalLinkResolvers: GqlResolvers = {
  Mutation: {
    addExternalLink: async (_parent, args, ctx) => {
      const value: NoOptionals<DbExternalLinkInsert> = {
        url: args.url,
        showId: args.showId,
      };
      const [row] = await ctx.db
        .insert(externalLinks)
        .values(value)
        .returning();
      return mapDbExternalLinkToGqlExternalLink(row);
    },

    removeExternalLink: async (_parent, args, ctx) => {
      const deleted = await ctx.db.transaction(
        (tx) => ctx.externalLinkService.deleteMany(tx, [args]),
        { accessMode: "read write" },
      );
      return mapDbExternalLinkToGqlExternalLink(deleted);
    },
  },
  ExternalLink: {
    url: (_parent, _args, _ctx) => todo(),

    show: (_parent, _args, _ctx) => todo(),

    service: (_parent, _args, _ctx) => todo(),

    serviceId: (_parent, _args, _ctx) => todo(),
  },
};
