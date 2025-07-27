import Elysia from "elysia";

export const resolveIpAddress = new Elysia({ name: "resolve-ip-address" })
  .resolve(({ headers }) => {
    return {
      ip: headers["x-forwarded-for"] ?? headers["x-real-ip"],
    };
  })
  .as("global");
