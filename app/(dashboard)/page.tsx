import { DashboardBreadcrumb } from "@/components/dashboard/DashboardBreadcrumb";
import { StatCards } from "@/components/dashboard/StatCards";
import { RecentActivity } from "@/components/dashboard/RecentActivity";
import { CourseOverview } from "@/components/dashboard/CourseOverview";
import { TopCourses } from "@/components/dashboard/TopCourses";
import { StudentProgress } from "@/components/dashboard/StudentProgress";
import { CourseActivityCard } from "@/components/dashboard/CourseActivityCard";

export default function DashboardPage() {
  return (
    <>
      <DashboardBreadcrumb title="LMS Dashboard" />

      <div className="grid grid-cols-1 2xl:grid-cols-12 gap-6">
        {/* Stats Cards */}
        <div className="col-span-12">
          <StatCards />
        </div>

        {/* Course Overview Chart */}
        <div className="col-span-12 2xl:col-span-8">
          <CourseOverview />
        </div>

        {/* Recent Activity */}
        <div className="col-span-12 2xl:col-span-4">
          <RecentActivity />
        </div>

        {/* Top Performing Courses */}
        <div className="col-span-12 md:col-span-6 2xl:col-span-4">
          <TopCourses />
        </div>

        {/* Student Progress */}
        <div className="col-span-12 md:col-span-6 2xl:col-span-4">
          <StudentProgress />
        </div>

        {/* Course Activity Chart */}
        <div className="col-span-12 2xl:col-span-4">
          <CourseActivityCard />
        </div>
      </div>
    </>
  );
}