import type { GqlDirectiveResolvers } from "server/graphql/resolver-types.gen.ts";
import { todo } from "shared/utils.ts";
import { auth } from "server/utils/auth.ts";
import { getAccessToken } from "server/utils/http.ts";

export const directiveResolvers: GqlDirectiveResolvers = {
  authenticated: async (next, _parent, _directiveArgs, ctx, _info) => {
    const token = getAccessToken(ctx.request);
    if (token == null) {
      throw Error("Unauthorized");
    }

    const { userId } = await auth.validateToken("access", token);
    ctx.authUserId = userId;
    return await next();
  },
  optionalAuthenticated: (_next, _parent, _directiveArgs, _ctx, _info) => {
    todo("optionalAuthenticated directive");
  },
  hasRole: (_next, _parent, _directiveArgs, _ctx, _info) => {
    todo("hasRole directive");
  },
  isShowAdmin: (_next, _parent, _directiveArgs, _ctx, _info) => {
    todo("isShowAdmin directive");
  },
};
