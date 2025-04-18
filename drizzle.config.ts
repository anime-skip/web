import { defineConfig } from "drizzle-kit";

export default defineConfig({
  out: "./server/drizzle",
  schema: "./server/db/schema.ts",
  dialect: "postgresql",
  casing: "snake_case",
});
