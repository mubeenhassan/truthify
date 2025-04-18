// app/routes/profiles.tsx
import type { LoaderFunctionArgs } from "@remix-run/node";
import {
  Form,
  Link,
  useLoaderData,
  useMatch,
  useSearchParams,
} from "@remix-run/react";
import React, { useState, useEffect, useRef } from "react"; // Keep React import

// --- Type Definition ---
interface Profile {
  id: string;
  name: string;
  title: string;
  avatarUrl: string;
  companyLogoUrl: string;
  reportCount: number;
  truthScore: string; // Keep as string for display consistency
  industry: string;
}

interface UserData {
  // Added simple type for potential user data later
  name: string;
  email: string;
  avatar: string;
}

// --- Helper Components ---

// Sidebar NavLink Wrapper (Copied from dashboard.tsx/search.tsx)
function SidebarNavLink({
  to,
  end = false,
  children,
  iconSrc,
}: {
  to: string;
  end?: boolean;
  children: React.ReactNode;
  iconSrc: string;
}) {
  // Use useMatch on the *target* path 'to', not the current path
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
        alt="" // Added empty alt for accessibility
      />
      {children}
      {isActive && (
        <div className="absolute right-0 inset-y-1 w-1 bg-sky-600 rounded-l-lg"></div>
      )}
    </Link>
  );
}

// Lock Icon (Can reuse from search.tsx or define here)
function LockIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className="w-8 h-8 text-gray-400" // Slightly larger icon for visibility in the gray circle
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z"
      />
    </svg>
  );
}

// --- Profile Card Component (Banner Removed) ---
interface ProfileCardProps {
  profile: Profile;
  isLocked: boolean;
}

function ProfileCard({ profile, isLocked }: ProfileCardProps) {
  return (
    // Updated root div: Added background, padding, border, shadow
    <div
      className={`group relative bg-white rounded-xl shadow-md border border-slate-200 p-4 ${
        // Added relative for potential absolute lock overlay
        isLocked ? "cursor-not-allowed" : ""
      }`}
    >
      {/* Content - No longer absolutely positioned */}
      <div className="flex flex-col items-center text-center">
        {/* Avatar */}
        <div
          className={`w-24 h-24 -mt-12 mb-2 rounded-full outline outline-4 outline-white shadow-lg overflow-hidden relative z-10 ${
            // Increased z-index
            // Added z-index, adjusted margin-top
            isLocked ? "grayscale" : ""
          }`}
        >
          <img
            className="w-full h-full object-cover"
            src={profile.avatarUrl}
            alt={`${profile.name} avatar`}
          />
        </div>

        {/* Details - Adjusted spacing slightly */}
        <div className="w-full flex items-end justify-between gap-2 mt-2">
          {/* Left Side: Name, Title, Reports */}
          <div className="flex-1 text-left min-w-0">
            <p className="text-gray-800 text-lg font-semibold font-['Inter'] leading-tight truncate group-hover:text-sky-600 transition-colors">
              {profile.name}
            </p>
            <div className="flex items-center gap-1 mt-0.5">
              <p className="text-gray-500 text-sm font-medium font-['Inter'] leading-snug truncate">
                {profile.title}
              </p>
              <img
                className="w-4 h-4 flex-shrink-0"
                src={profile.companyLogoUrl}
                alt={`${profile.title.split(" ")[0]} logo`} // Improved alt text
              />
            </div>
            <p className="text-gray-500 text-xs font-medium font-['Inter'] leading-snug mt-1">
              <span className="text-gray-700 font-bold">
                {profile.reportCount}
              </span>{" "}
              Reports Available
            </p>
          </div>

          {/* Right Side: Score Gauge or Lock */}
          <div className="flex-shrink-0">
            {isLocked ? (
              // Adjusted lock icon container style slightly
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-gray-200 border border-gray-300 shadow-sm">
                <LockIcon />
              </div>
            ) : (
              <ScoreGauge scoreString={profile.truthScore} />
            )}
          </div>
        </div>
        {/* Optional: Add subtle overlay if locked (covers the whole card content now) */}
        {isLocked && (
          // This overlay will now correctly cover the card content due to parent relative positioning
          <div className="absolute inset-0 bg-gray-100 bg-opacity-50 rounded-xl z-20"></div>
        )}
      </div>
    </div>
  );
}

