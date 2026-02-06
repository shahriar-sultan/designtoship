"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { TrendingUp } from "lucide-react";

const studentProgress = [
  {
    name: "John Doe",
    course: "React Fundamentals",
    progress: 85,
    status: "On Track",
  },
  {
    name: "Jane Smith",
    course: "Advanced JavaScript",
    progress: 72,
    status: "Good Progress",
  },
  {
    name: "Mike Johnson",
    course: "UI/UX Design",
    progress: 91,
    status: "Excellent",
  },
  {
    name: "Sarah Wilson",
    course: "Python Basics",
    progress: 68,
    status: "Needs Attention",
  },
];

export function StudentProgress() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <TrendingUp className="h-5 w-5" />
          Student Progress
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {studentProgress.map((student) => (
            <div key={`${student.name}-${student.course}`} className="space-y-2">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-sm">{student.name}</p>
                  <p className="text-xs text-muted-foreground">{student.course}</p>
                </div>
                <span className={`text-xs px-2 py-1 rounded-full ${
                  student.status === 'Excellent' ? 'bg-green-100 text-green-800' :
                  student.status === 'On Track' ? 'bg-blue-100 text-blue-800' :
                  student.status === 'Good Progress' ? 'bg-yellow-100 text-yellow-800' :
                  'bg-red-100 text-red-800'
                }`}>
                  {student.status}
                </span>
              </div>
              <Progress value={student.progress} className="h-2" />
              <p className="text-xs text-muted-foreground">
                {student.progress}% complete
              </p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}