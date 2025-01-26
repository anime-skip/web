import type { DbUser } from "server/db/schema.ts";
import { todo } from "shared/utils.ts";

export async function sendPasswordResetEmail(
  user: DbUser,
  token: string,
): Promise<void> {
  todo("sendPasswordResetEmail");
}

export async function sendAccountVerificationEmail(
  user: DbUser,
  token: string,
): Promise<void> {
  todo("sendAccountVerificationEmail");
}

export async function sendWelcomeEmail(user: DbUser): Promise<void> {
  todo();
}
