import bcrypt from "bcryptjs";
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
function secret(): Uint8Array<ArrayBufferLike> {
  const { JWT_SECRET } = env;
  if (!JWT_SECRET) throw Error("env.JWT_SECRET is required to work with JWTs");

  SECRET ??= new TextEncoder().encode(JWT_SECRET);
  return SECRET;
}

export type TokenInfo = {
  userId: string;
};

export const auth = {
  createToken: async (kind: TokenKind, info: TokenInfo) => {
    try {
      const now = Date.now();
      return await new SignJWT(info)
        .setProtectedHeader({ alg: "HS256" })
        .setIssuedAt(toSeconds(now))
        .setIssuer(ISSUER)
        .setAudience(AUDIENCES[kind])
        .setExpirationTime(toSeconds(now + TIMEOUTS[kind]))
        .sign(secret());
    } catch (cause) {
      throw new TokenError("create", kind, { cause });
    }
  },

  validateToken: async (kind: TokenKind, token: string): Promise<TokenInfo> => {
    try {
      const res = await jwtVerify<TokenInfo>(token, secret(), {
        issuer: ISSUER,
        audience: AUDIENCES[kind],
        algorithms: ["HS256"],
      });
      return res.payload;
    } catch (cause) {
      throw new TokenError("validate", kind, { cause });
    }
  },

  /** Check a password against an existing hash. */
  comparePasswords: async (checkPassword: string, againstHash: string): Promise<boolean> => {
    return await withSpan("bcrypt.compare", {}, () => bcrypt.compare(checkPassword, againstHash));
  },

  /** Hash and encrypt a password. */
  encryptPassword: async (password: string) => {
    try {
      return await withSpan("bcrypt.hash", { attributes: { "bcrypt.cost": 14 } }, () =>
        bcrypt.hash(password, 14),
      );
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
