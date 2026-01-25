import { templateTimestamps, type DbTemplateTimestamp } from "server/db/schema";
import type { AnimeSkipDatabase } from "./db";
import { and, eq, or } from "drizzle-orm";

export interface TemplateTimestampService {
  deleteMany(
    tx: AnimeSkipDatabase,
    keys: Array<{ templateId: string; timestampId: string }>,
  ): Promise<DbTemplateTimestamp[]>;
}

export function createTemplateTimestampService({
  db: _,
}: {
  db: AnimeSkipDatabase;
}): TemplateTimestampService {
  const deleteMany: TemplateTimestampService["deleteMany"] = async (
    tx,
    keys,
  ) => {
    if (keys.length === 0) {
      return [];
    }

    const conditions = keys.map((key) =>
      and(
        eq(templateTimestamps.templateId, key.templateId),
        eq(templateTimestamps.timestampId, key.timestampId),
      ),
    );

    const deleted = await tx
      .delete(templateTimestamps)
      .where(or(...conditions))
      .returning();
    return deleted;
  };

  return {
    deleteMany,
  };
}
