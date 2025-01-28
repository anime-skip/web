import type { GqlResolvers } from "server/graphql/resolver-types.gen";
import {
  mapDbPreferencesToGqlPreferences,
  mapGqlColorThemeToDbColorTheme,
} from "server/graphql/mappers";
import { eq } from "drizzle-orm";
import { type DbPreferencesInsert, preferences } from "server/db/schema";
import { prepareGqlInputForDb } from "server/utils/db";

export const preferencesResolvers: GqlResolvers = {
  Mutation: {
    savePreferences: async (_parent, args, ctx) => {
      const userId = ctx.authUserId!;
      const now = new Date();
      const updates: Partial<DbPreferencesInsert> = {
        updatedAt: now.toISOString(),
        ...prepareGqlInputForDb(args.preferences),
        colorTheme:
          args.preferences.colorTheme == null
            ? undefined
            : mapGqlColorThemeToDbColorTheme(args.preferences.colorTheme),
      };
      const [row] = await ctx.db
        .update(preferences)
        .set(updates)
        .where(eq(preferences.userId, userId))
        .returning();
      return mapDbPreferencesToGqlPreferences(row);
    },
  },
  Preferences: {
    user: (parent, _args, ctx) => ctx.dataloaders.users.load(parent.userId),
  },
};
