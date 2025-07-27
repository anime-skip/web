import type { DbUser } from "server/db/schema";
import resetPasswordHtmlTemplate from "server/assets/email-templates/reset-password.html.tpl" with { type: "text" };
import welcomeHtmlTemplate from "server/assets/email-templates/welcome.html.tpl" with { type: "text" };
import verificationHtmlTemplate from "server/assets/email-templates/verification.html.tpl" with { type: "text" };
import SMTPConnection from "nodemailer/lib/smtp-connection";
import { promisify } from "node:util";
import { logger } from "./logger";

const emailsLogger = logger.extend("emails");

const STMP_HOSTNAME = "email-smtp.us-east-2.amazonaws.com";
const STMP_PORT = 587;

const SEND_EMAILS = import.meta.env.AS_SEND_EMAILS === "true";
const USERNAME = import.meta.env.AS_EMAIL_STMP_USERNAME;
const PASSWORD = import.meta.env.AS_EMAIL_STMP_PASSWORD;

if (SEND_EMAILS && !USERNAME) {
  throw Error(
    "AS_EMAIL_STMP_USERNAME environment variable is required when AS_SEND_EMAILS=true",
  );
}
if (SEND_EMAILS && !PASSWORD) {
  throw Error(
    "AS_EMAIL_STMP_PASSWORD environment variable is required when AS_SEND_EMAILS=true",
  );
}

const TEMPLATES = {
  "reset-password": resetPasswordHtmlTemplate,
  welcome: welcomeHtmlTemplate,
  verification: verificationHtmlTemplate,
};
type TemplateName = keyof typeof TEMPLATES;

const SUPPORT_SENDER: EmailAddress = {
  name: "Anime Skip Support",
  address: "support@anime-skip.com",
};

const NO_REPLY_SENDER: EmailAddress = {
  name: "Anime Skip",
  address: "no-reply@anime-skip.com",
};

const AARON_SENDER: EmailAddress = {
  name: "Aaron at Anime Skip",
  address: "aaron@anime-skip.com",
  replyTo: SUPPORT_SENDER,
};

export async function sendWelcomeEmail(user: DbUser): Promise<void> {
  await send({
    from: AARON_SENDER,
    to: [user.email],
    subject: "Welcome!",
    templateName: "welcome",
    templateData: { username: user.username },
  });
}

export async function sendAccountVerificationEmail(
  user: DbUser,
  token: string,
): Promise<void> {
  await send({
    from: NO_REPLY_SENDER,
    to: [user.email],
    subject: "Verify Email Address",
    templateName: "verification",
    templateData: { token },
  });
}

export async function sendPasswordResetEmail(
  user: DbUser,
  token: string,
): Promise<void> {
  await send({
    from: NO_REPLY_SENDER,
    to: [user.email],
    subject: "Reset Password",
    templateName: "reset-password",
    templateData: { token },
  });
}

async function send(data: {
  from: EmailAddress;
  replyTo?: EmailAddress;
  to: string[];
  subject: string;
  templateName: TemplateName;
  templateData: Record<string, string>;
}): Promise<void> {
  emailsLogger.info(`Sending ${data.templateName} email to:`, data.to);
  if (!SEND_EMAILS) {
    emailsLogger.warn("Skipped sending email, AS_SEND_EMAILS != true");
    return;
  }

  const headers = [
    "MIME-version: 1.0;",
    `Content-Type: text/html; charset="UTF-8";`,
    `From: ${data.from.name} <${data.from.address}>`,
    `To: ${data.to.join()}>`,
    `Subject: ${data.subject}`,
  ];
  if (data.replyTo) {
    headers.push(`Reply-To: ${data.replyTo.name} <${data.replyTo.address}>`);
  }

  const body = Object.entries(data.templateData).reduce(
    (str, [key, value]) => str.replaceAll(`{{${key}}}`, value),
    TEMPLATES[data.templateName],
  );
  const content = headers.concat("", body).join("\n");

  const auth = {
    type: "login" as const,
    user: USERNAME!,
    pass: PASSWORD!,
  };
  const connection = new SMTPConnection({
    auth,
    host: STMP_HOSTNAME,
    port: STMP_PORT,
    logger: {
      ...emailsLogger,
      level: () => {},
      trace: (...args) => emailsLogger.debug(...args),
      fatal: (...args) => emailsLogger.error(...args),
    },
    debug: false,
  });
  try {
    await promisify(connection.connect)();
    await promisify(connection.login)(auth);
    await promisify(connection.send)(
      { from: data.from.address, to: data.to },
      content,
    );
  } catch (err) {
    emailsLogger.error(`Failed to send email:`, err);
  } finally {
    connection.quit();
  }
}

type EmailAddress = {
  name: string;
  address: string;
  replyTo?: EmailAddress;
};
