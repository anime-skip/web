import type { GqlResolvers } from "server/graphql/resolver-types.gen.ts";
import { todo } from "shared/utils.ts";

export const accountResolvers: GqlResolvers = {
  Mutation: {
    createAccount: (_parent, _args, _ctx) => todo(),
    changePassword: (_parent, _args, _ctx) => todo(),
    resendVerificationEmail: (_parent, _args, _ctx) => todo(),
    verifyEmailAddress: (_parent, _args, _ctx) => todo(),
    requestPasswordReset: (_parent, _args, _ctx) => todo(),
    resetPassword: (_parent, _args, _ctx) => todo(),
    deleteAccountRequest: (_parent, _args, _ctx) => todo(),
    deleteAccount: (_parent, _args, _ctx) => todo(),
  },
  Query: {
    login: (_parent, _args, _ctx) => todo(),
    loginRefresh: (_parent, _args, _ctx) => todo(),
    account: (_parent, _args, _ctx) => todo(),
  },
  Account: {
    preferences: (_parent, _args, _ctx) => todo(),
    adminOfShows: (_parent, _args, _ctx) => todo(),
  },
};
