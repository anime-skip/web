import type { GqlResolvers } from "server/graphql/resolver-types.gen";
import { GraphQLScalarType } from "graphql";

export const scalarResolvers: GqlResolvers = {
  UInt: new GraphQLScalarType<number, number>({
    name: "UInt",
    parseValue: requirePositiveInt,
    serialize: requirePositiveInt,
  }),
  Time: new GraphQLScalarType<Date, string>({
    name: "Time",
    parseValue: (v) => {
      if (typeof v !== "string") {
        throw Error("Expected ISO datetime string, got " + typeof v);
      }
      return new Date(v);
    },
    serialize: (v) => {
      if (!(v instanceof Date)) throw Error("Expected a Date, got " + typeof v);
      return v.toISOString();
    },
  }),
};

function requirePositiveInt(v: unknown): number {
  const n = Number(v);
  if (isNaN(n)) throw Error(`"${v}" is not a number`);
  if (n <= 0) throw Error(`"${v}" must be a positive integer`);

  return n;
}
