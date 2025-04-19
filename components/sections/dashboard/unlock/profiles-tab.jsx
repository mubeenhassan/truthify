"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { ChevronDown } from "lucide-react";

const MOCK_PROFILES = [
  {
    id: 1,
    name: "Satya Nadella",
    title: "CEO of Microsoft",
    avatar: "/images/avatar-satya.png",
    logo: "/icons/microsoft.svg",
    reportCount: 238,
    score: 78,
    industry: "Technology",
    isLocked: true,
  },
  {
    id: 2,
    name: "Jensen Huang",
    title: "President of Nvidia",
    avatar: "/images/avatar-jensen.png",
    logo: "/icons/nvidia.svg",
    reportCount: 134,
    score: 82,
    industry: "Technology",
  },
  {
    id: 3,
    name: "Sundar Pichai",
    title: "CEO of Google",
    avatar: "/images/avatar-sundar.png",
    logo: "/icons/google-color.svg",
    reportCount: 195,
    score: 75,
    industry: "Technology",
  },
  {
    id: 4,
    name: "Elon Musk",
    title: "CEO of Tesla",
    avatar: "/images/avatar-elon.png",
    logo: "/images/tesla.png",
    reportCount: 310,
    score: 63,
    industry: "Automotive",
  },
];

const industryFilters = ["All Industries", "Technology", "Automotive"];
const sortOptions = [
  "Score: High to Low",
  "Score: Low to High",
  "Reports: Most",
  "Reports: Least",
];

export function ProfilesTab() {
  const [selectedIndustry, setSelectedIndustry] = useState("All Industries");
  const [sortBy, setSortBy] = useState("");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [sortDropdownOpen, setSortDropdownOpen] = useState(false);

  const filteredProfiles = MOCK_PROFILES.filter((profile) =>
    selectedIndustry === "All Industries"
      ? true
      : profile.industry === selectedIndustry
  );

  const sortedProfiles = [...filteredProfiles].sort((a, b) => {
    switch (sortBy) {
      case "Score: High to Low":
        return b.score - a.score;
      case "Score: Low to High":
        return a.score - b.score;
      case "Reports: Most":
        return b.reportCount - a.reportCount;
      case "Reports: Least":
        return a.reportCount - b.reportCount;
      default:
        return 0;
    }
  });

  return (
    <div className="w-full max-w-6xl">
      <div className="flex gap-2 justify-between items-center mb-6 ">
        <div className="relative w-full flex flex-col-reverse lg:flex-row items-center lg:items-center justify-center py-6">
          <div className="flex gap-2 lg:ml-auto lg:mr-6">
            <div className="relative">
              <button
                className="flex items-center justify-between w-48 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50"
                onClick={() => setDropdownOpen(!dropdownOpen)}
              >
                {selectedIndustry || "Filter by Industry"}
                <ChevronDown className="w-5 h-5 ml-2 -mr-1" />
              </button>
              {dropdownOpen && (
                <div className="absolute z-10 mt-1 w-full bg-white shadow-lg rounded-md">
                  <ul className="py-1 text-sm text-gray-700">
                    {industryFilters.map((filter, index) => (
                      <li key={index}>
                        <button
                          className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                          onClick={() => {
                            setSelectedIndustry(filter);
                            setDropdownOpen(false);
                          }}
                        >
                          {filter}
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
            <div className="relative">
              <button
                className="flex items-center justify-between w-48 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50"
                onClick={() => setSortDropdownOpen(!sortDropdownOpen)}
              >
                {sortBy || "Sort By"}
                <ChevronDown className="w-5 h-5 ml-2 -mr-1" />
              </button>
              {sortDropdownOpen && (
                <div className="absolute z-10 mt-1 w-full bg-white shadow-lg rounded-md">
                  <ul className="py-1 text-sm text-gray-700">
                    {sortOptions.map((option, index) => (
                      <li key={index}>
                        <button
                          className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                          onClick={() => {
                            setSortBy(option);
                            setSortDropdownOpen(false);
                          }}
                        >
                          {option}
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
          <div className="lg:absolute lg:left-1/2 lg:transform lg:-translate-x-1/2 mb-6 lg:mb-0">
            <h2 className="text-xl font-semibold text-gray-800">
              Available Profiles
            </h2>
            <p className="text-sm text-gray-500">Popular searches this week:</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {sortedProfiles.map((profile) => (
          <ProfileCard key={profile.id} profile={profile} />
        ))}
      </div>
    </div>
  );
}

function ProfileCard({ profile }) {
  return (
    <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
      <div className="p-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="h-12 w-12 rounded-full overflow-hidden">
            <Image
              src={profile.avatar || "/placeholder.svg?height=48&width=48"}
              alt={profile.name || "Profile"}
              width={48}
              height={48}
              className="h-full w-full object-cover"
            />
          </div>
          <div>
            <h3 className="font-semibold text-gray-900">{profile.name}</h3>
            <p className="text-sm text-gray-500">{profile.title}</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Image
            src={profile.logo || "/placeholder.svg?height=24&width=24"}
            alt={profile.name || "Company"}
            width={24}
            height={24}
            className="h-6 w-6 object-contain"
          />
          <div className="flex items-center justify-center h-10 w-10 bg-gray-200 rounded-full">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 text-gray-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
              />
            </svg>
          </div>
        </div>
      </div>
      <div className="px-4 pb-4 text-sm">
        <span className="text-gray-600">
          {profile.reportCount} Reports Available
        </span>
      </div>
    </div>
  );
}
