/**
 * Service interface for looking up external links (e.g., Anilist, MAL) for shows by name.
 * Implementations can query remote APIs to find matching show URLs.
 */
export interface ExternalLinkLookupService {
  /**
   * Finds external link URLs for the given show name.
   * @param showName The name of the show to search for
   * @returns An array of external link URLs found, or an empty array if none found
   */
  findLinks(showName: string): Promise<string[]>;
}
