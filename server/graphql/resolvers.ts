import type { GqlResolvers } from "server/graphql/resolver-types.gen.ts";
import { accountResolvers } from "server/graphql/resolvers/account-resolvers.ts";
import { apiClientResolvers } from "server/graphql/resolvers/api-client-resolvers.ts";
import { countResolvers } from "server/graphql/resolvers/count-resolvers.ts";
import { episodeResolvers } from "server/graphql/resolvers/episode-resolvers.ts";
import { episodeUrlResolvers } from "server/graphql/resolvers/episode-url-resolvers.ts";
import { externalLinkResolvers } from "server/graphql/resolvers/external-link-resolvers.ts";
import { preferencesResolvers } from "server/graphql/resolvers/preferences-resolvers.ts";
import { showResolvers } from "server/graphql/resolvers/show-resolvers.ts";
import { showAdminResolvers } from "server/graphql/resolvers/show-admin-resolvers.ts";
import { templateResolvers } from "server/graphql/resolvers/template-resolvers.ts";
import { templateTimestampResolvers } from "server/graphql/resolvers/template-timestamp-resolvers.ts";
import { thirdPartyTimestampResolvers } from "server/graphql/resolvers/third-party-timestamp-resolvers.ts";
import { timestampResolvers } from "server/graphql/resolvers/timestamp-resolvers.ts";
import { timestampTypeResolvers } from "server/graphql/resolvers/timestamp-type-resolvers.ts";
import { userResolvers } from "server/graphql/resolvers/user-resolvers.ts";
import { userReportResolvers } from "server/graphql/resolvers/user-report-resolvers.ts";
import { mergeAll } from "shared/utils.ts";

export const rootResolver: GqlResolvers = mergeAll(
  accountResolvers,
  apiClientResolvers,
  countResolvers,
  episodeResolvers,
  episodeUrlResolvers,
  externalLinkResolvers,
  preferencesResolvers,
  showResolvers,
  showAdminResolvers,
  templateResolvers,
  templateTimestampResolvers,
  thirdPartyTimestampResolvers,
  timestampResolvers,
  timestampTypeResolvers,
  userResolvers,
  userReportResolvers,
);
