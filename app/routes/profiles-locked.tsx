// This route is designed to exactly match the visual appearance of graphic-13.jpg

import type { LoaderFunctionArgs } from "@remix-run/node";
import {
  Form,
  Link,
  useLoaderData,
  useMatch,
  useSearchParams,
} from "@remix-run/react";
import React, { useState, useEffect, useRef } from "react";

// --- Type Definition (Using Profile for structure) ---
interface Profile {
  id: string;
  name: string;
  title: string;
  avatarUrl: string;
  companyLogoUrl: string;
  reportCount: number;
  truthScore: string; // Kept for structure, though not displayed when locked
  industry: string;
}

interface UserData {
  name: string;
  email: string;
  avatar: string;
}

// --- Helper Components ---

// Sidebar NavLink Wrapper (Copied)
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
        alt=""
      />
      {children}
      {isActive && (
        <div className="absolute right-0 inset-y-1 w-1 bg-sky-600 rounded-l-lg"></div>
      )}
    </Link>
  );
}

// --- Profile Card Component (Lock Icon Only, No Opacity/Grayscale) ---
interface ProfileCardProps {
  profile: Profile;
  isLocked: boolean; // Will always be true for this route
}

function ProfileCard({ profile, isLocked }: ProfileCardProps) {
  return (
    // Base card styling
    <div
      className={`group relative bg-white rounded-xl shadow-md border border-slate-200 p-4 ${
        // Add cursor style only if locked
        isLocked ? "cursor-not-allowed" : ""
      }`}
    >
      <div className="flex flex-col items-center text-center">
        {/* Avatar - Removed grayscale effect */}
        <div
          className={`w-24 h-24 -mt-12 mb-2 rounded-full outline outline-4 outline-white shadow-lg overflow-hidden relative z-10`}
        >
          <img
            className="w-full h-full object-cover"
            src={profile.avatarUrl}
            alt={`${profile.name} avatar`}
          />
        </div>

        {/* Details */}
        <div className="w-full flex items-end justify-between gap-2 mt-2">
          {/* Left Side: Name, Title, Reports */}
          <div className="flex-1 text-left min-w-0">
            <p className="text-gray-800 text-lg font-semibold font-['Inter'] leading-tight truncate">
              {profile.name}
            </p>
            <div className="flex items-center gap-1 mt-0.5">
              <p className="text-gray-500 text-sm font-medium font-['Inter'] leading-snug truncate">
                {profile.title}
              </p>
              <img
                className="w-4 h-4 flex-shrink-0"
                src={profile.companyLogoUrl}
                alt={`${profile.title.split(" ")[0]} logo`}
              />
            </div>
            <p className="text-gray-500 text-xs font-medium font-['Inter'] leading-snug mt-1">
              <span className="text-gray-700 font-bold">
                {profile.reportCount}
              </span>{" "}
              Reports Available
            </p>
          </div>

          {/* Right Side: Lock Icon */}
          <div className="flex-shrink-0">
            {
              isLocked ? ( // Always true for this route
                // Container for the lock icon
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-gray-200 border border-gray-300 shadow-sm">
                  {/* Use <img> tag */}
                  <img
                    src="/icons/lock.svg"
                    alt="Locked" // Simplified alt text
                    className="w-8 h-8 text-gray-400"
                  />
                </div>
              ) : null /* Score gauge not shown */
            }
          </div>
        </div>
        {/* Removed the overlay div */}
      </div>
    </div>
  );
}

