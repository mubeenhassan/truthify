"use client";

import { useEffect, useState } from "react";
import { ProfilesTab } from "@/components/sections/dashboard/all-profiles/profiles-tab";
import { ReportsTab } from "@/components/sections/dashboard/all-profiles/reports-tab";

export default function AllProfiles() {
  const [activeTab, setActiveTab] = useState("profiles");

  useEffect(() => {
    const hash = window.location.hash.split("?")[0].replace("#", "");
    if (hash === "profiles" || hash === "reports") {
      setActiveTab(hash);
    }

    const handleHashChange = () => {
      const hash = window.location.hash.split("?")[0].replace("#", "");
      if (hash === "profiles" || hash === "reports") {
        setActiveTab(hash);
      }
    };

    window.addEventListener("hashchange", handleHashChange);
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    window.location.hash = tab;
  };

  return (
    <div className="w-full bg-slate-50 min-h-screen p-8 flex flex-col items-center">
      {/* Tabs */}
      <div className="flex mb-6">
        <div className="inline-flex rounded-md shadow-sm" role="group">
          <button
            onClick={() => handleTabChange("profiles")}
            className={`px-6 py-2 text-sm cursor-pointer font-medium rounded-l-lg ${
              activeTab === "profiles"
                ? "bg-blue-600 text-white"
                : "bg-white text-gray-700 hover:bg-gray-100"
            }`}
          >
            Profiles Available
          </button>
          {/* <button
            onClick={() => handleTabChange("reports")}
            className={`px-6 py-2 text-sm cursor-pointer font-medium rounded-r-lg ${
              activeTab === "reports"
                ? "bg-blue-600 text-white"
                : "bg-white text-gray-700 hover:bg-gray-100"
            }`}
          >
            Reports Available
          </button> */}
        </div>
      </div>

      {activeTab === "profiles" ? <ProfilesTab /> : <ReportsTab />}
    </div>
  );
}
