import type { GqlResolvers } from "server/graphql/resolver-types.gen.ts";
import {
  mapDbPreferencesToGqlPreferences,
  mapGqlColorThemeToDbColorTheme,
} from "server/graphql/mappers.ts";
import { eq } from "drizzle-orm";
import { type DbPreferencesInsert, preferences } from "server/db/schema.ts";
import { prepareGqlInputForDb } from "server/utils/db.ts";

export const preferencesResolvers: GqlResolvers = {
  Mutation: {
    savePreferences: async (_parent, args, ctx) => {
      const userId = ctx.authUserId!;
      const now = new Date();
      const updates: Partial<DbPreferencesInsert> = {
        updatedAt: now.toISOString(),
        ...prepareGqlInputForDb(args.preferences),
        colorTheme: args.preferences.colorTheme == null
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
