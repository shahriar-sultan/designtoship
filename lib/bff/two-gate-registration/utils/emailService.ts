import nodemailer from "nodemailer";
import { getPublicAppBaseUrl } from "../config";

/** Path appended to the public app base for email links (default matches the spec). */
function getEmailVerificationPath(): string {
  const raw =
    process.env.BFF_REGISTRATION_VERIFY_PATH?.trim() ?? "/verify-email";
  return raw.startsWith("/") ? raw : `/${raw}`;
}

function getTransport() {
  const host = process.env.SMTP_HOST?.trim();
  const port = process.env.SMTP_PORT?.trim();
  const user = process.env.SMTP_USER?.trim();
  const pass = process.env.SMTP_PASS?.trim();

  if (!host || !port) {
    return null;
  }

  return nodemailer.createTransport({
    host,
    port: Number(port),
    secure: process.env.SMTP_SECURE === "true",
    auth: user && pass ? { user, pass } : undefined,
  });
}

const fromAddress =
  process.env.SMTP_FROM?.trim() ?? '"LMS" <no-reply@yourdomain.com>';

/**
 * Sends a verification link containing the **raw** token (only ever in email, not in DB).
 */
export async function sendVerificationEmail(
  userEmail: string,
  rawToken: string,
): Promise<void> {
  const base = getPublicAppBaseUrl();
  const url = `${base}${getEmailVerificationPath()}?token=${encodeURIComponent(rawToken)}`;

  const transport = getTransport();
  const text = `Verify your email by opening: ${url}`;

  if (!transport) {
    // Stub / local dev: never log the full URL with token in production logs if you enable real SMTP later.
    if (process.env.NODE_ENV !== "production") {
      console.info(
        "[emailService] SMTP not configured; verification link (dev only):",
        url,
      );
    }
    return;
  }

  await transport.sendMail({
    from: fromAddress,
    to: userEmail,
    subject: "Verify your email",
    text,
    html: `<p>Please verify your email address.</p><p><a href="${url}">Verify email</a></p>`,
  });
}

/** Notifies the user that their account is active after admin approval. */
export async function sendApprovalEmail(userEmail: string): Promise<void> {
  const transport = getTransport();
  const text =
    "Your account has been approved and is now active. You can sign in.";

  if (!transport) {
    if (process.env.NODE_ENV !== "production") {
      console.info(
        "[emailService] SMTP not configured; would send approval email to",
        userEmail,
      );
    }
    return;
  }

  await transport.sendMail({
    from: fromAddress,
    to: userEmail,
    subject: "Your account is active",
    text,
    html: `<p>${text}</p>`,
  });
}