// --- NEW Circular Score Gauge using SVG ---
function ScoreGauge({ scoreString }: { scoreString: string }) {
  const score = parseFloat(scoreString) || 0;
  const radius = 15.9155; // Radius chosen so circumference is ~100
  const circumference = 100; // Simplified circumference

  // Determine progress color based on score
  let progressColorClass = "text-sky-600"; // Default color
  if (score >= 75) {
    progressColorClass = "text-green-500"; // High score color
  } else if (score >= 50) {
    progressColorClass = "text-yellow-500"; // Medium score color
  } else {
    progressColorClass = "text-red-500"; // Low score color
  }

  // Text color - let's keep it consistent for readability
  const textColorClass = "text-gray-700";

  return (
    // Container needs relative positioning for the absolute text
    <div className="relative h-14 w-14 flex-shrink-0">
      <svg
        className="w-full h-full -rotate-90" // Rotate to start from top
        viewBox="0 0 36 36"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Background Circle Track */}
        <circle
          className="text-gray-200" // Color of the track
          strokeWidth="3" // Stroke thickness
          stroke="currentColor"
          fill="transparent"
          r={radius}
          cx="18"
          cy="18"
        />
        {/* Progress Circle Arc */}
        <circle
          className={progressColorClass} // Dynamic color class
          strokeWidth="3" // Same stroke thickness
          strokeDasharray={`${score}, ${circumference}`} // Length of dash (score %) and gap
          strokeLinecap="round" // Rounded ends for the arc
          stroke="currentColor"
          fill="transparent"
          r={radius}
          cx="18"
          cy="18"
        />
      </svg>
      {/* Percentage Text Overlay */}
      <div className="absolute inset-0 flex items-center justify-center">
        {/* Adjust text size/weight as needed for aesthetics */}
        <span className={`text-xs font-bold ${textColorClass}`}>
          {scoreString}%
        </span>
      </div>
    </div>
  );
}

const MOCK_PROFILES: Profile[] = [
  {
    id: "p1",
    name: "Satya Nadella",
    title: "CEO of Microsoft",
    avatarUrl: "/images/avatar-satya.png",
    companyLogoUrl: "/icons/microsoft.svg",
    reportCount: 238,
    truthScore: "78",
    industry: "Technology",
  },
  {
    id: "p2",
    name: "Jensen Huang",
    title: "President of Nvidia",
    avatarUrl: "/images/avatar-jensen.png",
    companyLogoUrl: "/icons/nvidia.svg",
    reportCount: 134,
    truthScore: "82",
    industry: "Technology",
  },
  {
    id: "p3",
    name: "Sundar Pichai",
    title: "CEO of Google",
    avatarUrl: "/images/avatar-sundar.png",
    companyLogoUrl: "/icons/google-color.svg",
    reportCount: 195,
    truthScore: "75",
    industry: "Technology",
  },
  {
    id: "p4",
    name: "Elon Musk",
    title: "CEO of Tesla",
    avatarUrl: "/images/avatar-elon.png",
    companyLogoUrl: "/images/tesla.png", // Assuming this exists, dashboard uses this
    reportCount: 310,
    truthScore: "63",
    industry: "Automotive",
  },
  // Add more profiles if needed
];

const MOCK_USER: UserData = {
  // Mock user data, replace with actual loader data
  name: "Robert R",
  email: "robert14r@gmail.com",
  avatar: "/images/avatar-user.png",
};

