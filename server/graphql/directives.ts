import type { GqlDirectiveResolvers } from "server/graphql/resolver-types.gen";
import { notImplemented } from "shared/utils";
import { auth } from "server/utils/auth";
import { getAccessToken } from "server/utils/http";
import { DbUserRole } from "server/db/schema";
import { mapDbUserRoleToGqlRole } from "server/graphql/mappers";
import type { GqlContext } from "server/graphql/context";

// Role hierarchy: DEV > ADMIN > REVIEWER > USER
// Higher roles can access resources requiring lower roles
const DEV_ROLES = [DbUserRole.Dev];
const ADMIN_ROLES = [DbUserRole.Dev, DbUserRole.Admin];
const REVIEWER_ROLES = [DbUserRole.Dev, DbUserRole.Admin, DbUserRole.Reviewer];
const USER_ROLES = [
  DbUserRole.Dev,
  DbUserRole.Admin,
  DbUserRole.Reviewer,
  DbUserRole.User,
];

function getRolesAllowedForRequiredRole(requiredRole: string): DbUserRole[] {
  switch (requiredRole) {
    case "DEV":
      return DEV_ROLES;
    case "ADMIN":
      return ADMIN_ROLES;
    case "REVIEWER":
      return REVIEWER_ROLES;
    case "USER":
      return USER_ROLES;
    default:
      throw Error(`Unknown role: ${requiredRole}`);
  }
}

/**
 * Authenticate the user from the request token and set ctx.authUserId.
 * Throws "Unauthorized" if no token is present or token is invalid.
 */
async function authenticate(ctx: GqlContext): Promise<void> {
  const token = getAccessToken(ctx.request);
  if (token == null) throw Error("Unauthorized");

  const { userId } = await auth.validateToken("access", token);
  ctx.authUserId = userId;
}

export const directiveResolvers: GqlDirectiveResolvers = {
  authenticated: async (next, _parent, _directiveArgs, ctx, _info) => {
    await authenticate(ctx);
    return await next();
  },
  optionalAuthenticated: async (next, _parent, _directiveArgs, ctx, _info) => {
    const token = getAccessToken(ctx.request);
    if (token != null) {
      const { userId } = await auth.validateToken("access", token);
      ctx.authUserId = userId;
    }
    return await next();
  },
  hasRole: async (next, _parent, directiveArgs, ctx, _info) => {
    await authenticate(ctx);

    const user = await ctx.dataloaders.dbUsers.load(ctx.authUserId!);
    if (user == null) throw Error("Unauthorized - user not found");

    ctx.authRole = user.role;

    const allowedRoles = getRolesAllowedForRequiredRole(directiveArgs.role);
    if (!allowedRoles.includes(user.role)) {
      const requiredRoleStr = directiveArgs.role;
      const userRoleStr = mapDbUserRoleToGqlRole(user.role);
      throw Error(
        `Forbidden - you don't have the required role to perform this action (required: ${requiredRoleStr}, has: ${userRoleStr})`,
      );
    }

    return await next();
  },
  isShowAdmin: (_next, _parent, _directiveArgs, _ctx, _info) => {
    notImplemented("isShowAdmin directive");
  },
};
