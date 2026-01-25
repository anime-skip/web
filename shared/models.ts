import { z } from "zod";
import dedent from "dedent";
import { version } from "./version";

export const HealthCheckOutput = z
  .object({
    status: z
      .literal("UP")
      .describe(
        'The server status. Will always return `"UP"` when the server is running.',
      )
      .meta({ example: "UP" }),
    version: z
      .string()
      .describe("The version of the API that is running.")
      .meta({ example: version }),
  })
  .describe("Server status")
  .meta({ ref: "HealthCheckOutput" });
export type HealthCheckOutput = z.infer<typeof HealthCheckOutput>;

export const GraphqlInput = z
  .object({
    operationName: z
      .string()
      .optional()
      .describe("An optional name for the operation you're performing.")
      .meta({ example: "MyAccount" }),
    query: z
      .string()
      .describe("The actual graphql query you are performing.")
      .meta({
        example: dedent`
          query MyAccount {
            account {
              id
              username
              profileUrl
            }
          }
        `,
      }),
    variables: z
      .record(z.string(), z.any())
      .optional()
      .describe("Map of variables provided to the query."),
  })
  .meta({
    ref: "GraphqlInput",
  });
export type GraphqlInput = z.infer<typeof GraphqlInput>;

export const GraphqlOutput = z
  .any()
  .describe("GraphQL response including success data and errors")
  .meta({
    ref: "GraphqlOutput",
    example: {
      data: {
        account: {
          id: "123456",
          username: "johndoe",
          profileUrl: "https://example.com/profile/johndoe",
        },
      },
    },
  });
export type GraphqlOutput = z.infer<typeof GraphqlOutput>;

export const GetGraphqlPlaygroundOutput = z
  .string()
  .describe("HTML page")
  .meta({
    ref: "GetGraphqlPlaygroundOutput",
    example: "<html>...</html>",
    responseType: "text/html",
  });
export type GetGraphqlPlaygroundOutput = z.infer<
  typeof GetGraphqlPlaygroundOutput
>;
