import type { Application } from "@oak/oak/application";
import type { Middleware } from "@oak/oak/middleware";
import type { RouteParams, RouterMiddleware } from "@oak/oak/router";
import type { ServerState } from "server/state.ts";

export type AnimeSkipServer = Application<ServerState>;
export type AnimeSkipServerMiddleware = Middleware<ServerState>;
export type AnimeSkipServerHandler<
  Path extends string,
  Params extends RouteParams<Path> = RouteParams<Path>,
> = RouterMiddleware<Path, Params, ServerState>;
