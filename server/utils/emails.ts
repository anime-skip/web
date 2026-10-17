import { format, promisify } from "node:util";

import { createLogger } from "@aklinker1/logger";
import SMTPConnection from "nodemailer/lib/smtp-connection";
import resetPasswordHtmlTemplate from "server/assets/email-templates/reset-password.html.tpl" with { type: "text" };
import verificationHtmlTemplate from "server/assets/email-templates/verification.html.tpl" with { type: "text" };
import welcomeHtmlTemplate from "server/assets/email-templates/welcome.html.tpl" with { type: "text" };
import type { DbUser } from "server/db/schema";
import { env } from "server/env";

const logger = createLogger("emails");

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

export async function sendAccountVerificationEmail(user: DbUser, token: string): Promise<void> {
  await send({
    from: NO_REPLY_SENDER,
    to: [user.email],
    subject: "Verify Email Address",
    templateName: "verification",
    templateData: { token },
  });
}

export async function sendPasswordResetEmail(user: DbUser, token: string): Promise<void> {
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
  logger.info(`Sending email`, {
    templateName: data.templateName,
  });
  const { SEND_EMAILS } = env;
  if (!SEND_EMAILS) {
    logger.warn("Skipped sending email, disabled by env.SEND_EMAILS");
    return;
  }

  const { EMAIL_STMP_USERNAME, EMAIL_STMP_PASSWORD, EMAIL_STMP_HOSTNAME, EMAIL_STMP_PORT } = env;
  if (!EMAIL_STMP_USERNAME || !EMAIL_STMP_PASSWORD) {
    throw Error("env.EMAIL_STMP_USERNAME or env.EMAIL_STMP_PASSWORD are required to send an email");
  }

  const headers = [
    "MIME-Version: 1.0",
    `Content-Type: text/html; charset="UTF-8"`,
    `From: ${data.from.name} <${data.from.address}>`,
    `To: ${data.to.join()}`,
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
    user: EMAIL_STMP_USERNAME,
    pass: EMAIL_STMP_PASSWORD,
  };
  const connection = new SMTPConnection({
    host: EMAIL_STMP_HOSTNAME,
    port: EMAIL_STMP_PORT,
    logger: nodemailerLogger,
    debug: false,
  });
  try {
    await promisify(connection.connect.bind(connection))();
    await promisify(connection.login.bind(connection))(auth);
    await promisify(connection.send.bind(connection))(
      { from: data.from.address, to: data.to },
      content,
    );
  } catch (error) {
    logger.error(`Failed to send email`, { error });
  } finally {
    connection.quit();
  }
}

/**
 * Nodemailer calls its logger with the bunyan convention: `(dataObject, formatString, ...args)`,
 * which is incompatible with our `(message, meta)` logger.
 */
const nodemailerLogger = (() => {
  const smtpLogger = logger.extend("smtp");
  const adapt =
    (log: (message: string, meta?: Record<string, any>) => void) =>
    (meta: unknown, message?: unknown, ...args: unknown[]) => {
      if (typeof meta === "string") {
        log(format(meta, ...(message === undefined ? [] : [message]), ...args));
      } else {
        log(format(String(message ?? ""), ...args), meta as Record<string, any>);
      }
    };
  return {
    level: () => {},
    trace: adapt(smtpLogger.debug),
    debug: adapt(smtpLogger.debug),
    info: adapt(smtpLogger.info),
    warn: adapt(smtpLogger.warn),
    error: adapt(smtpLogger.error),
    fatal: adapt(smtpLogger.error),
  };
})();

type EmailAddress = {
  name: string;
  address: string;
  replyTo?: EmailAddress;
};
