import type { ErrorResponse } from "shared/types";
import { serializeError } from "serialize-error";

export class HttpError extends Error {
  constructor(
    readonly status: number,
    readonly statusText: string,
    message: string,
    options?: ErrorOptions,
  ) {
    super(message, options);
    this.name = "HttpError";
  }

  toJson(): ErrorResponse {
    return {
      status: this.status,
      statusText: this.statusText,
      message: this.message,
      cause: this.cause ? serializeError(this.cause) : null,
    };
  }
}

export class HttpBadRequestError extends HttpError {
  constructor(message: string, options?: ErrorOptions) {
    super(400, "Bad Request", message, options);
    this.name = "HttpBadRequestError";
  }
}

export class HttpUnauthorizedError extends HttpError {
  constructor(message: string, options?: ErrorOptions) {
    super(401, "Unauthorized", message, options);
    this.name = "HttpUnauthorizedError";
  }
}

export class HttpForbiddenError extends HttpError {
  constructor(message: string, options?: ErrorOptions) {
    super(403, "Forbidden", message, options);
    this.name = "HttpForbiddenError";
  }
}

export class HttpNotFoundError extends HttpError {
  constructor(message: string, options?: ErrorOptions) {
    super(404, "Not Found", message, options);
    this.name = "HttpNotFoundError";
  }
}

export class HttpMethodNotAllowedError extends HttpError {
  constructor(message: string, options?: ErrorOptions) {
    super(405, "Method Not Allowed", message, options);
    this.name = "HttpMethodNotAllowedError";
  }
}

export class HttpUnprocessableContentError extends HttpError {
  constructor(message: string, options?: ErrorOptions) {
    super(422, "Unprocessable Content", message, options);
    this.name = "HttpUnprocessableContentError";
  }
}

export class HttpTooManyRequestsError extends HttpError {
  constructor(message: string, options?: ErrorOptions) {
    super(429, "Too Many Requests", message, options);
    this.name = "HttpTooManyRequestsError";
  }
}

export class HttpInternalServerErrorError extends HttpError {
  constructor(message: string, options?: ErrorOptions) {
    super(500, "Internal Server Error", message, options);
    this.name = "HttpInternalServerErrorError";
  }
}

export class HttpNotImplementedError extends HttpError {
  constructor(message: string, options?: ErrorOptions) {
    super(501, "Not Implemented", message, options);
    this.name = "HttpNotImplementedError";
  }
}
