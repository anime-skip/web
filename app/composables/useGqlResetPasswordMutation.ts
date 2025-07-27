import { useMutation } from "@tanstack/vue-query";
import { queryGraphql } from "app/utils/graphql-utils";
import { LoginDataFragment, type LoginData } from "./useGqlLoginQuery";

const OPERATION_NAME = "ResetPassword";

const QUERY = `
  mutation ${OPERATION_NAME}(
    $confirmNewPassword: String!,
    $newPassword: String!,
    $passwordResetToken: String!,
  ) {
    resetPassword(
      confirmNewPassword: $confirmNewPassword,
      newPassword: $newPassword,
      passwordResetToken: $passwordResetToken,
    ) {
      ...LoginDataFragment
    }
  }

${LoginDataFragment}
`;

export default function () {
  return useMutation({
    mutationFn: async (input: GqlMutationResetPasswordArgs) => {
      const data = await queryGraphql<{ resetPassword: LoginData }>(
        OPERATION_NAME,
        QUERY,
        input,
      );
      return data.resetPassword;
    },
  });
}
