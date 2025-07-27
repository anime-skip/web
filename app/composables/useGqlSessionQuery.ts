import { useAsyncState } from "@vueuse/core";
import { queryGraphql } from "app/utils/graphql-utils";

export default function () {
  let existingSession: Session | undefined;
  try {
    existingSession = JSON.parse(
      localStorage.getItem("@anime-skip/session") ?? "",
    );
  } catch {
    // Noop
  }

  return useAsyncState<Session | undefined>(async () => {
    const data = await queryGraphql<{ account: Session }>("GetSession", QUERY);
    return data.account;
  }, existingSession);
}

export const SessionFragment = `
  fragment SessionFragment on Account {
    username
    profileUrl
    role
  }
`;

export type Session = Pick<GqlAccount, "username" | "profileUrl" | "role">;

const QUERY = `
  query GetSession {
    account {
      ...SessionFragment
    }
  }

${SessionFragment}
`;
