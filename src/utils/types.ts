// tslint:disable:no-namespace

import { AxiosResponse } from 'axios';

export interface TokenResponse {
  token: string;
}

export interface CreateAccountResponse extends Entity.User, TokenResponse {}

export namespace Entity {
  export interface User {
    username: string;
    email: string;
  }
}

export type AxiosRes<T> = Promise<AxiosResponse<T>>;

export enum ValidState {
  NONE = -1,
  ERROR = 0,
  VALID = 1,
}
