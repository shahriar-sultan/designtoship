import { getBackendApiUrl } from "./backend";

/** @deprecated Prefer BFF routes under /api/auth/* */
export async function register(
  email: string,
  password: string,
  firstName: string,
  lastName: string,
) {
  const apiUrl = getBackendApiUrl();
  return fetch(`${apiUrl}/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify({ email, password, firstName, lastName }),
  });
}

/** @deprecated Prefer signIn('credentials') or /api/auth/login */
export async function login(email: string, password: string) {
  const apiUrl = getBackendApiUrl();
  return fetch(`${apiUrl}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify({ email, password }),
  });
}

export async function verifyEmail(token: string) {
  const apiUrl = getBackendApiUrl();
  return fetch(`${apiUrl}/auth/verify-email`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify({ token }),
  });
}
