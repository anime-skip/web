import type { GqlResolvers } from "server/graphql/resolver-types.gen.ts";
import { todo } from "shared/utils.ts";
import type { NoOptionals } from "shared/types.ts";
import { type DbExternalLinkInsert, externalLinks } from "server/db/schema.ts";
import { mapDbExternalLinkToGqlExternalLink } from "server/graphql/mappers.ts";
import { hardDeleteExternalLinks } from "server/utils/db.ts";

export const externalLinkResolvers: GqlResolvers = {
  Mutation: {
    addExternalLink: async (_parent, args, ctx) => {
      const value: NoOptionals<DbExternalLinkInsert> = {
        url: args.url,
        showId: args.showId,
      };
      const [row] = await ctx.db.insert(externalLinks)
        .values(value)
        .returning();
      return mapDbExternalLinkToGqlExternalLink(row);
    },

    removeExternalLink: async (_parent, args, ctx) => {
      const deleted = await ctx.db.transaction(
        (tx) => hardDeleteExternalLinks(tx, [args]),
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
