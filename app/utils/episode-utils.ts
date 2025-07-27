export function getSeasonAndNumberText({
  absoluteNumber,
  number,
  season,
}: Pick<GqlEpisode, "number" | "season" | "absoluteNumber"> = {}): string {
  if (absoluteNumber != null && number != null && season != null) {
    return `Season ${season}, Episode ${number} (#${absoluteNumber})`;
  }
  if (absoluteNumber != null && season != null) {
    return `Season ${season} (#${absoluteNumber})`;
  }
  if (number != null && season != null) {
    return `Season ${season}, Episode ${number}`;
  }
  if (season != null) {
    return `Season ${season}`;
  }
  if (number != null) {
    return `Episode ${number}`;
  }
  if (absoluteNumber != null) {
    return `Episode #${absoluteNumber}`;
  }
  return "";
}
