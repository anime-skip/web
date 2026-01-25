export const ANILIST_HOSTNAME = "anilist.co";

export const ALLOWED_EXTERNAL_LINK_HOSTNAMES = [ANILIST_HOSTNAME];

/**
 * Extract the service ID from an external link URL based on the hostname.
 * @param url The external link URL
 * @returns The service-specific ID, or null if not found or unsupported service
 */
export function extractServiceId(url: string): string | null {
  const parsed = new URL(url);
  const hostname = parsed.hostname;

  switch (hostname) {
    case ANILIST_HOSTNAME: {
      // Extract anime ID from Anilist URLs like /anime/12345 or /anime/12345/some-slug
      const match = parsed.pathname.match(/^\/anime\/([0-9]+)\/?.*?$/);
      if (match?.[1]) return match[1];

      return null;
    }
    default:
      return null;
  }
}
