import { useMutation, useQueryClient } from "@tanstack/vue-query";
import { queryGraphql } from "app/utils/graphql-utils";
import { VueQueryKey } from "app/utils/vue-query-keys";

export default function () {
  const client = useQueryClient();

  return useMutation({
    mutationFn: async (input: { id: string }) => {
      await queryGraphql("DeleteApiClient", QUERY, input);
    },
    onSuccess: () => {
      window.alert("Delete successful");
      client.invalidateQueries({
        queryKey: [VueQueryKey.apiClients],
      });
    },
    onError: (err) => {
      window.alert("Delete failed:" + err.message);
    },
  });
}

const QUERY = `
  mutation DeleteApiClient($id: String!) {
    deleteApiClient(id: $id) {
      id
    }
  }
`;
