import { eq } from "drizzle-orm";
import { templateTimestamps } from "server/db/schema";
import type { GqlContext } from "server/graphql/context";
import { mapDbTemplateTimestampToGqlTemplateTimestamp } from "server/graphql/mappers";
import type { GqlResolvers } from "server/graphql/resolver-types.gen";

export const templateTimestampResolvers: GqlResolvers = {
  Mutation: {
    addTimestampToTemplate: async (_parent, args, ctx) => {
      const [row] = await ctx.deps.db
        .insert(templateTimestamps)
        .values(args.templateTimestamp)
        .returning();
      return mapDbTemplateTimestampToGqlTemplateTimestamp(row);
    },

    removeTimestampFromTemplate: async (_parent, args, ctx) => {
      const [deleted] = await ctx.deps.db.transaction(
        (tx) => ctx.deps.templateTimestampService.deleteMany(tx, [args.templateTimestamp]),
        { accessMode: "read write" },
      );
      if (!deleted) {
        throw new Error(`Template timestamp not found`);
      }
      return mapDbTemplateTimestampToGqlTemplateTimestamp(deleted);
    },
  },
  TemplateTimestamp: {
    template: (parent, _args, ctx) => ctx.dataloaders.templates.load(parent.templateId),

    timestamp: (parent, _args, ctx) => ctx.dataloaders.timestamps.load(parent.timestampId),
  },
};

export async function getTemplateTimestampsByTemplateId(
  ctx: GqlContext,
  templateId: string,
): Promise<GqlTemplateTimestamp[]> {
  const rows = await ctx.deps.db.query.templateTimestamps.findMany({
    where: eq(templateTimestamps.templateId, templateId),
  });
  return rows.map(mapDbTemplateTimestampToGqlTemplateTimestamp);
}
