import { optionalString } from "shared/env-utils";

export const env = {
  /**
   * Set to bypass recaptcha, should match a string in `server/env.ts`'s
   * `RECAPTCHA_RESPONSE_ALLOWLIST`.
   */
  APP_RECAPTCHA_RESPONSE: optionalString("APP_RECAPTCHA_RESPONSE"),
};
