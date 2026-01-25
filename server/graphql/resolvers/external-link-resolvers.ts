import type { GqlResolvers } from "server/graphql/resolver-types.gen";
import type { NoOptionals } from "shared/types";
import { type DbExternalLinkInsert, externalLinks } from "server/db/schema";
import { mapDbExternalLinkToGqlExternalLink } from "server/graphql/mappers";
import type { GqlContext } from "server/graphql/context";
import { eq } from "drizzle-orm";
import { extractServiceId } from "server/utils/external-service-utils";

export const externalLinkResolvers: GqlResolvers = {
  Mutation: {
    addExternalLink: async (_parent, args, ctx) => {
      const cleanUrl = ctx.externalLinkService.sanitizeUrl(args.url);

      const value: NoOptionals<DbExternalLinkInsert> = {
        url: cleanUrl,
        showId: args.showId,
      };
      const [row] = await ctx.db
        .insert(externalLinks)
        .values(value)
        .returning();
      return mapDbExternalLinkToGqlExternalLink(row);
    },

    removeExternalLink: async (_parent, args, ctx) => {
      const [deleted] = await ctx.db.transaction(
        (tx) => ctx.externalLinkService.deleteMany(tx, [args]),
        { accessMode: "read write" },
      );
      if (!deleted) {
        throw new Error(`External link not found: ${args.url}`);
      }
      return mapDbExternalLinkToGqlExternalLink(deleted);
    },
  },
  ExternalLink: {
    url: (parent, _args, ctx) => {
      return ctx.externalLinkService.sanitizeUrl(parent.url);
    },

    show: (parent, _args, ctx) => ctx.dataloaders.shows.load(parent.showId),

    service: (parent) => {
      const parsed = new URL(parent.url);
      return parsed.hostname;
    },

    serviceId: (parent) => {
      return extractServiceId(parent.url);
    },
  },
};

export async function getExternalLinksByShowId(
  ctx: GqlContext,
  showId: string,
): Promise<GqlExternalLink[]> {
  const rows = await ctx.db.query.externalLinks.findMany({
    where: eq(externalLinks.showId, showId),
  });
  return rows.map(mapDbExternalLinkToGqlExternalLink);
}
