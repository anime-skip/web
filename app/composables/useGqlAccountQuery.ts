import { queryGraphql } from "app/utils/graphql-utils";
import { useQuery } from "@tanstack/vue-query";
import { VueQueryKey } from "app/utils/vue-query-keys";

export default function () {
  return useQuery<Account>({
    queryKey: [VueQueryKey.account],
    queryFn: async () => {
      const data = await queryGraphql<{ account: Account }>(
        "GetAccount",
        QUERY,
      );
      return data.account;
    },
  });
}

export type Account = Pick<
  GqlAccount,
  | "id"
  | "username"
  | "profileUrl"
  | "email"
  | "createdAt"
  | "emailVerified"
  | "role"
>;

const QUERY = `
  query GetAccount {
    account {
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
