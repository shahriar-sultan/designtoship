import { NextRequest, NextResponse } from "next/server";
import { isTwoGateRegistrationEnabled } from "@/lib/bff/two-gate-registration/config";
import { handleBffVerifyEmail } from "@/lib/bff/two-gate-registration/routes/auth";

/**
 * Enrollment-only verify-email route (no LMS backend proxy).
 * Use this file instead of route.ts if the target project has no fetchBackend / LMS API.
 * Rename: route.enrollment-only.ts → route.ts
 */
export async function GET(request: NextRequest) {
  if (!isTwoGateRegistrationEnabled()) {
    return NextResponse.json(
      { error: "Email verification is not enabled on this deployment" },
      { status: 503 },
    );
  }

  const token = request.nextUrl.searchParams.get("token");
  return handleBffVerifyEmail(token);
}

export async function POST(request: NextRequest) {
  if (!isTwoGateRegistrationEnabled()) {
    return NextResponse.json(
      { error: "Email verification is not enabled on this deployment" },
      { status: 503 },
    );
  }

  try {
    const body = await request.json();
    const token = typeof body?.token === "string" ? body.token : null;
    return handleBffVerifyEmail(token);
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }
}
