import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { getAdminJwtSecret } from "../config";

export type AdminJwtPayload = jwt.JwtPayload & {
  role?: string;
  isAdmin?: boolean;
};

function extractBearerToken(request: NextRequest): string | null {
  const header = request.headers.get("authorization");
  if (!header?.toLowerCase().startsWith("bearer ")) return null;
  const token = header.slice(7).trim();
  return token.length > 0 ? token : null;
}

function isAdminPayload(payload: AdminJwtPayload): boolean {
  if (payload.isAdmin === true) return true;
  const role = payload.role;
  if (typeof role !== "string") return false;
  const normalized = role.toLowerCase();
  return normalized === "admin" || role === "ADMIN";
}

/**
 * Secures admin BFF routes: requires a valid JWT and admin privileges on the token.
 * Returns a NextResponse error when unauthorized; otherwise returns null.
 */
export function requireAdminJwt(request: NextRequest): NextResponse | null {
  const token = extractBearerToken(request);
  if (!token) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  let secret: string;
  try {
    secret = getAdminJwtSecret();
  } catch {
    return NextResponse.json(
      { error: "Server misconfiguration" },
      { status: 500 },
    );
  }

  let payload: AdminJwtPayload;
  try {
    payload = jwt.verify(token, secret) as AdminJwtPayload;
  } catch {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  if (!isAdminPayload(payload)) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  return null;
}
