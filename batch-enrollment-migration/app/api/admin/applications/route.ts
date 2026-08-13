import { NextRequest, NextResponse } from "next/server";
import { isTwoGateRegistrationEnabled } from "@/lib/bff/two-gate-registration/config";
import { requireAdminJwt } from "@/lib/bff/two-gate-registration/middleware/auth";
import { handleListApplications } from "@/lib/bff/two-gate-registration/routes/applications";

/**
 * GET /api/admin/applications — list batch applications (two-gate BFF admin JWT).
 */
export async function GET(request: NextRequest) {
  if (!isTwoGateRegistrationEnabled()) {
    return NextResponse.json(
      { error: "Two-gate registration is not enabled on this deployment" },
      { status: 503 },
    );
  }

  const denied = requireAdminJwt(request);
  if (denied) return denied;

  return handleListApplications(request);
}
