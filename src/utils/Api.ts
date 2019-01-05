import axios, { AxiosPromise, AxiosRequestConfig } from 'axios';
import Env from './Env';
import { TokenResponse, CreateAccountResponse, AxiosRes } from './types';

export default class Api {

  public static async token(username: string, md5Hash: string): AxiosRes<TokenResponse> {
    const config: AxiosRequestConfig = {
      params: { username, md5Hash },
    };
    return axios.get(`${Env.API_URL}/account/token`, config);
  }

  public static async createAccount(username: string, email: string, md5Hash: string): AxiosRes<CreateAccountResponse> {
    const data = {
      username, email, md5Hash,
    };
    return await axios.post(`${Env.API_URL}/account/create`, data);
  }
}
