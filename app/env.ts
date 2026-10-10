export const env = {
  /**
   * Set to bypass recaptcha, should match a string in `server/env.ts`'s
   * `RECAPTCHA_RESPONSE_ALLOWLIST`.
   */
  APP_RECAPTCHA_RESPONSE: import.meta.env.APP_RECAPTCHA_RESPONSE,
};
