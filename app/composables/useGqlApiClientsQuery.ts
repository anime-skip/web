import { queryGraphql } from "app/utils/graphql-utils";
import { useQuery } from "@tanstack/vue-query";
import { VueQueryKey } from "app/utils/vue-query-keys";

export default function () {
  return useQuery<ApiClient[]>({
    queryKey: [VueQueryKey.apiClients],
    queryFn: async () => {
      const data = await queryGraphql<{ myApiClients: ApiClient[] }>(
        "ListApiClients",
        QUERY,
      );
      return data.myApiClients;
    },
  });
}

export const ApiClientFragment = `
  fragment ApiClientFragment on ApiClient {
    appName
    id
    createdAt
    rateLimitRpm
    updatedAt
    description
  }
`;

export type ApiClient = Pick<
  GqlApiClient,
  "appName" | "id" | "createdAt" | "rateLimitRpm" | "updatedAt" | "description"
>;

const QUERY = `
  query ListApiClients {
    myApiClients(sort: "DESC") {
      ...ApiClientFragment
    }
  }

${ApiClientFragment}
`;
