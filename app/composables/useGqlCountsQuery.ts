import { useAsyncState } from "@vueuse/core";

export type CountsQueryResponse = Pick<
  GqlTotalCounts,
  "shows" | "episodes" | "timestamps"
>;

export default function () {
  return useAsyncState<CountsQueryResponse>(
    async () => {
      const res = await fetch("/graphql", {
        headers: {
          "content-type": "application/json",
          "X-Client-ID": "ZGfO0sMF3eCwLYf8yMSCJjlynwNGRXWE",
        },
        body: JSON.stringify({
          operationName: "HomepageCounts",
          query:
            "query HomepageCounts {\n  counts {\n    episodes\n    shows\n    timestamps\n  }\n}",
        }),
        method: "POST",
      });
      const json = await res.json();
      return json.data.counts;
    },
    {
      shows: 0,
      episodes: 0,
      timestamps: 0,
    },
  );
}
