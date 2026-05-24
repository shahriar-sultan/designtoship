"use client";

import * as React from "react";
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarFooter,
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { DashboardSidebar } from "@/components/dashboard/Sidebar";

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const [collapsed, setCollapsed] = React.useState(false);

  return (
    <Sidebar className="hidden md:block" {...props}>
      <SidebarHeader className="p-4">
        <div className="flex items-center justify-between w-full">
          {!collapsed && (
            <h2 className="text-lg font-semibold">My Learning</h2>
          )}
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setCollapsed(!collapsed)}
            className="h-8 w-8 p-0"
          >
            {collapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
          </Button>
        </div>
      </SidebarHeader>

      <SidebarContent>
        <DashboardSidebar collapsed={collapsed} />
      </SidebarContent>

      <SidebarFooter className="p-2 md:hidden" />
    </Sidebar>
  );
}
