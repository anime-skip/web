import type { DocumentNode } from "graphql";
import gql from "graphql-tag";
import arguments_ from "./schema/arguments.gql" with { type: "text" };
import directives from "./schema/directives.gql" with { type: "text" };
import enums from "./schema/enums.gql" with { type: "text" };
import models from "./schema/models.gql" with { type: "text" };
import mutations from "./schema/mutations.gql" with { type: "text" };
import queries from "./schema/queries.gql" with { type: "text" };
import returnTypes from "./schema/return-types.gql" with { type: "text" };
import scalars from "./schema/scalars.gql" with { type: "text" };

export const typeDefs: DocumentNode = gql(
  [
    arguments_,
    directives,
    enums,
    models,
    mutations,
    queries,
    returnTypes,
    scalars,
  ].join("\n"),
);
