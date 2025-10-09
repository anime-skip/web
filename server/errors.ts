import { BadRequestHttpError, TooManyRequestsHttpError } from "@aklinker1/zeta";

export class RateLimitExceededError extends TooManyRequestsHttpError {
  constructor(
    readonly rpm: number,
    options?: ErrorOptions,
  ) {
    super(`Exceeded rate limit of ${rpm} requests/minute`, options);
    this.name = "RateLimitExceededError";
  }
}

export class XClientIdHeaderMissingError extends BadRequestHttpError {
  constructor(options?: ErrorOptions) {
    super("X-Client-ID header missing", options);
    this.name = "XClientIdHeaderMissing";
  }
}

export class ApiClientNotFoundError extends BadRequestHttpError {
  constructor(
    readonly clientId: string,
    options?: ErrorOptions,
  ) {
    super("API client not found", options);
    this.name = "ApiClientNotFoundError";
  }
}
