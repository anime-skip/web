export function requireString(envName: string): string {
  const value = import.meta.env[envName];
  if (!value)
    throw new Error(`Missing required environment variable: ${envName}`);

  return value;
}

export function string(envName: string, defaultValue: string): string {
  return import.meta.env[envName] ?? defaultValue;
}

export function optionalString(envName: string): string | undefined {
  return import.meta.env[envName];
}

export function requireInt(envName: string): number {
  const value = import.meta.env[envName];
  if (!value)
    throw new Error(`Missing required environment variable: ${envName}`);

  const parsed = parseInt(value);
  if (isNaN(parsed))
    throw new Error(
      `Invalid integer value for environment variable: ${envName}`,
    );

  return parsed;
}

export function int(envName: string, defaultValue: number): number {
  if (import.meta.env[envName] == null) return defaultValue;

  const value = parseInt(import.meta.env[envName]);
  if (isNaN(value))
    throw Error(`Invalid integer value for environment variable: ${envName}`);

  return value;
}

export function boolean(
  envName: string,
  defaultValue: boolean = false,
): boolean {
  if (import.meta.env[envName] == null) return defaultValue;
  return ["true", "yes", "t", "y", ""].includes(
    import.meta.env[envName].toLowerCase(),
  );
}

export function enumValue<T>(
  envName: string,
  valueMap: Record<string, T>,
  defaultValue: T,
): T {
  const value = import.meta.env[envName];
  if (value == null) return defaultValue;

  return valueMap[value] ?? defaultValue;
}

export function stringArray(
  envName: string,
  defaultValue: string[] = [],
): string[] {
  const value = import.meta.env[envName];
  if (!value) return defaultValue;

  return value.split(",").map((item) => item.trim());
}
