export const DEFAULT_PROFILE_URL = "https://avatars3.githubusercontent.com/u/1400247?s=460&v=4";

/** Accounts without a profile picture have an empty `profileUrl`. Fallback to a default image. */
export function getProfileUrl(profileUrl: string | null | undefined): string {
  return profileUrl || DEFAULT_PROFILE_URL;
}
