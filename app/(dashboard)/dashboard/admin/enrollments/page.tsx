"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { DashboardBreadcrumb } from "@/components/dashboard/DashboardBreadcrumb";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Loading from "@/components/Loading";

type UserRow = { id: string; email: string; firstName: string; lastName: string };
type CourseRow = { id: string; title: string };

export default function AdminEnrollmentsPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [courses, setCourses] = useState<CourseRow[]>([]);
  const [searchEmail, setSearchEmail] = useState("");
  const [users, setUsers] = useState<UserRow[]>([]);
  const [selectedUser, setSelectedUser] = useState<UserRow | null>(null);
  const [selectedCourseId, setSelectedCourseId] = useState("");
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (status === "loading") return;
    if (session?.user?.role !== "ADMIN") {
      router.replace("/dashboard");
      return;
    }
    fetch("/api/admin/courses")
      .then((r) => r.json())
      .then((json) => {
        const data = json.data?.courses ?? json.data ?? [];
        const courseList = data?.courses ?? (Array.isArray(data) ? data : []);
        setCourses(courseList);
      });
  }, [session, status, router]);

  const searchUsers = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(
        `/api/admin/users?search=${encodeURIComponent(searchEmail)}`,
      );
      const json = await res.json();
      if (!res.ok) throw new Error(json.error ?? "Search failed");
      const list = json.data?.users ?? json.data ?? [];
      setUsers(Array.isArray(list) ? list : []);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Search failed");
    } finally {
      setLoading(false);
    }
  };

  const enroll = async () => {
    if (!selectedUser || !selectedCourseId) return;
    setLoading(true);
    setError(null);
    setMessage(null);
    try {
      const res = await fetch("/api/admin/enrollments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: selectedUser.id,
          courseId: selectedCourseId,
        }),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error ?? "Enrollment failed");
      setMessage(`Enrolled ${selectedUser.email} successfully.`);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Enrollment failed");
    } finally {
      setLoading(false);
    }
  };

  if (status === "loading") {
    return (
      <div className="flex justify-center py-20">
        <Loading />
      </div>
    );
  }

  return (
    <div className="max-w-xl space-y-6">
      <DashboardBreadcrumb title="Enroll student" />
      <Card>
        <CardHeader>
          <CardTitle>Find student by email</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-2">
            <Input
              type="email"
              placeholder="student@example.com"
              value={searchEmail}
              onChange={(e) => setSearchEmail(e.target.value)}
            />
            <Button type="button" onClick={searchUsers} disabled={loading}>
              Search
            </Button>
          </div>
          {users.length > 0 && (
            <ul className="border rounded-md divide-y">
              {users.map((u) => (
                <li key={u.id}>
                  <button
                    type="button"
                    className={`w-full text-left px-3 py-2 text-sm hover:bg-muted ${selectedUser?.id === u.id ? "bg-muted" : ""}`}
                    onClick={() => setSelectedUser(u)}
                  >
                    {u.firstName} {u.lastName} ({u.email})
                  </button>
                </li>
              ))}
            </ul>
          )}
          <select
            className="w-full rounded-md border px-3 py-2 text-sm"
            value={selectedCourseId}
            onChange={(e) => setSelectedCourseId(e.target.value)}
          >
            <option value="">Select course</option>
            {courses.map((c) => (
              <option key={c.id} value={c.id}>
                {c.title}
              </option>
            ))}
          </select>
          <Button
            onClick={enroll}
            disabled={loading || !selectedUser || !selectedCourseId}
          >
            Enroll student
          </Button>
          {message && <p className="text-sm text-green-600">{message}</p>}
          {error && <p className="text-sm text-destructive">{error}</p>}
        </CardContent>
      </Card>
    </div>
  );
}
