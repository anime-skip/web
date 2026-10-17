import { useMutation, useQueryClient } from "@tanstack/vue-query";
import { queryGraphql } from "app/utils/graphql-utils";
import { VueQueryKey } from "app/utils/vue-query-keys";

import type { Account } from "./useGqlAccountQuery";

const OPERATION_NAME = "VerifyEmailAddress";

const QUERY = `
  mutation ${OPERATION_NAME}($validationToken: String!) {
    verifyEmailAddress(validationToken: $validationToken) {
      id
      emailVerified
    }
  }
`;

export default function () {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (input: GqlMutationVerifyEmailAddressArgs) => {
      const data = await queryGraphql<{
        verifyEmailAddress: Pick<Account, "id" | "emailVerified">;
      }>(OPERATION_NAME, QUERY, input);
      return data.verifyEmailAddress;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: [VueQueryKey.account] }),
  });
}
