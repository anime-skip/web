import type { GqlResolvers } from "server/graphql/resolver-types.gen.ts";
import { todo } from "shared/utils.ts";

export const templateTimestampResolvers: GqlResolvers = {
  Mutation: {
    addTimestampToTemplate: (_parent, _args, _ctx) => todo(),
    removeTimestampFromTemplate: (_parent, _args, _ctx) => todo(),
  },
  TemplateTimestamp: {
    template: (_parent, _args, _ctx) => todo(),
    timestamp: (_parent, _args, _ctx) => todo(),
  },
};
