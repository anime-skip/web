const SECRET = Deno.env.get("AS_RECAPTCHA_SECRET");
if (!SECRET) {
  throw Error("AS_RECAPTCH_SECRET environment variable is missing");
}

const ALLOWLIST_STR = Deno.env.get("AS_RECAPTCHA_RESPONSE_ALLOWLIST");
const ALLOWLIST = new Set(ALLOWLIST_STR ? ALLOWLIST_STR.split(",") : []);

export async function verifyRecaptcha(
  response: string,
  ipAddress: string,
): Promise<void> {
  if (ALLOWLIST.has(response)) return;

  const url = new URL("https://www.google.com/recaptcha/api/siteverify");
  url.searchParams.set("response", response);
  url.searchParams.set("secret", SECRET!);
  url.searchParams.set("remoteip", ipAddress);
  const res = await fetch(url.href, {
    method: "POST",
    // TODO: Do I need to pass this header?
    headers: {
      "Content-Type": "application/json",
    },
  });
  const json = await res.json();

  if (!json.success) {
    throw Error("Recaptcha validation failed", { cause: json });
  }
}