// --- Server-Side Loader ---
export async function loader({ request }: LoaderFunctionArgs) {
  const url = new URL(request.url);
  const query = url.searchParams.get("q")?.toLowerCase(); // Search query
  const industry = url.searchParams.get("industry")?.toLowerCase(); // Filter by industry
  const sort = url.searchParams.get("sort") || "name-asc"; // Default sort: name ascending

  // Determine lock status (Replace with actual logic)
  const isUserLocked = false; // Set to false for testing unlocked view, true for locked
  // const isUserLocked = Math.random() < 0.5;

  let profiles = MOCK_PROFILES;

  // 1. Filter by search query (if any)
  if (query) {
    profiles = profiles.filter(
      (profile) =>
        profile.name.toLowerCase().includes(query) ||
        profile.title.toLowerCase().includes(query) ||
        profile.industry.toLowerCase().includes(query)
    );
  }

  // 2. Filter by industry (if any)
  if (industry && industry !== "all") {
    profiles = profiles.filter(
      (profile) => profile.industry.toLowerCase() === industry
    );
  }

  // 3. Sort
  profiles.sort((a, b) => {
    switch (sort) {
      case "name-desc":
        return b.name.localeCompare(a.name);
      case "reports-desc":
        return b.reportCount - a.reportCount;
      case "score-desc":
        return (
          (parseFloat(b.truthScore) || 0) - (parseFloat(a.truthScore) || 0)
        );
      case "name-asc": // Fallthrough default
      default:
        return a.name.localeCompare(b.name);
    }
  });

  // Prepare list of unique industries for the filter dropdown
  const availableIndustries: string[] = [
    // Explicitly type as string[]
    "All", // Add "All" option
    ...new Set(MOCK_PROFILES.map((p) => p.industry)),
  ];

  // Return user data along with profiles
  return Response.json({
    profiles,
    isLocked: isUserLocked,
    industries: availableIndustries,
    user: MOCK_USER, // Pass mock user data (replace with real data eventually)
  });
}

