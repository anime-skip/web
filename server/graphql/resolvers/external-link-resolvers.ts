import type { GqlResolvers } from "server/graphql/resolver-types.gen.ts";
import { todo } from "shared/utils.ts";
import { and, eq, isNull } from "drizzle-orm";

export const externalLinkResolvers: GqlResolvers = {
  Mutation: {
    addExternalLink: (_parent, _args, _ctx) => todo(),

    removeExternalLink: (_parent, _args, _ctx) => todo(),
  },
  ExternalLink: {
    url: (_parent, _args, _ctx) => todo(),

    show: (_parent, _args, _ctx) => todo(),

    service: (_parent, _args, _ctx) => todo(),

    serviceId: (_parent, _args, _ctx) => todo(),
  },
};
