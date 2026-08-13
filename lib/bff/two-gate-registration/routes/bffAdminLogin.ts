import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { connectRegistrationDb } from "../db";
import { getAdminJwtSecret } from "../config";
import { BffAdminUser } from "../models/BffAdminUser";

/** Precomputed hash so failed lookups still run bcrypt.compare (mitigate user enumeration / timing). */
const BCRYPT_TIMING_DUMMY =
  "$2b$12$rAslmWEGpg2j3ensrsq2juIJ9hAOg3CyfeiEsqzEF8jJEEnC54Nni";

function invalidCredentialsResponse() {
  return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
}

/**
 * POST body: { email, password } — validates against `bff_admin_users` (see `npm run seed:bff-admin`).
 * Returns an access token usable as `Authorization: Bearer <accessToken>` on approve routes.
 */
export async function handleBffAdminLogin(
  request: NextRequest,
): Promise<NextResponse> {
  let secret: string;
  try {
    secret = getAdminJwtSecret();
  } catch {
    return NextResponse.json(
      { error: "Server misconfiguration" },
      { status: 500 },
    );
  }

  let body: { email?: unknown; password?: unknown };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const email =
    typeof body.email === "string" ? body.email.trim().toLowerCase() : "";
  const password = typeof body.password === "string" ? body.password : "";

  if (!email || !password) {
    return NextResponse.json(
      { error: "Email and password are required" },
      { status: 400 },
    );
  }

  await connectRegistrationDb();

  const admin = await BffAdminUser.findOne({ email });
  const hashToCompare = admin?.passwordHash ?? BCRYPT_TIMING_DUMMY;
  const passwordOk = await bcrypt.compare(password, hashToCompare);

  if (!admin || !passwordOk) {
    return invalidCredentialsResponse();
  }

  const accessToken = jwt.sign(
    {
      sub: admin._id.toString(),
      email: admin.email,
      role: "ADMIN",
    },
    secret,
    { expiresIn: "7d" },
  );

  return NextResponse.json({
    success: true,
    accessToken,
    tokenType: "Bearer",
    expiresIn: "7d",
  });
}
