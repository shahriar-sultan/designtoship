import { createHash, randomBytes } from "node:crypto";

/** 32 random bytes as lowercase hex (64 characters). */
export function generateRawVerificationToken(): string {
  return randomBytes(32).toString("hex");
}

/** SHA-256 hash of the raw token, hex-encoded for storage and lookup. */
export function hashTokenSha256(rawToken: string): string {
  return createHash("sha256").update(rawToken, "utf8").digest("hex");
}
