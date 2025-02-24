import { t } from "elysia";

export const ErrorResponse = t.Object(
  {
    status: t.Integer({
      description: "HTTP status code of the response.",
      examples: [400],
    }),
    statusText: t.String({
      description:
        "HTTP status text so you don't always have to look up what the error is.",
      examples: ["Bad Request"],
    }),
    message: t.String({
      description: "Error message.",
      examples: ["X-Client-ID header is missing"],
    }),
    cause: t.Optional(
      t.Any({ description: "Serialized version of the error's cause." }),
    ),
  },
  { description: "Error" },
);
export type ErrorResponse = typeof ErrorResponse.static;

export const GetStatusResponse = t.Object(
  {
    status: t.Literal("UP", {
      description:
        'The server status. Will always return `"UP"` when the server is running.',
      examples: ["UP"],
    }),
    version: t.String({
      description: "The version of the API that is running.",
      examples: ["2.0.1"],
    }),
  },
  { description: "Server status" },
);
export type GetStatusResponse = typeof GetStatusResponse.static;

export const GraphqlRequestBody = t.Object({
  operationName: t.Optional(
    t.String({
      description: "An optional name for the operation you're performing.",
      examples: ["MyAccount"],
    }),
  ),
  query: t.String({
    description: "The actual graphql query you are performing.",
    examples: [
      [
        "query MyAccount {",
        "  account {",
        "    id",
        "    username",
        "    profileUrl",
        "  }",
        "}",
      ].join("\n"),
    ],
  }),
  variables: t.Optional(
    t.Record(t.String(), t.Any(), {
      description: "Map of variables provided to the query.",
    }),
  ),
});
export type GraphqlRequestBody = typeof GraphqlRequestBody.static;

export const GraphqlResponse = t.Any({
  description: "GraphQL Response",
  examples: [
    {
      data: {
        account: {
          id: "123456",
          username: "johndoe",
          profileUrl: "https://example.com/profile/johndoe",
        },
      },
    },
  ],
});
export type GraphqlResponse = typeof GraphqlResponse.static;

/** Deeply remove optionals from a type and replace them with `| undefined`. */
export type NoOptionals<T> = {
  [P in keyof T]-?: undefined extends T[P]
    ? T[P]
    : T[P] extends undefined
      ? T[P]
      : T[P] extends object
        ? NoOptionals<T[P]>
        : T[P];
};
