import type z from "zod";

/**
 * Iterate through all the keys in the provided schema and load it's value from `process.env` or a
 * file referenced by `key + "_FILE"`.
 *
 * @param key
 */
export async function loadEnvVars(
  schema: z.ZodObject,
): Promise<Record<string, string | undefined>> {
  const keys = Object.keys(schema.def.shape);

  const res: Record<string, string | undefined> = Object.create(null);
  await Promise.all(
    keys.map(async (key) => {
      res[key] = await loadEnvVar(key);
    }),
  );
  return res;
}

async function loadEnvVar(key: string): Promise<string | undefined> {
  if (process.env[key]) return process.env[key];

  const fileKey = `${key}_FILE`;
  if (process.env[fileKey]) {
    const file = Bun.file(process.env[fileKey]);
    if (!(await file.exists())) throw Error(`File referenced by env.${fileKey} does not exist`);

    const text = await file.text();
    return text.trim();
  }
}
