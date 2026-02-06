"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BookOpen, Users, Star } from "lucide-react";

const topCourses = [
  {
    name: "React Fundamentals",
    students: 245,
    rating: 4.8,
    category: "Frontend",
  },
  {
    name: "Advanced JavaScript",
    students: 198,
    rating: 4.9,
    category: "Programming",
  },
  {
    name: "UI/UX Design Principles",
    students: 167,
    rating: 4.7,
    category: "Design",
  },
  {
    name: "Python for Beginners",
    students: 312,
    rating: 4.6,
    category: "Programming",
  },
];

export function TopCourses() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <BookOpen className="h-5 w-5" />
          Top Courses
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {topCourses.map((course, index) => (
            <div key={course.name} className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-primary font-semibold text-sm">
                  {index + 1}
                </div>
                <div>
                  <p className="font-medium text-sm">{course.name}</p>
                  <p className="text-xs text-muted-foreground">{course.category}</p>
                </div>
              </div>
              <div className="text-right">
                <div className="flex items-center gap-1 text-sm">
                  <Users className="h-3 w-3" />
                  {course.students}
                </div>
                <div className="flex items-center gap-1 text-xs text-muted-foreground">
                  <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                  {course.rating}
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}