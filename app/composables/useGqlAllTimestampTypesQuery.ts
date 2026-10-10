import { useQuery } from "@tanstack/vue-query";
import { queryGraphql } from "app/utils/graphql-utils";
import { VueQueryKey } from "app/utils/vue-query-keys";

export default function () {
  return useQuery<TimestampType[]>({
    queryKey: [VueQueryKey.allTimestampTypes],
    queryFn: async () => {
      const data = await queryGraphql<{ allTimestampTypes: TimestampType[] }>(
        "AllTimestampTypes",
        QUERY,
      );
      return data.allTimestampTypes;
    },
  });
}

export type TimestampType = Pick<GqlTimestampType, "id" | "name" | "description">;

const QUERY = `
  query AllTimestampTypes {
    allTimestampTypes {
      id,
      name,
      description
    }
  }
`;
