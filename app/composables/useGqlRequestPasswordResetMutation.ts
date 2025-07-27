import { useMutation } from "@tanstack/vue-query";
import { queryGraphql } from "app/utils/graphql-utils";
import { executeRecaptcha, RecaptchaAction } from "app/utils/recaptcha-utils";

export default function () {
  return useMutation({
    mutationFn: async (
      input: Omit<GqlMutationRequestPasswordResetArgs, "recaptchaResponse">,
    ) => {
      const recaptchaResponse =
        import.meta.env.APP_RECAPTCHA_RESPONSE ??
        (await executeRecaptcha(RecaptchaAction.RequestPasswordReset));
      await queryGraphql<{
        requestPasswordReset: unknown;
      }>(OPERATION_NAME, QUERY, {
        ...input,
        recaptchaResponse,
      });
    },
  });
}

export const OPERATION_NAME = "RequestPasswordReset";

export const QUERY = `
  mutation ${OPERATION_NAME}($email: String!, $recaptchaResponse: String!) {
    requestPasswordReset(email: $email, recaptchaResponse: $recaptchaResponse)
  }
`;
