export default {
  logInErrorMessage(err: Error): string {
    return err.message === 'Bad login credentials'
      ? 'Username or password is incorrect'
      : 'Unknown error';
  },
  signUpErrorMessage(err: Error): string {
    if (err.message.includes('email=')) {
      return 'Email is already in use, did you mean to log in?';
    }
    if (err.message.includes('username=')) {
      return 'Username is already in use';
    }
    if (err.message === 'user is not apart of the early release') {
      return 'You are not apart of the alpha. Check back later for the public beta';
    }
    return 'Looks like something went wrong... Please try again';
  },
};
