import { ClientError } from 'graphql-request';

export function getErrorMessage(err: unknown): string | undefined {
  if (err == null) return undefined;
  if (typeof err === 'string') return err;
  if (err instanceof ClientError)
    return err.response?.errors?.[0]?.message ?? 'Unknown error (391)';
  if (err instanceof Error) return err.message;
  return JSON.stringify(err, null, 2);
}
