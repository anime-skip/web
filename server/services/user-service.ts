import { users, type DbUser } from "server/db/schema";
import type { AnimeSkipDatabase } from "./db";
import type { PreferencesService } from "./preferences-service";
import { eq } from "drizzle-orm";

export interface UserService {
  anonymize(
    tx: AnimeSkipDatabase,
    userId: string,
    deletedAt: Date,
  ): Promise<DbUser>;
}

export function createUserService({
  db: _,
  preferencesService,
}: {
  db: AnimeSkipDatabase;
  preferencesService: PreferencesService;
}): UserService {
  const anonymize: UserService["anonymize"] = async (tx, userId, deletedAt) => {
    const [anonymized] = await tx
      .update(users)
      .set({
        deletedAt: deletedAt.toISOString(),
        username: `deleted_${userId}`,
        email: `deleted.${userId}@anime-skip.com`,
        passwordHash: "",
        profileUrl: "",
        emailVerified: false,
      })
      .where(eq(users.id, userId))
      .returning();

    await preferencesService.softDeleteByUserId(tx, userId, deletedAt);

    return anonymized;
  };

  return {
    anonymize,
  };
}
