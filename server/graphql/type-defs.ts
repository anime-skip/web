import type { DocumentNode } from "graphql";
import gql from "graphql-tag";
import arguments_ from "server/assets/graphql/arguments.gql";
import directives from "server/assets/graphql/directives.gql";
import enums from "server/assets/graphql/enums.gql";
import models from "server/assets/graphql/models.gql";
import mutations from "server/assets/graphql/mutations.gql";
import queries from "server/assets/graphql/queries.gql";
import returnTypes from "server/assets/graphql/return-types.gql";
import scalars from "server/assets/graphql/scalars.gql";

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
