import type { DbUser } from "server/db/schema";
import { todo } from "shared/utils";

export async function sendPasswordResetEmail(
  _user: DbUser,
  _token: string,
): Promise<void> {
  todo("sendPasswordResetEmail");
}

export async function sendAccountVerificationEmail(
  _user: DbUser,
  _token: string,
): Promise<void> {
  todo("sendAccountVerificationEmail");
}

export async function sendWelcomeEmail(_user: DbUser): Promise<void> {
  todo();
}
