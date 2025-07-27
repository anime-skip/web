import { useMutation } from "@tanstack/vue-query";
import { queryGraphql } from "app/utils/graphql-utils";

const OPERATION_NAME = "ChangePassword";

const QUERY = `
  mutation ${OPERATION_NAME}(
    $newPassword: String!,
    $confirmNewPassword: String!,
    $oldPassword: String!,
  ) {
    changePassword(
      newPassword: $newPassword,
      confirmNewPassword: $confirmNewPassword,
      oldPassword: $oldPassword,
    ) {
      account { id }
    }
  }
`;

export default function (options: { onSuccess: () => void }) {
  return useMutation({
    mutationFn: async (input: GqlMutationChangePasswordArgs) => {
      await queryGraphql(OPERATION_NAME, QUERY, input);
    },
    onSuccess: options.onSuccess,
  });
}
