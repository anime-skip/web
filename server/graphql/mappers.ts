import type { DbUser } from "server/db/schema.ts";

export function mapDbUserToGqlUser(user: DbUser): GqlUser {
  return {
    id: user.id,
    createdAt: user.createdAt,
    profileUrl: user.profileUrl,
    adminOfShows: [],
    username: user.username,
    deletedAt: user.deletedAt,
  };
}
