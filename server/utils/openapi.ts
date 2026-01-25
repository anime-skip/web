import { OpenApiSecurityScheme } from "server/enums";

/**
 * @example
 * app.get(
 *   "/example",
 *   {
 *     security: [OpenApiSecurity.XClientId],
 *   },
 *   () => {
 *     // ...
 *   }
 * )
 */
export const OpenApiSecurity = {
  XClientId: { [OpenApiSecurityScheme.XClientId]: [] },
};
