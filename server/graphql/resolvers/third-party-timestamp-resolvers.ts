import type { GqlResolvers } from "server/graphql/resolver-types.gen";
import { todo } from "shared/utils";

export const thirdPartyTimestampResolvers: GqlResolvers = {
  ThirdPartyTimestamp: {
    type: (_parent, _args, _ctx) => todo(),
  },
};
