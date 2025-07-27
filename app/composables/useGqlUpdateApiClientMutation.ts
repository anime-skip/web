import { useMutation, useQueryClient } from "@tanstack/vue-query";
import { queryGraphql } from "app/utils/graphql-utils";
import { VueQueryKey } from "app/utils/vue-query-keys";
import { ApiClientFragment } from "./useGqlApiClientsQuery";

export default function () {
  const client = useQueryClient();

  return useMutation({
    mutationFn: async (input: { id: string; changes: GqlApiClientChanges }) => {
      await queryGraphql("UpdateApiClient", QUERY, input);
    },
    onSuccess: async () => {
      await client.invalidateQueries({
        queryKey: [VueQueryKey.apiClients],
      });
    },
    onError: (err) => {
      window.alert("Update failed:" + err.message);
    },
  });
}

const QUERY = `
  mutation UpdateApiClient($id: String!, $changes: ApiClientChanges!) {
    updateApiClient(id: $id, changes: $changes) {
      ...ApiClientFragment
    }
  }

${ApiClientFragment}
`;
