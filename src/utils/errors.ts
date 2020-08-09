export default {
  signInErrorMessage(err: Error): string {
    return err.message === 'Bad login credentials'
      ? 'Username or password is incorrect'
      : 'Unknown error';
  },
};
