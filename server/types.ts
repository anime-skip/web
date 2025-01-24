import type { Application } from "@oak/oak/application";
import type { Logger } from "server/utils/logger.ts";
import type { Middleware } from "@oak/oak/middleware";
import type { RouteParams, RouterMiddleware } from "@oak/oak/router";

export interface ServerState {
  port: number;
  domain: string;
  origin: string;
  logger: Logger;
}

export type AnimeSkipServer = Application<ServerState>;
export type AnimeSkipServerMiddleware = Middleware<ServerState>;
export type AnimeSkipServerHandler<
  Path extends string,
  Params extends RouteParams<Path> = RouteParams<Path>,
> = RouterMiddleware<Path, Params, ServerState>;