// --- MOCK DATA (Copied) ---
// Using the same mock data, actual implementation might vary
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
    id: "p3a",
    name: "Satya Nadella",
    title: "CEO of Microsoft",
    avatarUrl: "/images/avatar-satya.png",
    companyLogoUrl: "/icons/microsoft.svg",
    reportCount: 238,
    truthScore: "78",
    industry: "Technology",
  },
  {
    id: "p4a",
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
    companyLogoUrl: "/images/tesla.png",
    reportCount: 310,
    truthScore: "63",
    industry: "Automotive",
  },
  {
    id: "p1b",
    name: "Satya Nadella",
    title: "CEO of Microsoft",
    avatarUrl: "/images/avatar-satya.png",
    companyLogoUrl: "/icons/microsoft.svg",
    reportCount: 238,
    truthScore: "78",
    industry: "Technology",
  },
  {
    id: "p2b",
    name: "Jensen Huang",
    title: "President of Nvidia",
    avatarUrl: "/images/avatar-jensen.png",
    companyLogoUrl: "/icons/nvidia.svg",
    reportCount: 134,
    truthScore: "82",
    industry: "Technology",
  },
  {
    id: "p1c",
    name: "Satya Nadella",
    title: "CEO of Microsoft",
    avatarUrl: "/images/avatar-satya.png",
    companyLogoUrl: "/icons/microsoft.svg",
    reportCount: 238,
    truthScore: "78",
    industry: "Technology",
  },
  {
    id: "p4c",
    name: "Elon Musk",
    title: "CEO of Tesla",
    avatarUrl: "/images/avatar-elon.png",
    companyLogoUrl: "/images/tesla.png",
    reportCount: 310,
    truthScore: "63",
    industry: "Automotive",
  },
  {
    id: "p3d",
    name: "Sundar Pichai",
    title: "CEO of Google",
    avatarUrl: "/images/avatar-sundar.png",
    companyLogoUrl: "/icons/google-color.svg",
    reportCount: 195,
    truthScore: "75",
    industry: "Technology",
  },
  {
    id: "p2d",
    name: "Jensen Huang",
    title: "President of Nvidia",
    avatarUrl: "/images/avatar-jensen.png",
    companyLogoUrl: "/icons/nvidia.svg",
    reportCount: 134,
    truthScore: "82",
    industry: "Technology",
  },
];

const MOCK_USER: UserData = {
  name: "Robert R",
  email: "robert14r@gmail.com",
  avatar: "/images/avatar-user.png",
};

// --- Server-Side Loader ---
// Fetches data and forces the locked state
export async function loader({ request }: LoaderFunctionArgs) {
  const url = new URL(request.url);
  const query = url.searchParams.get("q")?.toLowerCase();
  const industry = url.searchParams.get("industry")?.toLowerCase();
  const sort = url.searchParams.get("sort") || "name-asc";

  let profiles = MOCK_PROFILES; // Using profile data structure

  // --- Filtering and Sorting Logic (copied) ---
  if (query) {
    profiles = profiles.filter(
      (p) =>
        p.name.toLowerCase().includes(query) ||
        p.title.toLowerCase().includes(query) ||
        p.industry.toLowerCase().includes(query)
    );
  }
  // Filtering logic including special categories from image
  const specialCategories = [
    "business executives",
    "doctors",
    "politically exposed persons",
    "high-risk players",
  ];
  if (industry && industry !== "all") {
    if (specialCategories.includes(industry)) {
      // Placeholder: Add specific logic if these aren't direct industry matches
      console.warn(
        `Specific filtering for '${industry}' not fully implemented.`
      );
      // Example: You might filter based on title, keywords, etc.
      // profiles = profiles.filter(p => checkSpecialCategory(p, industry));
    } else {
      profiles = profiles.filter((p) => p.industry.toLowerCase() === industry);
    }
  }

  profiles.sort((a, b) => {
    switch (sort) {
      case "name-desc":
        return b.name.localeCompare(a.name);
      case "reports-desc":
        return b.reportCount - a.reportCount;
      case "name-asc":
      default:
        return a.name.localeCompare(b.name);
    }
  });

  // Industries for Filter Dropdown (including special categories)
  const availableIndustries: string[] = [
    "All",
    "Business Executives",
    "Doctors",
    "Politically Exposed Persons",
    "High-Risk Players",
    ...new Set(
      MOCK_PROFILES.map((p) => p.industry).filter(
        (ind) =>
          ![
            "Business Executives",
            "Doctors",
            "Politically Exposed Persons",
            "High-Risk Players",
          ].includes(ind)
      )
    ),
  ];

  // Force isLocked to true to match the image
  const isUserLocked = true;

  return Response.json({
    profiles: profiles,
    isLocked: isUserLocked,
    industries: availableIndustries,
    user: MOCK_USER,
  });
}

