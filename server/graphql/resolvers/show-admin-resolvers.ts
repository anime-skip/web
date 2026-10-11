import type { GqlResolvers } from "server/graphql/resolver-types.gen";

const SHOW_ADMINS_UNSUPPORTED = "Show admins are no longer supported";

/**
 * Show admins are no longer supported. The schema is kept (as deprecated) so existing clients don't
 * break: list fields resolve to empty arrays, and fields that must return a `ShowAdmin` throw.
 */
export const showAdminResolvers: GqlResolvers = {
  Query: {
    findShowAdmin: () => {
      throw Error(SHOW_ADMINS_UNSUPPORTED);
    },
    findShowAdminsByShowId: () => [],
    findShowAdminsByUserId: () => [],
  },
  Mutation: {
    createShowAdmin: () => {
      throw Error(SHOW_ADMINS_UNSUPPORTED);
    },
    deleteShowAdmin: () => {
      throw Error(SHOW_ADMINS_UNSUPPORTED);
    },
  },
  Account: {
    adminOfShows: () => [],
  },
  User: {
    adminOfShows: () => [],
  },
  Show: {
    admins: () => [],
  },
};
