import type { StatusCode } from "@oak/commons/status";

export type ErrorResponse = {
  status: StatusCode;
  statusText: string;
  message: string;
  cause?: unknown;
};
