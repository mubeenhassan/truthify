"use client";

import { useState } from "react";
import Sidebar from "@/components/sections/global/dashboard/sidebar/sidebar";
import MobileSidebar from "@/components/sections/global/dashboard/sidebar/mobile-sidebar";
import Topbar from "@/components/sections/global/dashboard/topbar/topbar";

export default function DashboardPageLayout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen bg-gray-50">
      <div className="hidden md:flex md:w-64 md:flex-col md:fixed md:inset-y-0">
        <Sidebar />
      </div>

      {/* Mobile sidebar */}
      <MobileSidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      {/* Main content */}
      <div className="md:ml-64 flex flex-col flex-1">
        <Topbar onMenuClick={() => setSidebarOpen(true)} />
        <main className="flex-1 px-4 overflow-auto bg-white">{children}</main>
      </div>
    </div>
  );
}
