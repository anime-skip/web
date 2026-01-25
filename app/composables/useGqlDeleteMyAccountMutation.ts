import { useMutation } from "@tanstack/vue-query";
import { queryGraphql } from "app/utils/graphql-utils";
import { clearLoginData } from "app/utils/session-utils";

export default function () {
  return useMutation({
    mutationFn: async () => {
      await queryGraphql("DeleteMyAccount", QUERY, {});
    },
    onSuccess: () => {
      clearLoginData();
      location.href = "/";
    },
  });
}

const QUERY = `
  mutation DeleteMyAccount {
    deleteMyAccount {
      id
    }
  }
`;
