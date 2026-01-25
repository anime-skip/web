import type { GqlResolvers } from "server/graphql/resolver-types.gen";
import { eq } from "drizzle-orm";
import type { GqlContext } from "server/graphql/context";
import { templateTimestamps } from "server/db/schema";
import { mapDbTemplateTimestampToGqlTemplateTimestamp } from "server/graphql/mappers";

export const templateTimestampResolvers: GqlResolvers = {
  Mutation: {
    addTimestampToTemplate: async (_parent, args, ctx) => {
      const [row] = await ctx.db
        .insert(templateTimestamps)
        .values(args.templateTimestamp)
        .returning();
      return mapDbTemplateTimestampToGqlTemplateTimestamp(row);
    },

    removeTimestampFromTemplate: async (_parent, args, ctx) => {
      const deleted = await ctx.db.transaction(
        (tx) =>
          ctx.templateTimestampService.deleteMany(tx, [args.templateTimestamp]),
        { accessMode: "read write" },
      );
      return mapDbTemplateTimestampToGqlTemplateTimestamp(deleted);
    },
  },
  TemplateTimestamp: {
    template: (parent, _args, ctx) =>
      ctx.dataloaders.templates.load(parent.templateId),

    timestamp: (parent, _args, ctx) =>
      ctx.dataloaders.timestamps.load(parent.timestampId),
  },
};

export async function getTemplateTimestampsByTemplateId(
  ctx: GqlContext,
  templateId: string,
): Promise<GqlTemplateTimestamp[]> {
  const rows = await ctx.db.query.templateTimestamps.findMany({
    where: eq(templateTimestamps.templateId, templateId),
  });
  return rows.map(mapDbTemplateTimestampToGqlTemplateTimestamp);
}
