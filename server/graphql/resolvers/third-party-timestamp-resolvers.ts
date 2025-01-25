import type { GqlResolvers } from "server/graphql/resolver-types.gen.ts";
import { todo } from "shared/utils.ts";

export const thirdPartyTimestampResolvers: GqlResolvers = {
  ThirdPartyTimestamp: {
    type: (_parent, _args, _ctx) => todo(),
  },
};
