export type StudentDashboard = {
  enrolledCourses: EnrolledCourseCard[];
  stats: {
    totalEnrolled: number;
    completedCourses: number;
    pendingAssessments: number;
  };
};

export type EnrolledCourseCard = {
  id: string;
  title: string;
  description: string | null;
  thumbnail: string | null;
  progress: number;
  enrolledAt: string;
  instructor: { name: string };
  nextModule: {
    id: string;
    title: string;
    type: string;
    order: number;
  } | null;
  upcomingLiveClass: {
    title: string;
    scheduledAt: string | null;
    zoomUrl: string | null;
  } | null;
};

export type CourseDetail = {
  course: {
    id: string;
    title: string;
    description: string | null;
    thumbnail: string | null;
    instructor: { name: string };
  };
  modules: CourseModule[];
  assessments: CourseAssessment[];
  progress: number;
};

export type CourseModule = {
  id: string;
  title: string;
  type: string;
  order: number;
  youtubeUrl: string | null;
  zoomUrl: string | null;
  content: string | null;
  isCompleted: boolean;
};

export type CourseAssessment = {
  id: string;
  title: string;
  description: string | null;
  deadline: string;
  isSubmitted: boolean;
  submission: { grade: number | null; submittedAt: string } | null;
};

export type ModuleDetail = {
  module: {
    id: string;
    title: string;
    type: string;
    youtubeUrl: string | null;
    zoomUrl: string | null;
    content: string | null;
    order: number;
    scheduledAt: string | null;
  };
  prevModuleId: string | null;
  nextModuleId: string | null;
  isCompleted: boolean;
};

export type AssessmentDetail = {
  assessment: {
    id: string;
    title: string;
    description: string | null;
    deadline: string;
  };
  submission: {
    textAnswer: string;
    submittedAt: string;
    grade: number | null;
    feedback: string | null;
  } | null;
};
