const AUTH_HEADER_REGEX = /Bearer (.*?\..*?\..*)/;

export function getAccessToken(req: Request): string | undefined {
  const header = req.headers.get("authorization");
  if (!header) return;

  const match = header.match(AUTH_HEADER_REGEX);
  if (!match) return;

  return match[1];
}
