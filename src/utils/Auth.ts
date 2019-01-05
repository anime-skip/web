import md5 from 'md5';

export default class Auth {
  public static hashPassword(password: string): Promise<string> {
    // return Promise.resolve(md5(password));
    return Promise.resolve(password);
  }
}
