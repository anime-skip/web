import { createLogger } from "@aklinker1/logger";
import { SHARED_CLIENT_ID } from "shared/constants";

import type { AnimeSkipDatabase } from "../services/db";
import { TIMESTAMP_TYPE_IDS } from "../utils/timestamp-validation";
import { apiClients, DbUserRole, preferences, timestampTypes, users } from "./schema";

const logger = createLogger("db-seed");

const ADMIN_USER_ID = "00000000-0000-0000-0000-000000000000";

const TIMESTAMP_TYPES: Array<{ id: string; name: string; description: string }> = [
  {
    id: TIMESTAMP_TYPE_IDS.CANON,
    name: "Canon",
    description: "New plot that has not been revealed",
  },
  {
    id: TIMESTAMP_TYPE_IDS.MUST_WATCH,
    name: "Must Watch",
    description:
      "A non-canon section of the episode that should not be skipped. (I.E. The Chika Dance https://youtu.be/6xKAsZZgskg)",
  },
  {
    id: TIMESTAMP_TYPE_IDS.BRANDING,
    name: "Branding",
    description: "The small animation letting you know who made the show",
  },
  {
    id: TIMESTAMP_TYPE_IDS.INTRO,
    name: "Intro",
    description: "The intro of each episode, generally around 1:30 long",
  },
  {
    id: TIMESTAMP_TYPE_IDS.MIXED_INTRO,
    name: "Mixed Intro",
    description:
      "The intro at the beginning of an episode that is overlaid with plot. Sometimes the last episode of a show does this",
  },
  {
    id: TIMESTAMP_TYPE_IDS.NEW_INTRO,
    name: "New Intro",
    description: "The first of an intro, sometimes it's nice to watch each of the intros",
  },
  {
    id: TIMESTAMP_TYPE_IDS.RECAP,
    name: "Recap",
    description: "A recap of the previous episode",
  },
  {
    id: TIMESTAMP_TYPE_IDS.FILLER,
    name: "Filler",
    description: "Content that has no bearing on the actual story",
  },
  {
    id: TIMESTAMP_TYPE_IDS.TRANSITION,
    name: "Transition",
    description: "The small animation show to transition into and out of commercials",
  },
  {
    id: TIMESTAMP_TYPE_IDS.CREDITS,
    name: "Credits",
    description: "The credits/outro at the end of each episode",
  },
  {
    id: TIMESTAMP_TYPE_IDS.MIXED_CREDITS,
    name: "Mixed Credits",
    description:
      "The credits/outro at the end of an episode that is overlaid with plot. Sometimes the last episode of a show does this",
  },
  {
    id: TIMESTAMP_TYPE_IDS.NEW_CREDITS,
    name: "New Credits",
    description: "The first of an outro, sometimes it's nice to watch each of the outros",
  },
  {
    id: TIMESTAMP_TYPE_IDS.PREVIEW,
    name: "Preview",
    description: "The preview for the next episode",
  },
  {
    id: TIMESTAMP_TYPE_IDS.TITLE_CARD,
    name: "Title Card",
    description:
      "A short section of the episode that just displays the name of the episode, where no plot development takes place",
  },
  {
    id: TIMESTAMP_TYPE_IDS.UNKNOWN,
    name: "Unknown",
    description:
      "A timestamp that was imported from a different system that didn't have enough information to decide what type it was. These are treated as unskippable",
  },
];

const API_CLIENTS: Array<{
  id: string;
  appName: string;
  description: string;
  rateLimitRpm?: number;
}> = [
  {
    id: SHARED_CLIENT_ID,
    appName: "Shared Production Client",
    description:
      "Client ID that anyone can use and is listed on the API docs. If you don't want to get client ID, you use this one",
    rateLimitRpm: 60,
  },
];

/**
 * Insert the rows the API depends on to function. Safe to run repeatedly, existing rows are never
 * modified.
 */
export async function seedDatabase(db: AnimeSkipDatabase): Promise<void> {
  logger.info("Seeding database");
  const now = new Date().toISOString();

  await db.transaction(async (tx) => {
    await tx
      .insert(users)
      .values({
        id: ADMIN_USER_ID,
        username: "the_admin",
        email: "admin@anime-skip.com",
        // Not a valid hash, so it's impossible to sign in as this user
        passwordHash: "password",
        profileUrl: "https://ca.slack-edge.com/T02F01E85-UD1534SV6-df241d756573-512",
        emailVerified: true,
        role: DbUserRole.User,
      })
      .onConflictDoNothing();

    await tx
      .insert(preferences)
      .values({ id: ADMIN_USER_ID, userId: ADMIN_USER_ID, updatedAt: now })
      .onConflictDoNothing();

    await tx
      .insert(timestampTypes)
      .values(
        TIMESTAMP_TYPES.map((type) => ({
          ...type,
          createdByUserId: ADMIN_USER_ID,
          updatedAt: now,
          updatedByUserId: ADMIN_USER_ID,
        })),
      )
      .onConflictDoNothing();

    await tx
      .insert(apiClients)
      .values(
        API_CLIENTS.map((client) => ({
          ...client,
          createdByUserId: ADMIN_USER_ID,
          updatedAt: now,
          updatedByUserId: ADMIN_USER_ID,
          userId: ADMIN_USER_ID,
        })),
      )
      .onConflictDoNothing();
  });

  logger.info("Seeding complete");
}
