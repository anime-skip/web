import { isNull } from "drizzle-orm";
import {
  episodes,
  episodeUrls,
  shows,
  templates,
  timestamps,
  timestampTypes,
  users,
} from "server/db/schema";
import type { GqlResolvers } from "server/graphql/resolver-types.gen";

export const countResolvers: GqlResolvers = {
  Query: {
    counts: () => ({
      episodeUrls: 0,
      episodes: 0,
      shows: 0,
      templates: 0,
      timestampTypes: 0,
      timestamps: 0,
      users: 0,
    }),
  },
  TotalCounts: {
    episodeUrls: (_parent, _args, { deps }) => deps.db.$count(episodeUrls),

    episodes: (_parent, _args, { deps }) => deps.db.$count(episodes, isNull(episodes.deletedAt)),

    shows: (_parent, _args, { deps }) => deps.db.$count(shows, isNull(shows.deletedAt)),

    templates: (_parent, _args, { deps }) => deps.db.$count(templates, isNull(templates.deletedAt)),

    timestampTypes: (_parent, _args, { deps }) =>
      deps.db.$count(timestampTypes, isNull(timestampTypes.deletedAt)),

    timestamps: (_parent, _args, { deps }) =>
      deps.db.$count(timestamps, isNull(timestamps.deletedAt)),

    users: (_parent, _args, { deps }) => deps.db.$count(users, isNull(users.deletedAt)),
  },
};
