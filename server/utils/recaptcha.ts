import { env } from "server/env";

export async function verifyRecaptcha(
  response: string,
  ipAddress: string,
): Promise<void> {
  if (env.RECAPTCHA_RESPONSE_ALLOWLIST.includes(response)) return;

  const url = new URL("https://www.google.com/recaptcha/api/siteverify");
  url.searchParams.set("response", response);
  url.searchParams.set("secret", env.RECAPTCHA_SECRET);
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
