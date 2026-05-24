"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { DashboardBreadcrumb } from "@/components/dashboard/DashboardBreadcrumb";
import type { StudentDashboard } from "@/types/dashboard";
import Loading from "@/components/Loading";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

export default function MyCoursesPage() {
  const [data, setData] = useState<StudentDashboard | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/dashboard/student")
      .then(async (res) => {
        const json = await res.json();
        if (!res.ok) throw new Error(json.error ?? "Failed to load");
        setData(json.data ?? json);
      })
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center py-20">
        <Loading />
      </div>
    );
  }

  if (error) {
    return (
      <div>
        <DashboardBreadcrumb title="My Courses" />
        <p className="text-destructive">{error}</p>
      </div>
    );
  }

  const courses = data?.enrolledCourses ?? [];

  return (
    <div>
      <DashboardBreadcrumb title="My Courses" />

      {data?.stats && (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
          <Stat label="Enrolled" value={data.stats.totalEnrolled} />
          <Stat label="Completed" value={data.stats.completedCourses} />
          <Stat label="Pending assessments" value={data.stats.pendingAssessments} />
        </div>
      )}

      {courses.length === 0 ? (
        <Card>
          <CardContent className="py-12 text-center text-muted-foreground">
            You are not enrolled in any courses yet. Contact admin.
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {courses.map((course) => (
            <Link key={course.id} href={`/dashboard/course/${course.id}`}>
              <Card className="h-full hover:shadow-md transition-shadow overflow-hidden">
                {course.thumbnail && (
                  <div className="relative h-40 w-full bg-muted">
                    <Image
                      src={course.thumbnail}
                      alt=""
                      fill
                      className="object-cover"
                      unoptimized
                    />
                  </div>
                )}
                <CardHeader>
                  <CardTitle className="text-lg line-clamp-2">
                    {course.title}
                  </CardTitle>
                  <p className="text-sm text-muted-foreground">
                    {course.instructor.name}
                  </p>
                </CardHeader>
                <CardContent>
                  <div className="flex justify-between text-sm mb-2">
                    <span>Progress</span>
                    <span>{Math.round(course.progress)}%</span>
                  </div>
                  <Progress value={course.progress} />
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

function Stat({ label, value }: { label: string; value: number }) {
  return (
    <Card>
      <CardContent className="pt-6">
        <p className="text-sm text-muted-foreground">{label}</p>
        <p className="text-2xl font-bold">{value}</p>
      </CardContent>
    </Card>
  );
}