// --- Client-Side Page Component ---
export default function ProfilesPage() {
  // Get data from loader
  const { profiles, isLocked, industries, user } =
    useLoaderData<typeof loader>(); // Add user
  const [searchParams] = useSearchParams();
  const currentQuery = searchParams.get("q") || "";
  const currentIndustry = searchParams.get("industry") || "All"; // Default to 'All'
  const currentSort = searchParams.get("sort") || "name-asc";
  // Class needed for Logout Link styling, copied from dashboard
  const inactiveClassName =
    "text-zinc-600 hover:text-zinc-900 hover:bg-gray-50 font-medium";

  // State and refs for dropdowns (similar to search page)
  const [isIndustryFilterOpen, setIsIndustryFilterOpen] = useState(false);
  const [isSortDropdownOpen, setIsSortDropdownOpen] = useState(false);
  const industryFilterRef = useRef<HTMLDivElement>(null);
  const sortDropdownRef = useRef<HTMLDivElement>(null);

  // --- Dropdown close handlers ---
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        industryFilterRef.current &&
        !industryFilterRef.current.contains(event.target as Node)
      ) {
        setIsIndustryFilterOpen(false);
      }
      if (
        sortDropdownRef.current &&
        !sortDropdownRef.current.contains(event.target as Node)
      ) {
        setIsSortDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // --- URL generation helpers ---
  const createFilterOrSortLink = (
    paramName: "industry" | "sort",
    value: string
  ) => {
    const newSearchParams = new URLSearchParams(searchParams);

    // Set or delete the parameter being changed
    if (
      (paramName === "industry" && value.toLowerCase() === "all") ||
      (paramName === "sort" && value === "name-asc")
    ) {
      // Remove param if it's the default value ('All' or 'name-asc')
      newSearchParams.delete(paramName);
    } else {
      newSearchParams.set(paramName, value);
    }

    // --- Preserve other parameters ---
    // FIX 1: Removed the `if (paramName !== "q")` check as it was always true.
    // Always preserve the 'q' parameter if it exists.
    if (currentQuery) newSearchParams.set("q", currentQuery);
    else newSearchParams.delete("q"); // Ensure 'q' is removed if it wasn't there

    // Preserve 'industry' if it's not the one being changed and not default
    if (paramName !== "industry") {
      if (currentIndustry !== "All")
        newSearchParams.set("industry", currentIndustry);
      else newSearchParams.delete("industry");
    }
    // Preserve 'sort' if it's not the one being changed and not default
    if (paramName !== "sort") {
      if (currentSort !== "name-asc") newSearchParams.set("sort", currentSort);
      else newSearchParams.delete("sort");
    }
    // --- End Parameter Preservation ---

    // Rebuild the final search string
    const searchString = newSearchParams.toString();
    return `/profiles${searchString ? `?${searchString}` : ""}`; // Avoid trailing '?' if no params
  };

  return (
    // Main Layout Structure
    <div className="flex h-screen overflow-hidden bg-slate-50 font-['Inter']">
      {/* Sidebar - Structure and Content Copied from dashboard.tsx */}
      <div className="hidden md:flex md:w-64 md:flex-col md:fixed md:inset-y-0">
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
          {/* --- Nav Links matching dashboard.tsx --- */}
          <nav className="flex-1 mt-1 px-4 space-y-1">
            <SidebarNavLink
              to="/dashboard"
              end={true} // End match for the main dashboard link
              iconSrc="/icons/dashboard-main.svg"
            >
              Main
            </SidebarNavLink>
            <SidebarNavLink
              to="/dashboard/my-profiles" // Path from dashboard.tsx
              iconSrc="/icons/profile-user.svg"
            >
              My Profiles
            </SidebarNavLink>
            {/* This is the current page, use its canonical path & end=true */}
            <SidebarNavLink
              to="/profiles"
              end={true} // Match this specific route
              iconSrc="/icons/profile-group.svg"
            >
              All Profiles
            </SidebarNavLink>
            <SidebarNavLink
              to="/dashboard/my-reports" // Path from dashboard.tsx
              iconSrc="/icons/report-doc.svg"
            >
              My Reports
            </SidebarNavLink>
            <SidebarNavLink
              to="/dashboard/make-your-own" // Path from dashboard.tsx
              iconSrc="/icons/report-add.svg"
            >
              Make Your Own
            </SidebarNavLink>
          </nav>
          <div className="px-4 my-4">
            <hr className="border-gray-100" />
          </div>
          {/* --- Sidebar Upgrade Card (Copied from dashboard.tsx) --- */}
          <div className="px-4">
            <div className="p-4 bg-gradient-to-br from-sky-500 to-blue-700 rounded-xl text-white relative overflow-hidden">
              <div className="absolute -top-4 -right-8 w-24 h-24 bg-white/10 rounded-full"></div>
              <div className="absolute -bottom-8 -left-4 w-32 h-32 bg-white/5 rounded-full"></div>
              <div className="relative z-10 text-center">
                <div className="flex justify-center mb-2">
                  <div className="flex items-center justify-center h-10 w-10 rounded-full bg-white/20">
                    <img
                      src="/icons/background-integrity.svg" // Icon from dashboard card
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
                  to="/upgrade" // Link from dashboard card
                  className="block w-full bg-white text-sky-600 text-sm font-semibold py-1.5 px-4 rounded-md hover:bg-gray-100 transition-colors"
                >
                  Upgrade
                </Link>
              </div>
            </div>
          </div>
          {/* --- User Profile & Logout (Copied from dashboard.tsx) --- */}
          <div className="flex-shrink-0 mt-auto px-4 pb-4 pt-5">
            <hr className="border-gray-200 mb-4" />
            <div className="flex items-center p-2 bg-slate-100 rounded-lg mb-4">
              <img
                className="inline-block h-9 w-9 rounded-full object-cover"
                src={user.avatar} // Use user data from loader
                alt="User Avatar"
              />
              <div className="ml-3">
                <p className="text-sm font-semibold text-zinc-800 leading-none">
                  {user.name} {/* Use user data from loader */}
                </p>
                <p className="text-xs font-medium text-neutral-500 leading-none mt-0.5">
                  {user.email} {/* Use user data from loader */}
                </p>
              </div>
            </div>
            <Link
              to="/logout" // Assuming a /logout route exists
              className={`${inactiveClassName} group flex items-center px-3 py-2 text-sm rounded-md`}
            >
              <img
                src="/icons/logout.svg"
                className="mr-3 h-5 w-5 text-gray-400 group-hover:text-gray-500"
                aria-hidden="true"
                alt="" // Decorative
              />
              Logout
            </Link>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="md:pl-64 flex flex-col flex-1">
        {/* Header - Structure and Content Copied/Merged from dashboard.tsx */}
        <div className="sticky top-0 z-10 flex-shrink-0 flex h-16 bg-white border-b border-gray-200">
          <div className="flex-1 px-4 flex justify-between sm:px-6 lg:px-8">
            <div className="flex-1 flex items-center">
              {/* Search Form - Specific to Profiles page */}
              <Form
                className="w-full flex md:ml-0"
                action="/profiles"
                method="get"
                replace // Use replace to avoid polluting history on search
              >
                <label htmlFor="search-field" className="sr-only">
                  Search Profiles
                </label>
                <div className="relative w-full max-w-md text-gray-400 focus-within:text-gray-600">
                  <div className="absolute inset-y-0 left-0 flex items-center pointer-events-none pl-3">
                    <img
                      src="/icons/search.svg"
                      className="h-5 w-5"
                      aria-hidden="true"
                      alt="" // Decorative
                    />
                  </div>
                  <input
                    id="search-field"
                    className="block w-full h-10 pl-10 pr-3 py-2 border border-slate-200 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-sky-500 focus:border-sky-500 sm:text-sm"
                    placeholder="Search profiles..."
                    type="search"
                    name="q"
                    defaultValue={currentQuery}
                  />
                </div>
                {/* Hidden inputs to preserve filter/sort on search submit */}
                {currentIndustry !== "All" && (
                  <input
                    type="hidden"
                    name="industry"
                    value={currentIndustry}
                  />
                )}
                {currentSort !== "name-asc" && (
                  <input type="hidden" name="sort" value={currentSort} />
                )}
              </Form>
            </div>
            {/* Notification Bell - Copied from dashboard.tsx */}
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
                  alt="" // Decorative
                />
                {/* Example notification dot */}
                <span className="absolute top-1 right-1 block h-2 w-2 rounded-full bg-rose-500 ring-1 ring-orange-50"></span>
              </button>
            </div>
          </div>
        </div>

        {/* Page Specific Content */}
        <main className="flex-1 overflow-y-auto bg-slate-50">
          <div className="py-6 px-4 sm:px-6 lg:px-8">
            {/* Tabs - "Profiles Available" is active */}
            <div className="my-2 flex justify-center">
              <div className="inline-flex p-1 bg-slate-100 rounded-lg border border-slate-200">
                <button className="px-5 py-1 bg-sky-600 rounded-lg text-white text-base font-medium shadow-sm">
                  Profiles Available
                </button>
                <button className="px-5 py-1 rounded-lg text-zinc-600 text-base font-medium hover:bg-slate-200">
                  Profiles Created
                </button>
              </div>
            </div>

            {/* Title and Filters/Sort */}
            <div className="flex flex-wrap justify-between items-center gap-4 mb-4 mt-6">
              <div>
                <h1 className="text-zinc-800 text-xl sm:text-2xl font-semibold">
                  Your Profiles
                </h1>
                <p className="text-gray-500 text-sm font-medium mt-1">
                  Dive in to detailed insights
                </p>{" "}
              </div>

              <div className="flex items-center gap-4">
                {/* Filter by Industry Dropdown */}
                <div className="relative" ref={industryFilterRef}>
                  <button
                    onClick={() =>
                      setIsIndustryFilterOpen(!isIndustryFilterOpen)
                    }
                    className="px-4 py-2 bg-white rounded-lg border border-slate-200 inline-flex items-center gap-2 text-neutral-800 text-sm font-semibold shadow-sm hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-sky-500"
                  >
                    Filter by Industry
                    <img
                      src="/icons/filter.svg"
                      alt="Sort Ascending"
                      className="h-4 w-4"
                    />
                  </button>
                  {isIndustryFilterOpen && (
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg border border-slate-200 z-20 py-1 max-h-60 overflow-y-auto">
                      {industries.map((industryOption: string) => (
                        <Link
                          key={industryOption}
                          to={createFilterOrSortLink(
                            "industry",
                            industryOption // Pass the original casing for the URL param value if needed
                          )}
                          replace // Use replace to avoid polluting history
                          onClick={() => setIsIndustryFilterOpen(false)}
                          className={`block px-4 py-2 text-sm capitalize ${
                            // Capitalize for display only
                            currentIndustry.toLowerCase() ===
                            industryOption.toLowerCase()
                              ? "bg-sky-50 text-sky-700 font-medium"
                              : "text-gray-700 hover:bg-gray-100"
                          }`}
                        >
                          {industryOption} {/* Display original casing */}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>

                {/* Sort By Dropdown */}
                <div className="relative" ref={sortDropdownRef}>
                  <button
                    onClick={() => setIsSortDropdownOpen(!isSortDropdownOpen)}
                    className="px-4 py-2 bg-white rounded-lg border border-slate-200 inline-flex items-center gap-2 text-neutral-800 text-sm font-semibold shadow-sm hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-sky-500"
                  >
                    Sort By
                    <div className="flex flex-col items-center justify-center h-full -mr-1 space-y-px">
                      <img
                        src="/icons/arrow-up-sort.svg"
                        alt="Sort Ascending"
                        className="h-2 w-2"
                      />
                      <img
                        src="/icons/arrow-down-sort.svg"
                        alt="Sort Descending"
                        className="h-2 w-2"
                      />
                    </div>
                  </button>
                  {isSortDropdownOpen && (
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg border border-slate-200 z-20 py-1">
                      {/* Add profile sort options */}
                      <Link
                        to={createFilterOrSortLink("sort", "name-asc")}
                        replace
                        onClick={() => setIsSortDropdownOpen(false)}
                        className={`block px-4 py-2 text-sm ${
                          currentSort === "name-asc"
                            ? "bg-sky-50 text-sky-700 font-medium"
                            : "text-gray-700 hover:bg-gray-100"
                        }`}
                      >
                        Name (A-Z)
                      </Link>
                      <Link
                        to={createFilterOrSortLink("sort", "name-desc")}
                        replace
                        onClick={() => setIsSortDropdownOpen(false)}
                        className={`block px-4 py-2 text-sm ${
                          currentSort === "name-desc"
                            ? "bg-sky-50 text-sky-700 font-medium"
                            : "text-gray-700 hover:bg-gray-100"
                        }`}
                      >
                        Name (Z-A)
                      </Link>
                      <Link
                        to={createFilterOrSortLink("sort", "reports-desc")}
                        replace
                        onClick={() => setIsSortDropdownOpen(false)}
                        className={`block px-4 py-2 text-sm ${
                          currentSort === "reports-desc"
                            ? "bg-sky-50 text-sky-700 font-medium"
                            : "text-gray-700 hover:bg-gray-100"
                        }`}
                      >
                        Most Reports
                      </Link>
                      <Link
                        to={createFilterOrSortLink("sort", "score-desc")}
                        replace
                        onClick={() => setIsSortDropdownOpen(false)}
                        className={`block px-4 py-2 text-sm ${
                          currentSort === "score-desc"
                            ? "bg-sky-50 text-sky-700 font-medium"
                            : "text-gray-700 hover:bg-gray-100"
                        }`}
                      >
                        Highest Score
                      </Link>
                    </div>
                  )}
                </div>
              </div>
            </div>
            {/* Profiles Grid */}
            {profiles.length > 0 ? (
              // Adjust grid columns for desired layout (e.g., 3 columns on larger screens)
              // Adjusted grid gap
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-x-6 gap-y-20 pt-12">
                {" "}
                {/* Increased gap-y and pt */}
                {profiles.map((profile: Profile) =>
                  // Wrap ProfileCard in a Link if not locked
                  isLocked ? (
                    <ProfileCard
                      key={profile.id}
                      profile={profile}
                      isLocked={isLocked}
                    />
                  ) : (
                    <Link
                      to={`/profile/${profile.id}`}
                      key={profile.id}
                      className="block hover:opacity-90 transition-opacity"
                    >
                      {" "}
                      {/* Added Link wrapper */}
                      <ProfileCard profile={profile} isLocked={isLocked} />
                    </Link>
                  )
                )}
              </div>
            ) : (
              <div className="text-center py-12 text-gray-500 bg-white rounded-xl border border-slate-100 shadow-sm">
                No profiles found matching your criteria.
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
