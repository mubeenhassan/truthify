"use client";

import { useEffect, useState } from "react";
import { ProfilesTab } from "@/components/sections/dashboard/unlock/profiles-tab";

const PROFILES_AVAILABLE = [
  {
    id: 14,
    name: "Elon Musk",
    title: "CEO of Tesla",
    avatar: "/images/avatar-elon.png",
    logo: "/images/tesla.png",
    reportCount: 310,
    score: 6.3,
    industry: "Automotive",
  },
  {
    id: 21,
    name: "Satya Nadella",
    title: "CEO of Microsoft",
    avatar: "/images/avatar-satya.png",
    logo: "/icons/microsoft.svg",
    reportCount: 238,
    score: 7.8,
    industry: "Technology",
    isLocked: true,
  },
  {
    id: 42,
    name: "Jensen Huang",
    title: "President of Nvidia",
    avatar: "/images/avatar-jensen.png",
    logo: "/icons/nvidia.svg",
    reportCount: 134,
    score: 8.2,
    industry: "Technology",
  },
  {
    id: 13,
    name: "Sundar Pichai",
    title: "CEO of Google",
    avatar: "/images/avatar-sundar.png",
    logo: "/icons/google-color.svg",
    reportCount: 195,
    score: 7.5,
    industry: "Technology",
  },
];

const PROFILES_CREATED = [
  {
    id: 3,
    name: "Sundar Pichai",
    title: "CEO of Google",
    avatar: "/images/avatar-sundar.png",
    logo: "/icons/google-color.svg",
    reportCount: 195,
    score: 7.5,
    industry: "Technology",
  },
  {
    id: 4,
    name: "Elon Musk",
    title: "CEO of Tesla",
    avatar: "/images/avatar-elon.png",
    logo: "/images/tesla.png",
    reportCount: 310,
    score: 6.3,
    industry: "Automotive",
  },
  {
    id: 11,
    name: "Satya Nadella",
    title: "CEO of Microsoft",
    avatar: "/images/avatar-satya.png",
    logo: "/icons/microsoft.svg",
    reportCount: 238,
    score: 7.8,
    industry: "Technology",
    isLocked: true,
  },
  {
    id: 21,
    name: "Jensen Huang",
    title: "President of Nvidia",
    avatar: "/images/avatar-jensen.png",
    logo: "/icons/nvidia.svg",
    reportCount: 134,
    score: 8.2,
    industry: "Technology",
  },
];

export default function MyProfilesPage() {
  const [activeTab, setActiveTab] = useState("available");

  useEffect(() => {
    const hash = window.location.hash.split("?")[0].replace("#", "");
    if (hash === "available" || hash === "created") {
      setActiveTab(hash);
    }

    const handleHashChange = () => {
      const hash = window.location.hash.split("?")[0].replace("#", "");
      if (hash === "available" || hash === "created") {
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
            onClick={() => handleTabChange("available")}
            className={`px-6 py-2 text-sm cursor-pointer font-medium rounded-l-lg ${
              activeTab === "available"
                ? "bg-blue-600 text-white"
                : "bg-white text-gray-700 hover:bg-gray-100"
            }`}
          >
            Profiles Available
          </button>
          <button
            onClick={() => handleTabChange("created")}
            className={`px-6 py-2 text-sm cursor-pointer font-medium rounded-r-lg ${
              activeTab === "created"
                ? "bg-blue-600 text-white"
                : "bg-white text-gray-700 hover:bg-gray-100"
            }`}
          >
            Profiles Created
          </button>
        </div>
      </div>

      {activeTab === "available" ? (
        <ProfilesTab
          title="Your Available Profiles"
          subTitle="Dive in to detailed insights of your available profiles"
          profiles={PROFILES_AVAILABLE}
        />
      ) : (
        <ProfilesTab
          title="Your Created Profiles"
          subTitle="Dive in to detailed insights of your created profiles"
          profiles={PROFILES_CREATED}
        />
      )}
    </div>
  );
}
