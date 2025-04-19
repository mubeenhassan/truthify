"use client";

import { useEffect, useState } from "react";
import { ChevronDown } from "lucide-react";
import { ReportCard } from "@/components/ui/report-card";

const reportsData = [
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
  "Date: Latest to Oldest",
  "Date: Oldest to Latest",
  "Title: A to Z",
  "Title: Z to A",
];

export function ReportsTab() {
  const [sortBy, setSortBy] = useState("");
  const [sortDropdownOpen, setSortDropdownOpen] = useState(false);

  const sortedReports = [...reportsData].sort((a, b) => {
    switch (sortBy) {
      case "Date: Latest to Oldest":
        return new Date(b.date) - new Date(a.date);
      case "Date: Oldest to Latest":
        return new Date(a.date) - new Date(b.date);
      case "Title: A to Z":
        return a.title.localeCompare(b.title);
      case "Title: Z to A":
        return b.title.localeCompare(a.title);
      default:
        return 0;
    }
  });

  return (
    <div className="w-full max-w-6xl">
      <div className="relative w-full flex flex-col-reverse lg:flex-row items-center lg:items-center justify-center py-6">
        <div className="flex gap-2 lg:ml-auto lg:mr-6">
          <div className="flex justify-between items-center mb-6">
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
        </div>

        <div className="lg:absolute lg:left-1/2 lg:transform lg:-translate-x-1/2 mb-6 lg:mb-0">
          <h2 className="text-xl font-semibold text-gray-800">
            Available Reports
          </h2>
          <p className="text-sm text-gray-500">Popular searches this week:</p>
        </div>
      </div>

      {/* Report Cards */}
      <div className="grid w-full grid-cols-1 md:grid-cols-2 gap-6">
        {sortedReports.map((report) => (
          <ReportCard key={report.id} report={report} />
        ))}
      </div>
    </div>
  );
}
