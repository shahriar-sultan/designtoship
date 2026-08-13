import { NextRequest, NextResponse } from "next/server";
import mongoose from "mongoose";
import { connectRegistrationDb } from "../db";
import { RegistrationUser } from "../models/User";
import {
  generateRawVerificationToken,
  hashTokenSha256,
} from "../utils/cryptoHelper";
import { sendVerificationEmail } from "../utils/emailService";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function genericRegistrationErrorResponse() {
  return NextResponse.json(
    {
      error:
        "We could not complete registration with the information provided. Please try again later.",
    },
    { status: 400 },
  );
}

/**
 * POST /api/auth/register — BFF two-gate path (MongoDB).
 * Stores only lifecycle fields on the user document; raw tokens are never persisted.
 */
export async function handleBffRegister(request: NextRequest): Promise<NextResponse> {
  let body: { email?: unknown };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const email =
    typeof body.email === "string" ? body.email.trim().toLowerCase() : "";
  if (!email || !EMAIL_REGEX.test(email)) {
    return NextResponse.json({ error: "A valid email is required" }, { status: 400 });
  }

  await connectRegistrationDb();

  const rawToken = generateRawVerificationToken();
  const tokenHash = hashTokenSha256(rawToken);
  const emailTokenExpires = new Date(Date.now() + 24 * 60 * 60 * 1000);

  try {
    await RegistrationUser.create({
      email,
      status: "PENDING_EMAIL",
      isEmailVerified: false,
      emailVerificationToken: tokenHash,
      emailTokenExpires,
    });
  } catch (err) {
    if (err instanceof mongoose.mongo.MongoServerError && err.code === 11000) {
      // Do not reveal whether the email already exists.
      return genericRegistrationErrorResponse();
    }
    console.error("[two-gate-registration] register error:", err);
    return NextResponse.json(
      { error: "Internal server error during registration" },
      { status: 500 },
    );
  }

  try {
    await sendVerificationEmail(email, rawToken);
  } catch (err) {
    console.error("[two-gate-registration] verification email failed:", err);
    // Avoid leaving users without a way to verify if email fails in production.
    await RegistrationUser.deleteOne({ email }).catch(() => undefined);
    return NextResponse.json(
      { error: "Internal server error during registration" },
      { status: 500 },
    );
  }

  return NextResponse.json(
    {
      success: true,
      message:
        "Registration started. Please check your email to verify your address.",
    },
    { status: 201 },
  );
}

function invalidTokenResponse() {
  return NextResponse.json(
    { error: "Invalid or expired verification link." },
    { status: 400 },
  );
}

/**
 * GET /api/auth/verify-email?token=... — hashes the raw token and completes gate 1.
 */
export async function handleBffVerifyEmail(
  rawToken: string | null,
): Promise<NextResponse> {
  if (!rawToken || rawToken.length < 32) {
    return invalidTokenResponse();
  }

  await connectRegistrationDb();
  const tokenHash = hashTokenSha256(rawToken);
  const now = new Date();

  const user = await RegistrationUser.findOne({
    emailVerificationToken: tokenHash,
    emailTokenExpires: { $gt: now },
  });

  if (!user) {
    return invalidTokenResponse();
  }

  user.isEmailVerified = true;
  user.status = "PENDING_ADMIN";
  user.emailVerificationToken = null;
  user.emailTokenExpires = null;

  try {
    await user.save();
  } catch (err) {
    console.error("[two-gate-registration] verify-email save error:", err);
    return NextResponse.json(
      { error: "Internal server error during verification" },
      { status: 500 },
    );
  }

  return NextResponse.json({
    success: true,
    message: "Email verified. Your account is awaiting administrator approval.",
  });
}
