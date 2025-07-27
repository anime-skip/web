import { useAsyncState } from "@vueuse/core";
import md5 from "md5";
import { SessionFragment, type Session } from "./useGqlSessionQuery";
import { queryGraphql } from "app/utils/graphql-utils";

export default function () {
  return useAsyncState<LoginQueryResponse | undefined>(
    async (username: string, password: string) => {
      const data = await queryGraphql<{ login: LoginQueryResponse }>(
        "Login",
        QUERY,
        { username, passwordHash: md5(password) },
      );
      return data.login;
    },
    undefined,
    {
      immediate: false,
    },
  );
}

export type LoginQueryResponse = Pick<
  GqlLoginData,
  "authToken" | "refreshToken"
> & {
  account: Session;
};

export const LoginDataFragment = `
  fragment LoginDataFragment on LoginData {
    authToken
    refreshToken
    account {
      ...SessionFragment
    }
  }

${SessionFragment}
`;

const QUERY = `
  query Login($passwordHash: String!, $username: String!) {
    login(passwordHash: $passwordHash, usernameEmail: $username) {
      ...LoginDataFragment
    }
  }

${LoginDataFragment}
`;
