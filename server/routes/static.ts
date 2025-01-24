import type { AnimeSkipServerHandler } from "server/types.ts";
import { contentType } from "@std/media-types";
import { extname } from "node:path";
import { errors } from "@oak/commons/http_errors";

/** Map of paths to their prerendered public files */
const PRERENDERED_MAPPING: Record<string, string> = {
  // "/": "public/.prerendered/home.html",
};

const indexHtml = Deno.readTextFile("public/index.html");

export const staticHandler: AnimeSkipServerHandler<string> = async (ctx) => {
  const path = PRERENDERED_MAPPING[ctx.request.url.pathname] ??
    `public${ctx.request.url.pathname}`;
  const ext = extname(path);

  try {
    const file = await Deno.open(path);
    ctx.response.type = contentType(ext);
    ctx.response.body = file;

    // deno-lint-ignore no-explicit-any
  } catch (err: any) {
    // If we tried to load a file with no extension, return the UI's HTML file instead
    if ("code" in err && err.code === "ENOENT" && ext === "") {
      ctx.response.type = "text/html; charset=utf-8";
      ctx.response.body = await indexHtml;
      return;
    }
    throw new errors.NotFound("File not found: " + ctx.request.url.pathname, {
      cause: err,
    });
  }
};
