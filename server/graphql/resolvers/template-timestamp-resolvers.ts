import type { GqlResolvers } from "server/graphql/resolver-types.gen.ts";
import { todo } from "shared/utils.ts";

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
