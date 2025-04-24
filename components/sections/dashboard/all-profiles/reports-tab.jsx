"use client";

import { useState, useRef, useEffect } from "react";
import { ChevronDown } from "lucide-react";
import { ReportCard } from "@/components/ui/report-card";

const MOCK_REPORTS = [
  {
    id: 1,
    title: "The Future of AI: Innovations and Challenges",
    speaker: "Elon Musk",
    source: "YouTube",
    date: "2022-05-12",
    customDate: "May 12, 2022",
    isLocked: true,
  },
  {
    id: 2,
    title: "Tech Giants: Who Will Dominate in 2025?",
    speaker: "Sundar Pichai",
    source: "Vimeo",
    date: "2023-02-18",
    customDate: "Feb 18, 2023",
    isLocked: false,
  },
  {
    id: 3,
    title: "The Evolution of Quantum Computing",
    speaker: "Jensen Huang",
    source: "TED Talks",
    date: "2023-01-25",
    customDate: "Jan 25, 2023",
    isLocked: true,
  },
  {
    id: 4,
    title: "Exploring the Metaverse: The Next Frontier",
    speaker: "Mark Zuckerberg",
    source: "Facebook Live",
    date: "2021-12-10",
    customDate: "Dec 10, 2021",
    isLocked: false,
  },
  {
    id: 5,
    title: "SpaceX's Next Mission: Mars Colonization",
    speaker: "Elon Musk",
    source: "SpaceX Event",
    date: "2022-08-07",
    customDate: "Aug 7, 2022",
    isLocked: true,
  },
  {
    id: 6,
    title: "The Rise of Electric Vehicles and Sustainability",
    speaker: "Mary Barra",
    source: "YouTube",
    date: "2022-11-02",
    customDate: "Nov 2, 2022",
    isLocked: false,
  },
  {
    id: 7,
    title: "Blockchain Beyond Crypto: Use Cases in 2023",
    speaker: "Vitalik Buterin",
    source: "Crypto Summit",
    date: "2023-03-15",
    customDate: "Mar 15, 2023",
    isLocked: false,
  },
  {
    id: 8,
    title: "AI and Data Privacy: A Delicate Balance",
    speaker: "Satya Nadella",
    source: "Microsoft Keynote",
    date: "2022-10-25",
    customDate: "Oct 25, 2022",
    isLocked: true,
  },
];

const sortOptions = [
  "Latest to Oldest",
  "Oldest to Latest",
  "A to Z",
  "Z to A",
];

export function ReportsTab({
  title = "Available Reports",
  subTitle = "Popular reports this week:",
  reports = MOCK_REPORTS,
}) {
  const [sortBy, setSortBy] = useState("");
  const [sortDropdownOpen, setSortDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setSortDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const filter = params.get("filter");
  
    switch (filter) {
      case "new":
        setSortBy("Latest to Oldest");
        break;
      case "old":
        setSortBy("Oldest to Latest");
        break;
      case "az":
        setSortBy("A to Z");
        break;
      case "za":
        setSortBy("Z to A");
        break;
      default:
        break;
    }
  }, []);
  

  const sortedReports = [...reports].sort((a, b) => {
    switch (sortBy) {
      case "Latest to Oldest":
        return new Date(b.date) - new Date(a.date);
      case "Oldest to Latest":
        return new Date(a.date) - new Date(b.date);
      case "A to Z":
        return a.title.localeCompare(b.title);
      case "Z to A":
        return b.title.localeCompare(a.title);
      default:
        return 0;
    }
  });

  return (
    <div className="w-full max-w-6xl">
      <div className="relative w-full flex flex-col-reverse lg:flex-row items-center lg:items-center justify-center py-6">
        <div className="flex gap-2 lg:ml-auto lg:mr-6">
          <div
            className="flex justify-between items-center mb-6"
            ref={dropdownRef}
          >
            <div className="relative">
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
        </div>

        <div className="lg:absolute text-center lg:left-1/2 lg:transform lg:-translate-x-1/2 mb-6 lg:mb-0">
          <h2 className="text-xl font-semibold text-gray-800">{title}</h2>
          <p className="text-sm text-gray-500">{subTitle}</p>
        </div>
      </div>

      <div className="grid w-full grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-8">
        {sortedReports.map((report) => (
          <ReportCard key={report.id} report={report} />
        ))}
      </div>
    </div>
  );
}
