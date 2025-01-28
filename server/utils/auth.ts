import { DAY, MINUTE, toSeconds } from "shared/time";
import { jwtVerify, SignJWT } from "jose";
import bcrypt from "bcryptjs";
import { logger } from "server/utils/logger";

type TokenKind =
  | "access"
  | "refresh"
  | "verify-email"
  | "reset-password"
  | "delete-account";

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

const SECRET_STR = import.meta.env.AS_JWT_SECRET;
if (!SECRET_STR) throw Error("AS_JWT_SECRET environment variable not provided");

const SECRET = new TextEncoder().encode(SECRET_STR);

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
        .sign(SECRET);
    } catch (err) {
      throw Error(`Failed to create ${kind} token`, { cause: err });
    }
  },

  validateToken: async (kind: TokenKind, token: string): Promise<TokenInfo> => {
    try {
      const res = await jwtVerify<TokenInfo>(token, SECRET, {
        issuer: ISSUER,
        audience: AUDIENCES[kind],
        algorithms: ["HS256"],
      });
      return res.payload;
    } catch (err) {
      logger.error(err);
      throw Error(`Failed to validate ${kind} token`, { cause: err });
    }
  },

  /** Check a password against an existing hash. */
  comparePasswords: async (
    checkPassword: string,
    againstHash: string,
  ): Promise<boolean> => {
    return await bcrypt.compare(checkPassword, againstHash).then(
      () => true,
      () => false,
    );
  },

  /** Hash and encrypt a password. */
  encryptPassword: async (password: string) => {
    try {
      return await bcrypt.hash(password, 14);
    } catch (err) {
      throw Error("Failed to encrypt password", { cause: err });
    }
  },
};
