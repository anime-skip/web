import type { GqlResolvers } from "server/graphql/resolver-types.gen";
import { accountResolvers } from "server/graphql/resolvers/account-resolvers";
import { apiClientResolvers } from "server/graphql/resolvers/api-client-resolvers";
import { countResolvers } from "server/graphql/resolvers/count-resolvers";
import { episodeResolvers } from "server/graphql/resolvers/episode-resolvers";
import { episodeUrlResolvers } from "server/graphql/resolvers/episode-url-resolvers";
import { externalLinkResolvers } from "server/graphql/resolvers/external-link-resolvers";
import { preferencesResolvers } from "server/graphql/resolvers/preferences-resolvers";
import { showResolvers } from "server/graphql/resolvers/show-resolvers";
import { showAdminResolvers } from "server/graphql/resolvers/show-admin-resolvers";
import { templateResolvers } from "server/graphql/resolvers/template-resolvers";
import { templateTimestampResolvers } from "server/graphql/resolvers/template-timestamp-resolvers";
import { thirdPartyTimestampResolvers } from "server/graphql/resolvers/third-party-timestamp-resolvers";
import { timestampResolvers } from "server/graphql/resolvers/timestamp-resolvers";
import { timestampTypeResolvers } from "server/graphql/resolvers/timestamp-type-resolvers";
import { userResolvers } from "server/graphql/resolvers/user-resolvers";
import { userReportResolvers } from "server/graphql/resolvers/user-report-resolvers";
import { mergeAll } from "shared/utils";

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
