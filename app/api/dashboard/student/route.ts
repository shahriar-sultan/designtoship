import { proxyToBackend } from "@/lib/bff";

export async function GET() {
  return proxyToBackend("/dashboard/student");
}
