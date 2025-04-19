"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { ProfilesTab } from "@/components/sections/dashboard/unlock/profiles-tab";
import { ReportsTab } from "@/components/sections/dashboard/unlock/reports-tab";

export default function UnlockPage() {
  const [activeTab, setActiveTab] = useState("profiles");

  useEffect(() => {
    const hash = window.location.hash.replace("#", "");
    if (hash === "reports" || hash === "profiles") {
      setActiveTab(hash);
    }

    // Listen for hash changes
    const handleHashChange = () => {
      const newHash = window.location.hash.replace("#", "");
      if (newHash === "reports" || newHash === "profiles") {
        setActiveTab(newHash);
      }
    };

    window.addEventListener("hashchange", handleHashChange);
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);

  // Handle tab change
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
            type="button"
            onClick={() => handleTabChange("profiles")}
            className={`px-6 py-2 text-sm cursor-pointer font-medium rounded-l-lg ${
              activeTab === "profiles"
                ? "bg-blue-600 text-white"
                : "bg-white text-gray-700 hover:bg-gray-100"
            }`}
          >
            Profiles Available
          </button>
          <button
            type="button"
            onClick={() => handleTabChange("reports")}
            className={`px-6 py-2 cursor-pointer text-sm font-medium rounded-r-lg ${
              activeTab === "reports"
                ? "bg-blue-600 text-white"
                : "bg-white text-gray-700 hover:bg-gray-100"
            }`}
          >
            Reports Available
          </button>
        </div>
      </div>

      <div className="relative w-full flex flex-col-reverse lg:flex-row items-center lg:items-center justify-center py-6">
        <div className="lg:ml-auto lg:mr-6">
          {/* Filter and Sort Controls */}
          <div className="flex justify-end mb-6 gap-2">
            {activeTab === "profiles" && (
              <div className="relative">
                <button className="flex items-center justify-between w-fit px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none">
                  Filter by Industry
                  <svg
                    className="w-5 h-5 ml-2 -mr-1"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
              </div>
            )}

            <div className="relative">
              <button className="flex items-center justify-between w-32 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none">
                Sort By
                <svg
                  className="w-5 h-5 ml-2 -mr-1"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
        <div className="lg:absolute lg:left-1/2 lg:transform lg:-translate-x-1/2 mb-6 lg:mb-0">
          <h2 className="text-xl font-semibold text-gray-800">
            Available {activeTab === "profiles" ? "Profiles" : "Reports"}:
          </h2>
          <p className="text-sm text-gray-500">Popular searches this week:</p>
        </div>
      </div>

      <div className="flex w-full justify-between mb-6"></div>
      {activeTab === "profiles" ? <ProfilesTab /> : <ReportsTab />}
    </div>
  );
}
