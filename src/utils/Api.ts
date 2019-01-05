import axios, { AxiosPromise, AxiosRequestConfig } from 'axios';
import Env from './Env';

export default class Api {
  public static token(username: string, md5Hash: string): AxiosPromise<TokenResponse> {
    const config: AxiosRequestConfig = {
      params: { username, md5Hash },
    };
    return axios.get(`${Env.API_URL}/account/token`, config);
  }
}
