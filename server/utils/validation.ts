const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function validateEmail(email: string): void {
  if (!EMAIL_REGEX.test(email)) {
    throw new Error("Email is not valid");
  }
}

export function validateUsername(username: string): void {
  if (username.length < 3) {
    throw Error("Username must be at least 3 characters long");
  }
}
