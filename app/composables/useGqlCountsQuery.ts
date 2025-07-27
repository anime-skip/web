import { isPrerendering } from "@aklinker1/aframe/app";
import { useAsyncState } from "@vueuse/core";
import { queryGraphql } from "app/utils/graphql-utils";

export default function () {
  return useAsyncState<CountsQueryResponse>(
    async () => {
      if (isPrerendering()) return { episodes: 0, shows: 0, timestamps: 0 };

      const data = await queryGraphql<{ counts: CountsQueryResponse }>(
        "HomepageCounts",
        QUERY,
      );
      return data.counts;
    },
    {
      shows: 0,
      episodes: 0,
      timestamps: 0,
    },
  );
}

export type CountsQueryResponse = Pick<
  GqlTotalCounts,
  "shows" | "episodes" | "timestamps"
>;

const QUERY = `
  query HomepageCounts {
    counts {
      episodes
      shows
      timestamps
    }
  }
`;
