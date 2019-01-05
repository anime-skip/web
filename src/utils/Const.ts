// tslint:disable:max-line-length
export default class Const {

  // From: https://emailregex.com/
  public static EMAIL_REGEX = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  public static LOWER_REGEX = /(?=.*[a-z])/;
  public static UPPER_REGEX = /(?=.*[A-Z])/;
  public static NUMERIC_REGEX = /(?=.*[0-9])/;
  public static SPECIAL_REGEX = /(?=.*[\!\"\#\$\%\&\'\(\)\*\+\,\-\.\/\:\;\<\=\>\?\@\[\\\]\^\_\`\{\|\}\~])/;

}
