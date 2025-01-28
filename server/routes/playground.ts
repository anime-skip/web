import type { AnimeSkipServerHandler } from "server/types";
import { version } from "shared/app";
import { SHARED_CLIENT_ID } from "shared/constants";

const playgroundHtml = Bun.file("server/assets/playground.html")
  .text()
  .then((template) =>
    template
      .replaceAll("{{VERSION}}", version)
      .replaceAll("{{CLIENT_ID}}", SHARED_CLIENT_ID),
  );

export const playgroundHandler: AnimeSkipServerHandler<"/playground"> = async (
  ctx,
) => {
  ctx.response.body = await playgroundHtml;
  ctx.response.type = "text/html; charset=utf-8";
};
