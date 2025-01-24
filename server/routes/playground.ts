import type { AnimeSkipServerHandler } from "server/types.ts";
import { version } from "shared/app.ts";
import { SHARED_CLIENT_ID } from "shared/constants.ts";

const playgroundHtml = Deno.readTextFile(
  "server/assets/playground.html",
).then((template) =>
  template
    .replaceAll("{{VERSION}}", version)
    .replaceAll("{{CLIENT_ID}}", SHARED_CLIENT_ID)
);

export const playgroundHandler: AnimeSkipServerHandler<"/playground"> = async (
  ctx,
) => {
  ctx.response.body = await playgroundHtml;
  ctx.response.type = "text/html; charset=utf-8";
};
