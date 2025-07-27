import Elysia from "elysia";
import {
  ErrorResponse,
  GetStatusResponse,
  GraphqlRequestBody,
  GraphqlResponse,
} from "shared/types";

export const models = new Elysia({ name: "models" })
  .model({
    ErrorResponse,
    GetStatusResponse,
    GraphqlRequestBody,
    GraphqlResponse,
  })
  .as("global");
