import { useMutation, useQueryClient } from "@tanstack/vue-query";
import { queryGraphql } from "app/utils/graphql-utils";
import { VueQueryKey } from "app/utils/vue-query-keys";

export default function () {
  const client = useQueryClient();

  return useMutation({
    mutationFn: async (input: { client: GqlCreateApiClient }) => {
      await queryGraphql("CreateApiClient", QUERY, input);
    },
    onSuccess: async () => {
      await client.invalidateQueries({
        queryKey: [VueQueryKey.apiClients],
      });
    },
    onError: (err) => {
      window.alert("Create failed:" + err.message);
    },
  });
}

const QUERY = `
  mutation CreateApiClient($client: CreateApiClient!) {
    createApiClient(client: $client) {
      id
    }
  }
`;
