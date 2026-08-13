import { NextRequest, NextResponse } from "next/server";
import { isTwoGateRegistrationEnabled } from "@/lib/bff/two-gate-registration/config";
import { requireAdminJwt } from "@/lib/bff/two-gate-registration/middleware/auth";
import { handleBffApproveUser } from "@/lib/bff/two-gate-registration/routes/admin";

/**
 * PATCH /api/admin/users/:id/approve — activates a user after email verification (two-gate BFF only).
 * Secured with Bearer JWT + admin claim (`role` / `isAdmin`); see `lib/bff/two-gate-registration/middleware/auth.ts`.
 */
export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  if (!isTwoGateRegistrationEnabled()) {
    return NextResponse.json(
      { error: "Two-gate registration is not enabled on this deployment" },
      { status: 503 },
    );
  }

  const denied = requireAdminJwt(request);
  if (denied) return denied;

  const { id } = await params;
  return handleBffApproveUser(id);
}
