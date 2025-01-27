import type { GqlResolvers } from "server/graphql/resolver-types.gen.ts";
import { todo } from "shared/utils.ts";
import { eq } from "drizzle-orm";
import type { GqlContext } from "server/graphql/context.ts";
import { templateTimestamps } from "server/db/schema.ts";
import { mapDbTemplateTimestampToGqlTemplateTimestamp } from "server/graphql/mappers.ts";

export const templateTimestampResolvers: GqlResolvers = {
  Mutation: {
    addTimestampToTemplate: (_parent, _args, _ctx) => todo(),

    removeTimestampFromTemplate: (_parent, _args, _ctx) => todo(),
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
