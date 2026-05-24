"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { DashboardBreadcrumb } from "@/components/dashboard/DashboardBreadcrumb";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Loading from "@/components/Loading";

type CourseRow = {
  id: string;
  title: string;
  _count?: { enrollments: number };
};

export default function AdminPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [courses, setCourses] = useState<CourseRow[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (status === "loading") return;
    if (session?.user?.role !== "ADMIN") {
      router.replace("/dashboard");
      return;
    }

    fetch("/api/admin/courses")
      .then(async (res) => {
        const json = await res.json();
        const data = json.data ?? json;
        const list = data?.courses ?? (Array.isArray(data) ? data : []);
        setCourses(list);
      })
      .finally(() => setLoading(false));
  }, [session, status, router]);

  if (status === "loading" || loading) {
    return (
      <div className="flex justify-center py-20">
        <Loading />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <DashboardBreadcrumb title="Admin" />
      <div className="flex gap-2">
        <Button asChild variant="outline">
          <Link href="/dashboard/admin/enrollments">Manage enrollments</Link>
        </Button>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Courses</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          {courses.map((c) => (
            <div
              key={c.id}
              className="flex items-center justify-between border rounded-lg p-3"
            >
              <div>
                <p className="font-medium">{c.title}</p>
                <p className="text-sm text-muted-foreground">
                  {c._count?.enrollments ?? 0} enrolled
                </p>
              </div>
              <Button asChild size="sm" variant="outline">
                <Link href={`/dashboard/admin/courses/${c.id}`}>Manage</Link>
              </Button>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
