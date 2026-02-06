"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BookOpen, Users, TrendingUp, DollarSign } from "lucide-react";

interface StatData {
  totalCourses: number;
  activeStudents: number;
  revenue: number;
  completionRate: number;
}

const statConfigs = [
  {
    key: "totalCourses" as keyof StatData,
    title: "Total Courses",
    icon: BookOpen,
    color: "text-blue-600",
    formatter: (value: number) => value.toString(),
    change: "+12%",
  },
  {
    key: "activeStudents" as keyof StatData,
    title: "Active Students",
    icon: Users,
    color: "text-green-600",
    formatter: (value: number) => value.toLocaleString(),
    change: "+8%",
  },
  {
    key: "revenue" as keyof StatData,
    title: "Revenue",
    icon: DollarSign,
    color: "text-purple-600",
    formatter: (value: number) => `$${value.toLocaleString()}`,
    change: "+23%",
  },
  {
    key: "completionRate" as keyof StatData,
    title: "Completion Rate",
    icon: TrendingUp,
    color: "text-orange-600",
    formatter: (value: number) => `${value}%`,
    change: "+5%",
  },
];

export function StatCards() {
  const [stats, setStats] = useState<StatData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await fetch('/api/dashboard/stats');
        if (response.ok) {
          const data = await response.json();
          setStats(data);
        } else {
          const errorData = await response.json().catch(() => ({}));
          setError(errorData.error || `HTTP ${response.status}: ${response.statusText}`);
        }
      } catch (error) {
        console.error('Failed to fetch stats:', error);
        setError('Network error: Unable to connect to server');
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {Array.from({ length: 4 }).map((_, i) => (
          <Card key={i}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <div className="h-4 bg-gray-200 rounded animate-pulse" />
              <div className="h-4 w-4 bg-gray-200 rounded animate-pulse" />
            </CardHeader>
            <CardContent>
              <div className="h-8 bg-gray-200 rounded animate-pulse mb-2" />
              <div className="h-3 bg-gray-200 rounded animate-pulse" />
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statConfigs.map((config) => (
          <Card key={config.title} className="border-red-200">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-red-600">
                {config.title}
              </CardTitle>
              <config.icon className="h-4 w-4 text-red-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-600">
                --
              </div>
              <p className="text-xs text-red-500">
                Unable to load data
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {statConfigs.map((config) => (
        <Card key={config.title}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              {config.title}
            </CardTitle>
            <config.icon className={`h-4 w-4 ${config.color}`} />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {config.formatter(stats![config.key])}
            </div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600">{config.change}</span>
              {" "}from last month
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}