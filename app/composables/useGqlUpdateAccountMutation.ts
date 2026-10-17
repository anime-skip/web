import { useMutation, useQueryClient } from "@tanstack/vue-query";
import { queryGraphql } from "app/utils/graphql-utils";
import { VueQueryKey } from "app/utils/vue-query-keys";

import type { Account } from "./useGqlAccountQuery";

const OPERATION_NAME = "UpdateAccount";

const QUERY = `
  mutation ${OPERATION_NAME}($username: String, $email: String) {
    updateAccount(username: $username, email: $email) {
      id
      username
      profileUrl
      email
      createdAt
      emailVerified
      role
    }
  }
`;

export default function () {
  const client = useQueryClient();

  return useMutation({
    mutationFn: async (input: GqlMutationUpdateAccountArgs) => {
      const data = await queryGraphql<{ updateAccount: Account }>(OPERATION_NAME, QUERY, input);
      return data.updateAccount;
    },
    onSuccess: (account) => {
      client.setQueryData([VueQueryKey.account], account);
    },
  });
}
