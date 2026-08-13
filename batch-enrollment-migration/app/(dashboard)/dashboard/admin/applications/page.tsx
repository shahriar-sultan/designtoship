"use client";

import { useCallback, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { DashboardBreadcrumb } from "@/components/dashboard/DashboardBreadcrumb";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Loading from "@/components/Loading";

type ApplicationRow = {
  id: string;
  email: string;
  status: string;
  isEmailVerified: boolean;
  createdAt: string;
  application: {
    fullName: string;
    district: string;
    paymentTier: string;
    bkashTransactionId: string;
    whatsappNumber: string;
  } | null;
};

export default function AdminApplicationsPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [adminJwt, setAdminJwt] = useState<string | null>(null);
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [applications, setApplications] = useState<ApplicationRow[]>([]);
  const [statusFilter, setStatusFilter] = useState("PENDING_ADMIN");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);

  const fetchApplications = useCallback(async (token: string, filter: string) => {
    setLoading(true);
    setError(null);
    try {
      const qs = filter ? `?status=${encodeURIComponent(filter)}` : "";
      const res = await fetch(`/api/admin/applications${qs}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error ?? "Failed to load applications");
      setApplications(Array.isArray(json.data) ? json.data : []);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Failed to load applications");
    } finally {
      setLoading(false);
    }
  }, []);

  const handleBffLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/auth/bff-admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: loginEmail, password: loginPassword }),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error ?? "Login failed");
      const token = json.accessToken as string;
      setAdminJwt(token);
      await fetchApplications(token, statusFilter);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Login failed");
    } finally {
      setLoading(false);
    }
  };

  const handleApprove = async (id: string) => {
    if (!adminJwt) return;
    setLoading(true);
    setError(null);
    setMessage(null);
    try {
      const res = await fetch(`/api/admin/users/${id}/approve`, {
        method: "PATCH",
        headers: { Authorization: `Bearer ${adminJwt}` },
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error ?? "Approval failed");
      setMessage("User approved successfully.");
      await fetchApplications(adminJwt, statusFilter);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Approval failed");
    } finally {
      setLoading(false);
    }
  };

  if (status === "loading") {
    return <Loading />;
  }

  if (session?.user?.role !== "ADMIN") {
    router.replace("/dashboard");
    return null;
  }

  return (
    <div className="space-y-6">
      <DashboardBreadcrumb title="Batch Applications" />

      {!adminJwt ? (
        <Card className="max-w-md">
          <CardHeader>
            <CardTitle>BFF admin login</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">
              Two-gate application review uses a separate BFF admin account
              (see <code className="text-xs">npm run seed:bff-admin</code>).
            </p>
            <form onSubmit={handleBffLogin} className="space-y-3">
              <Input
                type="email"
                placeholder="admin@local.dev"
                value={loginEmail}
                onChange={(e) => setLoginEmail(e.target.value)}
                required
              />
              <Input
                type="password"
                placeholder="Password"
                value={loginPassword}
                onChange={(e) => setLoginPassword(e.target.value)}
                required
              />
              <Button type="submit" disabled={loading} className="w-full">
                {loading ? "Signing in…" : "Sign in"}
              </Button>
            </form>
          </CardContent>
        </Card>
      ) : (
        <Card>
          <CardHeader className="flex flex-row items-center justify-between gap-4">
            <CardTitle>Applications</CardTitle>
            <div className="flex items-center gap-2">
              <select
                className="h-9 rounded-md border px-2 text-sm"
                value={statusFilter}
                onChange={(e) => {
                  setStatusFilter(e.target.value);
                  fetchApplications(adminJwt, e.target.value);
                }}
              >
                <option value="">All statuses</option>
                <option value="PENDING_EMAIL">Pending email</option>
                <option value="PENDING_ADMIN">Pending admin</option>
                <option value="ACTIVE">Active</option>
                <option value="REJECTED">Rejected</option>
              </select>
              <Button
                variant="outline"
                size="sm"
                onClick={() => fetchApplications(adminJwt, statusFilter)}
                disabled={loading}
              >
                Refresh
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            {error && (
              <p className="text-sm text-destructive mb-3">{error}</p>
            )}
            {message && (
              <p className="text-sm text-green-700 mb-3">{message}</p>
            )}
            {loading && applications.length === 0 ? (
              <Loading />
            ) : applications.length === 0 ? (
              <p className="text-sm text-muted-foreground">No applications found.</p>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b text-left">
                      <th className="py-2 pr-3">Name</th>
                      <th className="py-2 pr-3">Email</th>
                      <th className="py-2 pr-3">District</th>
                      <th className="py-2 pr-3">bKash ID</th>
                      <th className="py-2 pr-3">Status</th>
                      <th className="py-2">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {applications.map((row) => (
                      <tr key={row.id} className="border-b">
                        <td className="py-2 pr-3">
                          {row.application?.fullName ?? "—"}
                        </td>
                        <td className="py-2 pr-3">{row.email}</td>
                        <td className="py-2 pr-3">
                          {row.application?.district ?? "—"}
                        </td>
                        <td className="py-2 pr-3 font-mono text-xs">
                          {row.application?.bkashTransactionId ?? "—"}
                        </td>
                        <td className="py-2 pr-3">{row.status}</td>
                        <td className="py-2">
                          {row.status === "PENDING_ADMIN" && (
                            <Button
                              size="sm"
                              onClick={() => handleApprove(row.id)}
                              disabled={loading}
                            >
                              Approve
                            </Button>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
}
