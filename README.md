# Anime Skip Website

This project uses Nuxt 3, Dasiy UI, Pinia, and Apollo for it's main libraries.

## Required Tools

- NodeJS
- `pnpm`: `npm i -g pnpm`
- Docker

## Start Local Server

Install dependencies, and then run the `dev` command:

```bash
pnpm install
pnpm dev
```

### Configuration

```env
# Use a specific URL when making API calls (defaults to prod as shown below)
NUXT_PUBLIC_API_URL=https://api.anime-skip.com/graphql
```

### Generating GraphQL

This project uses [`graphql-codegen`](https://www.the-guild.dev/graphql/codegen) to generate all queries, mutations, and types based on the API and defined GraphQL operations.

Generally, operations should be wrapped in a composable, `useQuery` or `useMutation`, from [`vue-query`](https://vue-query.vercel.app/#/). See any of the `src/composables/use*Query` or `src/composables/use*Mutation` methods.

> While both GraphQL and `vue-query` use the verbs "query" and "mutation", they mean different things. Most of the time they align, but occasionally, a graphql query will be wrapped inside `useMutation`.
>
> In `vue-query`, a mutation is a async operation that is triggered based on a user interaction. In GraphQL, a mutation is an operation that changes data.
>
> Usually these two verbs line up and are used at the same time, but the `useLoginMutation` is an example of a `vue-query` mutation (that's fired when the user clicks on the "log in" button), while it uses a GraphQL query to load the data since it doens't mutate anything.

The `src/utils/graphql.generated.ts` is the file all generated code is written to. It exports all the types and an "SDK" that can call all the methods you've defined.

To define a new method, create two files in the `src/composables` folder:

- `useOperationNameMutation.graphql` or `useOperationNameQuery.graphql`
- `useOperationNameMutation.ts` or `useOperationNameQuery.ts`

In the GraphQL file, write the GraphQL operation that you want to perform. Then run `pnpm generate:graphql` to update the generated code to include your new operation.

Then implement the composable in the TypeScript file. See other query/mutation composables for examples of how to do this.
