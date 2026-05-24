"use client";

import Link from "next/link";
import { CheckCircle2, Circle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { CourseModule } from "@/types/dashboard";

const typeLabels: Record<string, string> = {
  video: "Video",
  live: "Live",
  assignment: "Assignment",
};

export function ModuleList({
  courseId,
  modules,
}: {
  courseId: string;
  modules: CourseModule[];
}) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Modules</CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        {modules.map((mod) => (
          <Link
            key={mod.id}
            href={`/dashboard/course/${courseId}/module/${mod.id}`}
            className="flex items-center gap-3 rounded-lg border p-3 hover:bg-muted/50 transition-colors"
          >
            {mod.isCompleted ? (
              <CheckCircle2 className="h-5 w-5 text-green-600 shrink-0" />
            ) : (
              <Circle className="h-5 w-5 text-muted-foreground shrink-0" />
            )}
            <div className="flex-1 min-w-0">
              <p className="font-medium truncate">{mod.title}</p>
              <span className="inline-block mt-1 text-xs bg-muted px-2 py-0.5 rounded">
                {typeLabels[mod.type] ?? mod.type}
              </span>
            </div>
          </Link>
        ))}
      </CardContent>
    </Card>
  );
}
