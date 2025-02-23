import type { AnimeSkipServerHandler } from "server/types";
import { version } from "shared/app";
import { SHARED_CLIENT_ID } from "shared/constants";
import playgroundHtmlTemplate from "server/assets/playground.html" with { type: "text" };

const playgroundHtml = playgroundHtmlTemplate
  .replaceAll("{{VERSION}}", version)
  .replaceAll("{{CLIENT_ID}}", SHARED_CLIENT_ID);

export const playgroundHandler: AnimeSkipServerHandler<"/playground"> = async (
  ctx,
) => {
  ctx.response.body = playgroundHtml;
  ctx.response.type = "text/html; charset=utf-8";
};
