import { jwtVerify, SignJWT } from "jose";
import { env } from "server/env";
import { withSpan } from "server/utils/telemetry";
import { DAY, MINUTE, toSeconds } from "shared/time";

type TokenKind = "access" | "refresh" | "verify-email" | "reset-password" | "delete-account";

const TIMEOUTS: Record<TokenKind, number> = {
  access: 7 * DAY,
  refresh: 30 * DAY,
  "verify-email": 2 * DAY,
  "reset-password": 10 * MINUTE,
  "delete-account": 10 * MINUTE,
};

const AUDIENCES: Record<TokenKind, string> = {
  access: "anime-skip.com",
  refresh: "anime-skip.com/graphql?loginRefresh",
  "verify-email": "anime-skip.com/verify-email-address", // TODO: Switch to /graphql?op
  "reset-password": "anime-skip.com/forgot-password", // TODO: Switch to /graphql?op
  "delete-account": "anime-skip.com/graphql?deleteAccount",
};

const ISSUER = "anime-skip.com";

let SECRET: Uint8Array<ArrayBufferLike> | undefined;
function getSecret(): Uint8Array<ArrayBufferLike> {
  const { JWT_SECRET } = env;
  if (!JWT_SECRET) throw Error("env.JWT_SECRET is required to work with JWTs");

  SECRET ??= new TextEncoder().encode(JWT_SECRET);
  return SECRET;
}

export type TokenInfo = {
  userId: string;
};

/** Prefixes of legacy hashes that get re-hashed with the default algorithm on login. */
const OLD_HASH_PREFIXES = ["$b2"];

export const auth = {
  createToken: async (kind: TokenKind, info: TokenInfo) => {
    try {
      const now = Date.now();
      const jwt = new SignJWT(info)
        .setProtectedHeader({ alg: "HS256" })
        .setIssuedAt(toSeconds(now))
        .setIssuer(ISSUER)
        .setAudience(AUDIENCES[kind])
        .setExpirationTime(toSeconds(now + TIMEOUTS[kind]));
      const secret = getSecret();
      return await withSpan("SignJWT.sign", {}, () => jwt.sign(secret));
    } catch (cause) {
      throw new TokenError("create", kind, { cause });
    }
  },

  validateToken: async (kind: TokenKind, token: string): Promise<TokenInfo> => {
    try {
      const secret = getSecret();
      const res = await withSpan("jwtVerify", {}, () =>
        jwtVerify<TokenInfo>(token, secret, {
          issuer: ISSUER,
          audience: AUDIENCES[kind],
          algorithms: ["HS256"],
        }),
      );
      return res.payload;
    } catch (cause) {
      throw new TokenError("validate", kind, { cause });
    }
  },

  verifyPassword: async (passwordMd5: string, hash: string): Promise<boolean> => {
    return await withSpan("Bun.password.verify", {}, () => Bun.password.verify(passwordMd5, hash));
  },

  isLegacyPasswordHash: (hash: string): boolean =>
    OLD_HASH_PREFIXES.some((p) => hash.startsWith(p)),

  hashPassword: async (passwordMd5: string) => {
    try {
      return await withSpan("Bun.password.hash", {}, () => Bun.password.hash(passwordMd5));
    } catch (err) {
      throw Error("Failed to encrypt password", { cause: err });
    }
  },
};

class TokenError extends Error {
  constructor(
    readonly method: "create" | "validate",
    readonly kind: TokenKind,
    options?: ErrorOptions,
  ) {
    super(`Failed to ${method} ${kind} token`, options);
  }
}
