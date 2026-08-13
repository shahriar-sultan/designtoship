/**
 * Two-gate registration is active when a MongoDB URI is configured for this BFF.
 * When inactive, auth routes continue to proxy the main LMS backend.
 */
export function isTwoGateRegistrationEnabled(): boolean {
  return Boolean(process.env.BFF_REGISTRATION_MONGODB_URI?.trim());
}

/** Secret used to verify Bearer JWTs for admin-only BFF routes (align with your API issuer). */
export function getAdminJwtSecret(): string {
  const secret =
    process.env.BFF_REGISTRATION_JWT_SECRET?.trim() ??
    process.env.JWT_SECRET?.trim() ??
    process.env.NEXTAUTH_SECRET?.trim();
  if (!secret) {
    throw new Error(
      "BFF_REGISTRATION_JWT_SECRET, JWT_SECRET, or NEXTAUTH_SECRET must be set for admin JWT verification",
    );
  }
  return secret;
}

/** Base URL for verification links (no trailing slash). */
export function getPublicAppBaseUrl(): string {
  const raw =
    process.env.NEXT_PUBLIC_APP_URL?.trim() ??
    process.env.NEXTAUTH_URL?.trim() ??
    "https://yourdomain.com";
  return raw.replace(/\/$/, "");
}
