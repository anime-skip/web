import md5 from 'md5';

export default class Auth {
  public static hashPassword(password: string): string {
    return md5(password);
  }
}