// --- Client-Side Page Component ---
export default function ProfilesViewPage() {
  // Renamed component
  const { profiles, isLocked, industries, user } =
    useLoaderData<typeof loader>();
  const [searchParams] = useSearchParams();
  const currentQuery = searchParams.get("q") || "";
  const currentIndustry = decodeURIComponent(
    searchParams.get("industry") || "All"
  ); // Decode potentially encoded industry from URL
  const currentSort = searchParams.get("sort") || "name-asc";
  const inactiveClassName =
    "text-zinc-600 hover:text-zinc-900 hover:bg-gray-50 font-medium";

  // State and refs for dropdowns
  const [isIndustryFilterOpen, setIsIndustryFilterOpen] = useState(false);
  const [isSortDropdownOpen, setIsSortDropdownOpen] = useState(false);
  const industryFilterRef = useRef<HTMLDivElement>(null);
  const sortDropdownRef = useRef<HTMLDivElement>(null);

  // Dropdown close handlers
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

  // --- URL generation helper (Updated base path) ---
  const createFilterOrSortLink = (
    paramName: "industry" | "sort",
    value: string // Expecting decoded value here
  ) => {
    const newSearchParams = new URLSearchParams(searchParams);
    const encodedValue = encodeURIComponent(value); // Encode for URL

    if (
      (paramName === "industry" && value.toLowerCase() === "all") ||
      (paramName === "sort" && value === "name-asc")
    ) {
      newSearchParams.delete(paramName);
    } else {
      newSearchParams.set(paramName, encodedValue);
    }

    // Preserve other parameters (using decoded current values for logic, encoded for setting)
    if (currentQuery) newSearchParams.set("q", currentQuery);
    else newSearchParams.delete("q");
    if (paramName !== "industry" && currentIndustry !== "All")
      newSearchParams.set("industry", encodeURIComponent(currentIndustry));
    if (paramName !== "sort" && currentSort !== "name-asc")
      newSearchParams.set("sort", currentSort);

    const searchString = newSearchParams.toString();
    // *** Update the base path to the new route ***
    return `/profiles.view${searchString ? `?${searchString}` : ""}`;
  };

  return (
    <div className="flex h-screen overflow-hidden bg-slate-50 font-['Inter']">
      {/* --- Sidebar (Identical Structure) --- */}
      <div className="hidden md:flex md:w-64 md:flex-col md:fixed md:inset-y-0">
        <div className="flex flex-col flex-grow border-r border-gray-200 bg-white overflow-y-auto">
          {/* Logo, Nav Links, Upgrade Card, User Profile... Copied */}
          {/* Logo */}
          <div className="flex items-center flex-shrink-0 px-6 pt-6 pb-4">
            <img
              className="h-9 w-auto"
              src="/truthify-logo.png"
              alt="Truthify Logo"
            />
          </div>
          {/* Dashboard Title */}
          <div className="px-6 mt-4 mb-2">
            <p className="text-xs font-bold text-neutral-500 uppercase tracking-tight">
              Dashboard
            </p>
          </div>
          {/* Nav Links */}
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
            {/* Updated this link to point to the original profiles page */}
            <SidebarNavLink to="/profiles" iconSrc="/icons/profile-group.svg">
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
            <hr className="border-gray-100" />
          </div>
          {/* Upgrade Card */}
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
          {/* User Profile & Logout */}
          <div className="flex-shrink-0 mt-auto px-4 pb-4 pt-5">
            <hr className="border-gray-200 mb-4" />
            <div className="flex items-center p-2 bg-slate-100 rounded-lg mb-4">
              <img
                className="inline-block h-9 w-9 rounded-full object-cover"
                src={user.avatar}
                alt="User Avatar"
              />
              <div className="ml-3">
                <p className="text-sm font-semibold text-zinc-800 leading-none">
                  {user.name}
                </p>
                <p className="text-xs font-medium text-neutral-500 leading-none mt-0.5">
                  {user.email}
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
                alt=""
              />
              Logout
            </Link>
          </div>
        </div>
      </div>

      {/* --- Main Content Area --- */}
      <div className="md:pl-64 flex flex-col flex-1">
        {/* Header */}
        <div className="sticky top-0 z-10 flex-shrink-0 flex h-16 bg-white border-b border-gray-200">
          <div className="flex-1 px-4 flex justify-between sm:px-6 lg:px-8">
            <div className="flex-1 flex items-center">
              {/* Search Form - Updated action */}
              <Form
                className="w-full flex md:ml-0"
                action="/profiles.view"
                method="get"
                replace
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
                      alt=""
                    />
                  </div>
                  <input
                    id="search-field"
                    className="block w-full h-10 pl-10 pr-3 py-2 border border-slate-200 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-sky-500 focus:border-sky-500 sm:text-sm"
                    placeholder="Search profiles..." // Placeholder matches image/context
                    type="search"
                    name="q"
                    defaultValue={currentQuery}
                  />
                </div>
                {/* Hidden inputs for filter/sort */}
                {currentIndustry !== "All" && (
                  <input
                    type="hidden"
                    name="industry"
                    value={encodeURIComponent(currentIndustry)}
                  />
                )}
                {currentSort !== "name-asc" && (
                  <input type="hidden" name="sort" value={currentSort} />
                )}
              </Form>
            </div>
            {/* Notification Bell */}
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
                  alt=""
                />
                <span className="absolute top-1 right-1 block h-2 w-2 rounded-full bg-rose-500 ring-1 ring-orange-50"></span>
              </button>
            </div>
          </div>
        </div>

        {/* Page Specific Content */}
        <main className="flex-1 overflow-y-auto bg-slate-50">
          <div className="py-6 px-4 sm:px-6 lg:px-8">
            {/* Tabs - "Profiles Available" is active, matching image */}
            <div className="my-2 flex justify-center">
              <div className="inline-flex p-1 bg-slate-100 rounded-lg border border-slate-200">
                {/* Active button for "Profiles Available" */}
                <button className="px-5 py-1 bg-sky-600 rounded-lg text-white text-base font-medium shadow-sm">
                  Profiles Available
                </button>
                {/* Inactive Link/Button for "Reports Available" */}
                {/* If reports have their own page, link to it e.g., /reports.available */}
                <Link
                  to="/reports.available" // Or another appropriate path for reports
                  className="px-5 py-1 rounded-lg text-zinc-600 text-base font-medium hover:bg-slate-200"
                >
                  Reports Available
                </Link>
              </div>
            </div>

            {/* Title and Filters/Sort - Keeping heading from image */}
            <div className="flex flex-wrap justify-between items-center gap-4 mb-4 mt-6">
              {/* Title area matching the image (heading remains "Available Reports:") */}
              <div>
                <h2 className="text-zinc-800 text-lg font-semibold mb-0">
                  Available Reports:
                </h2>
                <p className="text-gray-500 text-sm mt-0">
                  Popular searches this week
                </p>
              </div>

              {/* Filters/Sort Controls */}
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
                      alt="Filter"
                      className="h-4 w-4"
                    />
                  </button>
                  {isIndustryFilterOpen && (
                    <div className="absolute right-0 mt-2 w-56 bg-white rounded-md shadow-lg border border-slate-200 z-20 py-1 max-h-60 overflow-y-auto">
                      {/* Map through industries (including special ones) */}
                      {industries.map((industryOption: string) => (
                        <Link
                          key={industryOption}
                          // Pass decoded value to link generator
                          to={createFilterOrSortLink(
                            "industry",
                            industryOption
                          )}
                          replace
                          onClick={() => setIsIndustryFilterOpen(false)}
                          // Compare with decoded currentIndustry for styling
                          className={`block px-4 py-2 text-sm ${
                            currentIndustry.toLowerCase() ===
                            industryOption.toLowerCase()
                              ? "bg-sky-50 text-sky-700 font-medium"
                              : "text-gray-700 hover:bg-gray-100"
                          }`}
                        >
                          {industryOption} {/* Display the industry name */}
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
                      {/* Sorting options */}
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
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Profiles Grid - Render locked cards */}
            {profiles.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-x-6 gap-y-20 pt-12">
                {profiles.map((profile: Profile) => (
                  // Render ProfileCard directly - no Link wrapper needed as isLocked=true
                  <ProfileCard
                    key={profile.id}
                    profile={profile}
                    isLocked={isLocked} // Always true
                  />
                ))}
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
