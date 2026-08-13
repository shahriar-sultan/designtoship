import { NextRequest, NextResponse } from "next/server";
import { isTwoGateRegistrationEnabled } from "@/lib/bff/two-gate-registration/config";
import { handleBffAdminLogin } from "@/lib/bff/two-gate-registration/routes/bffAdminLogin";

/**
 * POST /api/auth/bff-admin/login — two-gate BFF only.
 * Authenticates `bff_admin_users` (seeded via `npm run seed:bff-admin`) and returns a JWT for admin BFF routes.
 */
export async function POST(request: NextRequest) {
  if (!isTwoGateRegistrationEnabled()) {
    return NextResponse.json(
      { error: "Two-gate registration is not enabled on this deployment" },
      { status: 503 },
    );
  }

  try {
    return await handleBffAdminLogin(request);
  } catch (err) {
    console.error("[bff-admin/login] error:", err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
