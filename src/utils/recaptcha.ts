const RECAPTCHA_SITE_KEY = '6LdCabkZAAAAANjX98ln54xCQ5OVnuinrPeLF8Np';

export const RECAPTCHA_SCRIPT = {
  src: `https://www.google.com/recaptcha/api.js?render=${RECAPTCHA_SITE_KEY}`,
};

declare const grecaptcha: {
  ready(cb: () => void);
  execute(siteKey: string, options: { action: string }): Promise<string>;
};

/**
 * Execute and return the recaptcha response token as a string. This response should be passed to
 * the `createAccount.recaptchaResponse` mutation variable, or other similar variables used to
 * verify the authenticity of a user with the API.
 *
 * You must have loaded the the `RECAPTCHA_SCRIPT` inside a page entrypoint via:
 *
 * ```
 * useHead({
 *   script: [RECAPTCHA_SCRIPT],
 * });
 * ```
 */
export async function executeRecaptcha(action: string): Promise<string> {
  return new Promise((res, rej) => {
    grecaptcha.ready(function () {
      grecaptcha.execute(RECAPTCHA_SITE_KEY, { action }).then(res).catch(rej);
    });
  });
}
