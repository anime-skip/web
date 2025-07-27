import { useMutation } from "@tanstack/vue-query";
import { queryGraphql } from "app/utils/graphql-utils";
import { executeRecaptcha, RecaptchaAction } from "app/utils/recaptcha-utils";
import { LoginDataFragment, type LoginData } from "./useGqlLoginQuery";

export default function () {
  return useMutation({
    mutationFn: async (
      input: Omit<GqlMutationCreateAccountArgs, "recaptchaResponse">,
    ) => {
      const recaptchaResponse =
        import.meta.env.APP_RECAPTCHA_RESPONSE ??
        (await executeRecaptcha(RecaptchaAction.SignUp));
      const data = await queryGraphql<{
        createAccount: LoginData;
      }>(OPERATION_NAME, QUERY, {
        ...input,
        recaptchaResponse,
      });
      return data.createAccount;
    },
  });
}

const OPERATION_NAME = "CreateAccount";

const QUERY = `
  mutation ${OPERATION_NAME}($email: String!, $passwordHash: String!, $recaptchaResponse: String!, $username: String!) {
    createAccount(
      email: $email
      passwordHash: $passwordHash
      recaptchaResponse: $recaptchaResponse
      username: $username
    ) {
    ...LoginDataFragment
    }
  }

${LoginDataFragment}
`;
