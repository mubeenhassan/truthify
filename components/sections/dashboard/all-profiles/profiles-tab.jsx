"use client";

import { useEffect, useRef, useState } from "react";
import { ChevronDown } from "lucide-react";
import ProfileCard from "@/components/ui/profile-card";

const MOCK_PROFILES = [
  {
    id: 1,
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
    id: 2,
    name: "Jensen Huang",
    title: "President of Nvidia",
    avatar: "/images/avatar-jensen.png",
    logo: "/icons/nvidia.svg",
    reportCount: 134,
    score: 8.2,
    industry: "Technology",
  },
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
];

const industryFilters = ["All Industries", "Technology", "Automotive"];
const sortOptions = [
  "High to Low",
  "Low to High",
  "Most Reports",
  "Least Reports",
];

export function ProfilesTab({
  title = "Available Profiles",
  subTitle = "Popular searches this week:",
  profiles = MOCK_PROFILES,
}) {
  const [selectedIndustry, setSelectedIndustry] = useState("All Industries");
  const [sortBy, setSortBy] = useState("");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [sortDropdownOpen, setSortDropdownOpen] = useState(false);

  const industryRef = useRef(null);
  const sortRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        industryRef.current &&
        !industryRef.current.contains(e.target)
      ) {
        setDropdownOpen(false);
      }
      if (
        sortRef.current &&
        !sortRef.current.contains(e.target)
      ) {
        setSortDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const filteredProfiles = profiles.filter((profile) =>
    selectedIndustry === "All Industries"
      ? true
      : profile.industry === selectedIndustry
  );

  const sortedProfiles = [...filteredProfiles].sort((a, b) => {
    switch (sortBy) {
      case "High to Low":
        return b.score - a.score;
      case "Low to High":
        return a.score - b.score;
      case "Most Reports":
        return b.reportCount - a.reportCount;
      case "Least Reports":
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
            {/* Industry Filter */}
            <div className="relative" ref={industryRef}>
              <button
                className="flex items-center justify-between w-40 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50"
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

            {/* Sort Dropdown */}
            <div className="relative" ref={sortRef}>
              <button
                className="flex items-center justify-between w-40 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50"
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

          {/* Title and Subtitle */}
          <div className="lg:absolute text-center lg:left-1/2 lg:transform lg:-translate-x-1/2 mb-6 lg:mb-0">
            <h2 className="text-xl font-semibold text-gray-800">{title}</h2>
            <p className="text-sm text-gray-500">{subTitle}</p>
          </div>
        </div>
      </div>

      {/* Profile Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-4 gap-y-14">
        {sortedProfiles.map((profile) => (
          <ProfileCard key={profile.id} profile={profile} variant="second" />
        ))}
      </div>
    </div>
  );
}
