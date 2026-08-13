import { NextRequest, NextResponse } from "next/server";
import { extractEnvelopeData, fetchBackend } from "@/lib/backend";
import { isTwoGateRegistrationEnabled } from "@/lib/bff/two-gate-registration/config";
import { handleBffVerifyEmail } from "@/lib/bff/two-gate-registration/routes/auth";

/**
 * Email verification BFF:
 * - Two-gate mode: GET uses `token` query param; POST accepts JSON `{ token }` (same semantics).
 * - Default: POST proxies to the LMS backend.
 */
export async function GET(request: NextRequest) {
  if (!isTwoGateRegistrationEnabled()) {
    return NextResponse.json(
      { error: "Method not allowed for this deployment" },
      { status: 405 },
    );
  }

  const token = request.nextUrl.searchParams.get("token");
  return handleBffVerifyEmail(token);
}

export async function POST(request: NextRequest) {
  if (isTwoGateRegistrationEnabled()) {
    try {
      const body = await request.json();
      const token =
        typeof body?.token === "string" ? body.token : null;
      return handleBffVerifyEmail(token);
    } catch {
      return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
    }
  }

  try {
    const { token } = await request.json();

    if (!token) {
      return NextResponse.json(
        { error: "Verification token is required" },
        { status: 400 },
      );
    }

    const response = await fetchBackend("/auth/verify-email", {
      method: "POST",
      body: JSON.stringify({ token }),
    });

    const json = await response.json().catch(() => ({}));

    if (!response.ok) {
      return NextResponse.json(
        {
          error:
            (json as { message?: string }).message ??
            "Email verification failed",
        },
        { status: response.status },
      );
    }

    const data = extractEnvelopeData(json);
    return NextResponse.json({
      success: true,
      message: (json as { message?: string }).message ?? "Email verified",
      ...((data as object) ?? {}),
    });
  } catch (error) {
    console.error("Email verification BFF route error:", error);
    return NextResponse.json(
      { error: "Internal server error during email verification" },
      { status: 500 },
    );
  }
}
