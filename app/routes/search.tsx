// app/routes/search.tsx
import type { LoaderFunctionArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import {
  Form,
  Link,
  useLoaderData,
  useMatch,
  useSearchParams,
} from "@remix-run/react";
import React, { useState, useEffect, useRef } from "react"; // Added useState, useEffect, useRef

// --- Type Definition ---
interface Report {
  id: string;
  title: string;
  speaker: string;
  date: string; // Keep as string, parse for sorting
  source: string;
  customInfo: string;
  popularity: number; // Add popularity for sorting
}

// --- Report Card Component (No changes needed) ---
interface ReportCardProps {
  report: Report;
}
function ReportCard({ report }: ReportCardProps) {
  // ... (ReportCard code remains the same)
  return (
    <div className="w-full h-auto p-4 bg-[radial-gradient(ellipse_106.61%_104.03%_at_92.74%_95.29%,_#F1F6FA_0%,_white_100%)] rounded-xl border border-slate-200 flex items-start gap-4 relative shadow-sm">
      <div className="absolute top-3 right-3">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-5 h-5 text-gray-400"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z"
          />
        </svg>
      </div>
      <div className="w-14 h-14 flex items-center justify-center flex-shrink-0">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-9 h-11 text-sky-600"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z"
          />
        </svg>
      </div>
      <div className="flex-1 flex flex-col gap-1">
        <h3 className="text-zinc-800 text-lg font-semibold font-['Inter'] leading-tight">
          {report.title}
        </h3>
        <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm opacity-80">
          <div className="w-full sm:w-auto">
            <span className="text-zinc-800 font-normal font-['Inter']">
              Main Speaker:{" "}
            </span>
            <span className="text-zinc-800 font-bold font-['Inter']">
              {report.speaker}
            </span>
          </div>
          <div className="w-full sm:w-auto">
            <span className="text-zinc-800 font-normal font-['Inter']">
              Date:{" "}
            </span>
            <span className="text-zinc-800 font-semibold font-['Inter']">
              {report.date}
            </span>
          </div>
          <div className="w-full sm:w-auto">
            <span className="text-zinc-800 font-normal font-['Inter']">
              Source:{" "}
            </span>
            <span className="text-zinc-800 font-semibold font-['Inter']">
              {report.source}
            </span>
          </div>
          <div className="w-full sm:w-auto">
            <span className="text-zinc-800 font-normal font-['Inter']">
              Custom:{" "}
            </span>
            <span className="text-zinc-800 font-semibold font-['Inter']">
              {report.customInfo}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

// --- Sidebar NavLink Wrapper (Copied from dashboard.tsx) ---
function SidebarNavLink({
  /* ... props ... */ to,
  end = false,
  children,
  iconSrc,
}: {
  to: string;
  end?: boolean;
  children: React.ReactNode;
  iconSrc: string;
}) {
  // ... (SidebarNavLink code remains the same)
  const match = useMatch({ path: to, end: end });
  const isActive = !!match;
  const activeClassName = "text-sky-600 bg-sky-50 font-semibold";
  const inactiveClassName =
    "text-zinc-600 hover:text-zinc-900 hover:bg-gray-50 font-medium";
  const baseIconClass = "mr-3 flex-shrink-0 h-5 w-5";
  const activeIconClass = "text-sky-600";
  const inactiveIconClass = "text-gray-400 group-hover:text-gray-500";

  return (
    <Link
      to={to}
      className={`group flex items-center px-3 py-2.5 text-sm rounded-md relative ${
        isActive ? activeClassName : inactiveClassName
      }`}
    >
      <img
        src={iconSrc}
        className={`${baseIconClass} ${
          isActive ? activeIconClass : inactiveIconClass
        }`}
        aria-hidden="true"
      />
      {children}
      {isActive && (
        <div className="absolute right-0 inset-y-1 w-1 bg-sky-600 rounded-l-lg"></div>
      )}
    </Link>
  );
}

// --- Mock Data (Added popularity) ---
const MOCK_REPORTS: Report[] = Array.from({ length: 10 }, (_, i) => ({
  id: `report-${i + 1}`,
  title: `Report Title ${i + 1}`,
  speaker: i % 3 === 0 ? "Jensen H." : i % 3 === 1 ? "Alex K." : "Maria S.",
  // Ensure date format is consistent and parsable (e.g., 'Month Day Year')
  date: `Feb ${10 + i} 2025`,
  source: i % 2 === 0 ? "Youtube" : "Internal Upload",
  customInfo: `Custom Info ${i + 1}`,
  popularity: Math.floor(Math.random() * 1000) + i * 10, // Random popularity + index bias
}));

// --- Server-Side Loader (Handles Sorting) ---
export async function loader({ request }: LoaderFunctionArgs) {
  const url = new URL(request.url);
  const query = url.searchParams.get("q")?.toLowerCase();
  const sort = url.searchParams.get("sort") || "recent"; // Default sort: 'recent'

  console.log("Search Query:", query);
  console.log("Sort By:", sort);

  let reports = MOCK_REPORTS;

  // 1. Filter first
  if (query) {
    reports = reports.filter(
      (report) =>
        report.title.toLowerCase().includes(query) ||
        report.speaker.toLowerCase().includes(query) ||
        report.source.toLowerCase().includes(query)
    );
  }

  // 2. Then Sort
  // Helper to parse date strings - handle potential errors
  const parseReportDate = (dateString: string): Date | null => {
    try {
      // Attempt to parse common formats like "Month Day Year"
      const date = new Date(dateString);
      // Check if the date is valid
      if (!isNaN(date.getTime())) {
        return date;
      }
    } catch (e) {
      console.error(`Error parsing date: ${dateString}`, e);
    }
    return null; // Return null for invalid dates
  };

  reports.sort((a, b) => {
    switch (sort) {
      case "popular":
        return b.popularity - a.popularity; // Descending popularity
      case "oldest": {
        const dateA = parseReportDate(a.date);
        const dateB = parseReportDate(b.date);
        if (dateA && dateB) return dateA.getTime() - dateB.getTime(); // Ascending date
        if (dateA) return -1; // Place valid dates first
        if (dateB) return 1;
        return 0; // Keep order if both invalid
      }
      case "recent": // Fallthrough default
      default: {
        const dateA = parseReportDate(a.date);
        const dateB = parseReportDate(b.date);
        if (dateA && dateB) return dateB.getTime() - dateA.getTime(); // Descending date
        if (dateA) return -1; // Place valid dates first
        if (dateB) return 1;
        return 0; // Keep order if both invalid
      }
    }
  });

  return json({ reports });
}

// --- Client-Side Page Component ---
export default function SearchPage() {
  const { reports } = useLoaderData<typeof loader>();
  const [searchParams] = useSearchParams();
  const currentQuery = searchParams.get("q") || "";
  const currentSort = searchParams.get("sort") || "recent"; // Get current sort, default to recent
  const inactiveClassName =
    "text-zinc-600 hover:text-zinc-900 hover:bg-gray-50 font-medium";

  // State for dropdown visibility
  const [isSortDropdownOpen, setIsSortDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null); // Ref for dropdown container

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsSortDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownRef]);

  // Helper to create sort links, preserving other params like 'q'
  const createSortLink = (sortValue: string) => {
    const newSearchParams = new URLSearchParams(searchParams);
    newSearchParams.set("sort", sortValue);
    // Keep 'q' parameter if it exists
    if (!searchParams.has("q")) {
      newSearchParams.delete("q"); // Avoid q= if it was empty
    }
    return `/search?${newSearchParams.toString()}`;
  };

  return (
    // --- Main Layout Structure (Copied from dashboard.tsx) ---
    <div className="flex h-screen overflow-hidden bg-slate-50 font-['Inter']">
      {/* --- Sidebar (Copied from dashboard.tsx, uses SidebarNavLink) --- */}
      <div className="hidden md:flex md:w-64 md:flex-col md:fixed md:inset-y-0">
        {/* ... (Sidebar code remains the same) ... */}
        <div className="flex flex-col flex-grow border-r border-gray-200 bg-white overflow-y-auto">
          <div className="flex items-center flex-shrink-0 px-6 pt-6 pb-4">
            <img
              className="h-9 w-auto"
              src="/truthify-logo.png"
              alt="Truthify Logo"
            />
          </div>
          <div className="px-6 mt-4 mb-2">
            <p className="text-xs font-bold text-neutral-500 uppercase tracking-tight">
              Dashboard
            </p>
          </div>
          <nav className="flex-1 mt-1 px-4 space-y-1">
            <SidebarNavLink
              to="/dashboard"
              end={true}
              iconSrc="/icons/dashboard-main.svg"
            >
              Main
            </SidebarNavLink>

            <SidebarNavLink
              to="/dashboard/my-profiles"
              iconSrc="/icons/profile-user.svg"
            >
              My Profiles
            </SidebarNavLink>
            <SidebarNavLink
              to="/dashboard/all-profiles"
              iconSrc="/icons/profile-group.svg"
            >
              All Profiles
            </SidebarNavLink>
            <SidebarNavLink
              to="/dashboard/my-reports"
              iconSrc="/icons/report-doc.svg"
            >
              My Reports
            </SidebarNavLink>
            <SidebarNavLink
              to="/dashboard/make-your-own"
              iconSrc="/icons/report-add.svg"
            >
              Make Your Own
            </SidebarNavLink>
          </nav>
          <div className="px-4 my-4">
            {" "}
            <hr className="border-gray-100" />{" "}
          </div>
          <div className="px-4">
            <div className="p-4 bg-gradient-to-br from-sky-500 to-blue-700 rounded-xl text-white relative overflow-hidden">
              <div className="absolute -top-4 -right-8 w-24 h-24 bg-white/10 rounded-full"></div>
              <div className="absolute -bottom-8 -left-4 w-32 h-32 bg-white/5 rounded-full"></div>
              <div className="relative z-10 text-center">
                <div className="flex justify-center mb-2">
                  <div className="flex items-center justify-center h-10 w-10 rounded-full bg-white/20">
                    <img
                      src="/icons/background-integrity.svg"
                      className="h-7 w-7 text-white"
                      alt=""
                    />
                  </div>
                </div>
                <p className="text-xs font-medium mb-3 leading-tight">
                  Background Integrity
                  <br />
                  Check Available
                </p>
                <Link
                  to="/upgrade"
                  className="block w-full bg-white text-sky-600 text-sm font-semibold py-1.5 px-4 rounded-md hover:bg-gray-100 transition-colors"
                >
                  Upgrade
                </Link>
              </div>
            </div>
          </div>
          <div className="flex-shrink-0 mt-auto px-4 pb-4 pt-5">
            <hr className="border-gray-200 mb-4" />
            <div className="flex items-center p-2 bg-slate-100 rounded-lg mb-4">
              <img
                className="inline-block h-9 w-9 rounded-full object-cover"
                src="/images/avatar-user.png"
                alt="User Avatar"
              />
              <div className="ml-3">
                <p className="text-sm font-semibold text-zinc-800 leading-none">
                  Robert R
                </p>
                <p className="text-xs font-medium text-neutral-500 leading-none mt-0.5">
                  robert14r@gmail.com
                </p>
              </div>
            </div>
            <Link
              to="/logout"
              className={`${inactiveClassName} group flex items-center px-3 py-2 text-sm rounded-md`}
            >
              <img
                src="/icons/logout.svg"
                className="mr-3 h-5 w-5 text-gray-400 group-hover:text-gray-500"
                aria-hidden="true"
              />
              Logout
            </Link>
          </div>
        </div>
      </div>

      {/* --- Main Content Area Wrapper --- */}
      <div className="md:pl-64 flex flex-col flex-1">
        {/* --- Top Bar --- */}
        <div className="sticky top-0 z-10 flex-shrink-0 flex h-16 bg-white border-b border-gray-200">
          {/* ... (Header code remains the same) ... */}
          <div className="flex-1 px-4 flex justify-between sm:px-6 lg:px-8">
            <div className="flex-1 flex items-center">
              <Form
                className="w-full flex md:ml-0"
                action="/search"
                method="get"
              >
                <label htmlFor="search-field" className="sr-only">
                  Search Reports/Profiles
                </label>
                <div className="relative w-full max-w-md text-gray-400 focus-within:text-gray-600">
                  <div className="absolute inset-y-0 left-0 flex items-center pointer-events-none pl-3">
                    <img
                      src="/icons/search.svg"
                      className="h-5 w-5"
                      aria-hidden="true"
                    />
                  </div>
                  <input
                    id="search-field"
                    className="block w-full h-10 pl-10 pr-3 py-2 border border-slate-200 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-sky-500 focus:border-sky-500 sm:text-sm"
                    placeholder="Search reports..."
                    type="search"
                    name="q"
                    defaultValue={currentQuery}
                  />
                </div>
              </Form>
            </div>
            <div className="ml-4 flex items-center md:ml-6">
              <button
                type="button"
                className="bg-orange-50 p-1.5 rounded-lg text-amber-600 hover:bg-orange-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500 relative"
              >
                <span className="sr-only">View notifications</span>
                <img
                  src="/icons/bell.svg"
                  className="h-6 w-6"
                  aria-hidden="true"
                />
                <span className="absolute top-1 right-1 block h-2 w-2 rounded-full bg-rose-500 ring-1 ring-orange-50"></span>
              </button>
            </div>
          </div>
        </div>

        {/* --- Search Page Specific Content --- */}
        <main className="flex-1 overflow-y-auto bg-slate-50">
          <div className="py-6 px-4 sm:px-6 lg:px-8">
            {/* Tabs */}
            <div className="my-2 flex justify-center">
              {/* ... (Tabs code remains the same) ... */}
              <div className="inline-flex p-1 bg-slate-100 rounded-lg border border-slate-200">
                <button className="px-5 py-1 rounded-lg text-zinc-600 text-base font-medium">
                  Profiles Available
                </button>
                <button className="px-5 py-1 bg-sky-600 rounded-lg text-white text-base font-medium shadow-sm">
                  Reports Available
                </button>
              </div>
            </div>

            {/* Title and Sort */}
            <div className="flex flex-wrap justify-between items-center gap-4 mb-4 mt-6">
              <div>
                {/* ... (Title code remains the same) ... */}
                <h1 className="text-zinc-800 text-xl sm:text-2xl font-semibold">
                  Available Reports:
                </h1>
                <p className="text-zinc-500 text-xs font-normal mt-1">
                  popular searches this week:
                </p>
              </div>

              {/* --- Sort By Dropdown --- */}
              <div className="relative" ref={dropdownRef}>
                {" "}
                {/* Add ref here */}
                <button
                  onClick={() => setIsSortDropdownOpen(!isSortDropdownOpen)} // Toggle dropdown
                  className="px-4 py-2 bg-white rounded-lg border border-slate-200 inline-flex items-center gap-2 text-neutral-800 text-sm font-semibold shadow-sm hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-sky-500"
                >
                  Sort By
                  {/* Stacked Icons */}
                  <div className="flex flex-col items-center justify-center h-full -mr-1 space-y-px">
                    {" "}
                    {/* Added small vertical space if needed */}
                    <img
                      src="/icons/arrow-up-sort.svg" // Ensure this icon exists in public/icons
                      alt="Sort Ascending"
                      className="h-2 w-2"
                    />
                    <img
                      src="/icons/arrow-down-sort.svg" // Ensure this icon exists in public/icons
                      alt="Sort Descending"
                      className="h-2 w-2"
                    />
                  </div>
                </button>
                {/* Dropdown Menu */}
                {isSortDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg border border-slate-200 z-20 py-1">
                    <Link
                      to={createSortLink("popular")}
                      onClick={() => setIsSortDropdownOpen(false)} // Close on click
                      className={`block px-4 py-2 text-sm ${
                        currentSort === "popular"
                          ? "bg-sky-50 text-sky-700 font-medium"
                          : "text-gray-700 hover:bg-gray-100"
                      }`}
                    >
                      Most Popular
                    </Link>
                    <Link
                      to={createSortLink("recent")}
                      onClick={() => setIsSortDropdownOpen(false)}
                      className={`block px-4 py-2 text-sm ${
                        currentSort === "recent"
                          ? "bg-sky-50 text-sky-700 font-medium"
                          : "text-gray-700 hover:bg-gray-100"
                      }`}
                    >
                      Most Recent
                    </Link>
                    <Link
                      to={createSortLink("oldest")}
                      onClick={() => setIsSortDropdownOpen(false)}
                      className={`block px-4 py-2 text-sm ${
                        currentSort === "oldest"
                          ? "bg-sky-50 text-sky-700 font-medium"
                          : "text-gray-700 hover:bg-gray-100"
                      }`}
                    >
                      Oldest
                    </Link>
                  </div>
                )}
              </div>
            </div>

            {/* Reports Grid */}
            {reports.length > 0 ? (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {reports.map((report) => (
                  <ReportCard key={report.id} report={report} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12 text-gray-500 bg-white rounded-xl border border-slate-100 shadow-sm">
                No reports found matching your search.
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
