"use client";

import { useEffect, useState } from "react";
import { ReportsTab } from "@/components/sections/dashboard/unlock/reports-tab";

const REPORTS_AVAILABLE = [
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

const REPORTS_CREATED = [
  {
    id: 54,
    title: "Exploring the Metaverse: The Next Frontier",
    speaker: "Mark Zuckerberg",
    source: "Facebook Live",
    date: "2021-12-10",
    customDate: "Dec 10, 2021",
    isLocked: false,
  },
  {
    id: 35,
    title: "SpaceX's Next Mission: Mars Colonization",
    speaker: "Elon Musk",
    source: "SpaceX Event",
    date: "2022-08-07",
    customDate: "Aug 7, 2022",
    isLocked: false,
  },
  {
    id: 63,
    title: "The Rise of Electric Vehicles and Sustainability",
    speaker: "Mary Barra",
    source: "YouTube",
    date: "2022-11-02",
    customDate: "Nov 2, 2022",
    isLocked: false,
  },
  {
    id: 11,
    title: "The Future of AI: Innovations and Challenges",
    speaker: "Elon Musk",
    source: "YouTube",
    date: "2022-05-12",
    customDate: "May 12, 2022",
    isLocked: false,
  },
  {
    id: 72,
    title: "Tech Giants: Who Will Dominate in 2025?",
    speaker: "Sundar Pichai",
    source: "Vimeo",
    date: "2023-02-18",
    customDate: "Feb 18, 2023",
    isLocked: false,
  },
  {
    id: 93,
    title: "The Evolution of Quantum Computing",
    speaker: "Jensen Huang",
    source: "TED Talks",
    date: "2023-01-25",
    customDate: "Jan 25, 2023",
    isLocked: false,
  },
  {
    id: 71,
    title: "Blockchain Beyond Crypto: Use Cases in 2023",
    speaker: "Vitalik Buterin",
    source: "Crypto Summit",
    date: "2023-03-15",
    customDate: "Mar 15, 2023",
    isLocked: false,
  },
  {
    id: 81,
    title: "AI and Data Privacy: A Delicate Balance",
    speaker: "Satya Nadella",
    source: "Microsoft Keynote",
    date: "2022-10-25",
    customDate: "Oct 25, 2022",
    isLocked: false,
  },
];

export default function MyReportsPage() {
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
            Reports Available
          </button>
          <button
            onClick={() => handleTabChange("created")}
            className={`px-6 py-2 text-sm cursor-pointer font-medium rounded-r-lg ${
              activeTab === "created"
                ? "bg-blue-600 text-white"
                : "bg-white text-gray-700 hover:bg-gray-100"
            }`}
          >
            Reports Created
          </button>
        </div>
      </div>

      {activeTab === "available" ? (
        <ReportsTab
          title="Your Available Reports"
          subTitle="Dive in to detailed insights of your available reports"
          reports={REPORTS_AVAILABLE}
        />
      ) : (
        <ReportsTab
          title="Your Created Reports"
          subTitle="Dive in to detailed insights of your created reports"
          reports={REPORTS_CREATED}
        />
      )}
    </div>
  );
}
