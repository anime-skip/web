import type { GqlResolvers } from "server/graphql/resolver-types.gen";

export const thirdPartyTimestampResolvers: GqlResolvers = {
  ThirdPartyTimestamp: {
    type: (parent, _args, ctx) =>
      ctx.dataloaders.timestampTypes.load(parent.typeId),
  },
};
