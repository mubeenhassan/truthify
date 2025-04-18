// app/routes/dashboard.tsx
import type { MetaFunction, LoaderFunctionArgs } from "@remix-run/node"; // Or cloudflare/deno
import { Link, useLoaderData, useMatch } from "@remix-run/react";
import React from "react";

// Add these specific interfaces

interface CountryData {
  name: string;
  value: number;
  percentage: number;
  trend: "up" | "down";
  flag: string;
}

interface FallacyData {
  name: string;
  percentage: number;
}

interface UpgradeItemData {
  name: string;
  icon: string;
}

interface MostSearchedProfile {
  name: string;
  title: string;
  score: string;
  logo: string;
  avatar: string;
}

// --- Mock Data Generation (Simulates fetching based on lock status) ---
// In a real app, this logic would be in your loader, fetching real data.
const getMockData = (
  isLocked: boolean
): {
  mostSearched: MostSearchedProfile[]; // Use the defined type here
  recentProfile: any; // Define a proper type for this too if possible
  countries: CountryData[]; // Define types for these as well
  fallacies: FallacyData[];
  upgradeItems: UpgradeItemData[];
} => {
  const mostSearchedBase: MostSearchedProfile[] = [
    {
      name: "Satya Nadella",
      title: "CEO of Microsoft",
      score: "78%",
      logo: "/icons/microsoft.svg",
      avatar: "/images/avatar-satya.png",
    },
    {
      name: "Sundar Pichai",
      title: "CEO of Google",
      score: "77%",
      logo: "/icons/google-color.svg",
      avatar: "/images/avatar-sundar.png",
    },
    {
      name: "Elon Musk",
      title: "CEO of Tesla Motors",
      score: "63%",
      logo: "/images/tesla.png",
      avatar: "/images/avatar-elon.png",
    },
  ];

  const recentProfileData = isLocked
    ? {
        name: "Elizabeth Holmes",
        title: "CEO of Theranos",
        score: "3.7",
        logo: "/images/theranos-logo.png",
        avatar: "/images/avatar-holmes.png",
        report: {
          title: "Theranos Founder Claims Progress", // Example title
          speaker: "E. Holmes",
          source: "Court Filings",
          date: "Mar 15 2025", // Example date
          customDate: "N/A",
        },
      }
    : null; // No specific recent profile needed for unlocked view in this example

  return {
    mostSearched: mostSearchedBase, // In locked mode, the component will handle the visual locking
    recentProfile: recentProfileData,
    countries: [
      {
        name: "United States",
        value: 30000,
        percentage: 25.8,
        trend: "up",
        flag: "/icons/flag-us.svg",
      },
      {
        name: "Brazil",
        value: 26000,
        percentage: 16.2,
        trend: "down",
        flag: "/icons/flag-br.svg",
      },
      {
        name: "India",
        value: 22000,
        percentage: 12.3,
        trend: "up",
        flag: "/icons/flag-in.svg",
      },
      {
        name: "Australia",
        value: 17000,
        percentage: 11.9,
        trend: "down",
        flag: "/icons/flag-au.svg",
      },
    ],
    fallacies: [
      { name: "Argument from Authority", percentage: 78 },
      { name: "Hasty Generalization", percentage: 43 },
      { name: "False Dilemma", percentage: 52 },
      { name: "Appeal to Emotion", percentage: 66 },
    ],
    upgradeItems: [
      { name: "Politicians", icon: "/icons/politician.svg" },
      { name: "Fortune 500", icon: "/icons/fortune500.svg" },
      { name: "Influencers", icon: "/icons/influencer.svg" },
    ],
  };
};
// -----------------

export const meta: MetaFunction = () => {
  return [
    { title: "Dashboard | Truthify" },
    { name: "description", content: "Your Truthify dashboard." },
  ];
};

// --- Loader Function ---
// This function runs on the server before rendering
export const loader = async ({ request }: LoaderFunctionArgs) => {
  // **IMPORTANT:** Replace this with your actual logic to determine lock status
  // This could involve checking user session, subscription status, database flags, etc.
  const isUserLocked = Math.random() < 0.5; // Simulate 50% chance of being locked

  const data = getMockData(isUserLocked);

  return Response.json({
    isLocked: isUserLocked,
    ...data,
  });
};
// ---------------------

// --- Helper Components ---

// Unlocked Score Circle (using the style from the unlocked version)
function ScoreCircle({ score }: { score: string }) {
  return (
    <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-gradient-to-bl from-sky-400 to-blue-500 border border-white/50 shadow-inner">
      <span className="text-xs font-extrabold text-stone-900">{score}</span>
    </div>
  );
}

// Lock Icon (from the locked version)
function LockIcon() {
  return (
    <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-gray-200 border border-gray-300">
      {" "}
      {/* Matched size */}
      <img
        src="/icons/lock-closed-gray.svg"
        className="h-5 w-5 text-gray-500"
        alt="Locked"
      />
    </div>
  );
}

// Recent Profile Score Gauge (from the locked version)
function ScoreGaugeRecent({ scoreString }: { scoreString: string }) {
  const score = parseFloat(scoreString) || 0;
  const percentage = Math.max(0, Math.min(100, (score / 10) * 100)); // Assuming score is out of 10
  const strokeWidth = 3;
  const size = 40; // Size from locked version's recent profile card
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const offset = circumference - (percentage / 100) * circumference;
  const gradientId = "recent-profile-score-gradient";

  return (
    <div className="relative h-10 w-10 flex-shrink-0">
      {" "}
      {/* Container size from locked version */}
      <svg
        height={size}
        width={size}
        viewBox={`0 0 ${size} ${size}`}
        className="-rotate-90"
      >
        <defs>
          <linearGradient id={gradientId} x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#0593E9" />
            <stop offset="100%" stopColor="#0560E9" />
          </linearGradient>
        </defs>
        <circle
          className="text-gray-200"
          strokeWidth={strokeWidth}
          stroke="currentColor"
          fill="transparent"
          r={radius}
          cx={size / 2}
          cy={size / 2}
        />
        <circle
          stroke={`url(#${gradientId})`}
          strokeWidth={strokeWidth}
          strokeDasharray={`${circumference} ${circumference}`}
          style={{ strokeDashoffset: offset }}
          strokeLinecap="round"
          fill="transparent"
          r={radius}
          cx={size / 2}
          cy={size / 2}
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="text-xs font-bold text-zinc-800 leading-none">
          {scoreString}
        </span>
      </div>
    </div>
  );
}

// Sidebar NavLink Wrapper (from the locked version)
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
    <Link // Use Link instead of NavLink to avoid className function prop complexities here
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
// ---------------------

export default function DashboardRoute() {
  // Get data from the loader, including the isLocked flag
  const {
    isLocked,
    mostSearched,
    recentProfile, // Will be null if not locked / no data
    countries,
    fallacies,
    upgradeItems,
  } = useLoaderData<typeof loader>();

  // Use a consistent variable for the year if needed, though it wasn't used conditionally
  const currentYear = new Date().getFullYear();
  const inactiveClassName =
    "text-zinc-600 hover:text-zinc-900 hover:bg-gray-50 font-medium"; // For logout link

  return (
    <div className="flex h-screen overflow-hidden bg-slate-50 font-['Inter']">
      {/* --- Sidebar (Using SidebarNavLink Wrapper) --- */}
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
          {/* --- Use SidebarNavLink wrapper --- */}
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
          {/* --- Sidebar Upgrade Card (Conditional Icon) --- */}
          <div className="px-4">
            <div className="p-4 bg-gradient-to-br from-sky-500 to-blue-700 rounded-xl text-white relative overflow-hidden">
              <div className="absolute -top-4 -right-8 w-24 h-24 bg-white/10 rounded-full"></div>
              <div className="absolute -bottom-8 -left-4 w-32 h-32 bg-white/5 rounded-full"></div>
              <div className="relative z-10 text-center">
                <div className="flex justify-center mb-2">
                  <div className="flex items-center justify-center h-10 w-10 rounded-full bg-white/20">
                    <img
                      // Conditionally select icon based on lock status
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
                {/* Make button link to upgrade page */}
                <Link
                  to="/upgrade"
                  className="block w-full bg-white text-sky-600 text-sm font-semibold py-1.5 px-4 rounded-md hover:bg-gray-100 transition-colors"
                >
                  Upgrade
                </Link>
              </div>
            </div>
          </div>
          {/* --- User Profile & Logout --- */}
          <div className="flex-shrink-0 mt-auto px-4 pb-4 pt-5">
            <hr className="border-gray-200 mb-4" />
            <div className="flex items-center p-2 bg-slate-100 rounded-lg mb-4">
              <img
                className="inline-block h-9 w-9 rounded-full object-cover"
                src="/images/avatar-user.png" // Should likely come from loader data too
                alt="User Avatar"
              />
              <div className="ml-3">
                <p className="text-sm font-semibold text-zinc-800 leading-none">
                  Robert R {/* Should come from loader data */}
                </p>
                <p className="text-xs font-medium text-neutral-500 leading-none mt-0.5">
                  robert14r@gmail.com {/* Should come from loader data */}
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
              />
              Logout
            </Link>
          </div>
        </div>
      </div>

      {/* --- Main Content Area Wrapper --- */}
      <div className="md:pl-64 flex flex-col flex-1">
        {/* --- Top Bar (No changes based on lock status needed here) --- */}
        <div className="sticky top-0 z-10 flex-shrink-0 flex h-16 bg-white border-b border-gray-200">
          <div className="flex-1 px-4 flex justify-between sm:px-6 lg:px-8">
            <div className="flex-1 flex items-center">
              <form className="w-full flex md:ml-0" action="#" method="GET">
                <label htmlFor="search-field" className="sr-only">
                  Search
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
                    placeholder="Search profiles..." // Updated placeholder
                    type="search"
                    name="search"
                  />
                </div>
              </form>
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

        {/* --- Page Content --- */}
        <main className="flex-1 overflow-y-auto bg-slate-50">
          <div className="py-6">
            <div className="max-w-full mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 xl:grid-cols-3 gap-6">
              {/* --- Left Column (formerly Middle) --- */}
              <div className="xl:col-span-1 space-y-6">
                <div className="px-1">
                  <h2 className="text-xl font-semibold text-zinc-800 mb-1">
                    Most Searched this Week
                  </h2>
                  <p className="text-xs text-zinc-500 opacity-70">
                    {isLocked
                      ? "Upgrade to view full profiles."
                      : "Some of our most popular searches this week."}
                  </p>
                </div>
                {/* --- Profile List (Conditional Locking) --- */}
                <div className="bg-white shadow-sm rounded-xl border border-slate-100 divide-y divide-gray-100">
                  {mostSearched.map(
                    (profile: MostSearchedProfile, index: number) => (
                      // Apply locked styles conditionally based on the main isLocked flag
                      <div
                        key={`${profile.name}-${index}`}
                        className={`flex items-center justify-between gap-4 px-4 py-3 group ${
                          isLocked
                            ? "opacity-60 cursor-not-allowed"
                            : "hover:bg-slate-50" // Add hover for unlocked
                        }`}
                        // Prevent clicking if locked, maybe link to profile page if unlocked
                        onClick={
                          isLocked ? (e) => e.preventDefault() : undefined
                        }
                        // Optionally wrap in a Link if unlocked:
                        // {isLocked ? (...) : <Link to={`/profiles/${profile.id}`}> (...)</Link>}
                      >
                        <div className="flex items-center gap-3 flex-1 min-w-0">
                          <img
                            className={`h-10 w-10 rounded-full flex-shrink-0 object-cover ${
                              isLocked ? "grayscale" : "" // Apply grayscale if locked
                            }`}
                            src={profile.avatar}
                            alt={`${profile.name} avatar`}
                          />
                          <div className="min-w-0">
                            <p className="text-sm font-semibold text-stone-900 truncate">
                              {profile.name}
                            </p>
                            <p className="text-xs text-zinc-500 truncate">
                              {profile.title}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center flex-shrink-0 gap-3 ml-4">
                          <img
                            className={`h-6 w-6 object-contain ${
                              // Adjusted size like unlocked version
                              isLocked ? "grayscale opacity-50" : "" // Apply grayscale/opacity if locked
                            }`}
                            src={profile.logo}
                            alt={`${profile.title} logo`}
                          />
                          {/* Show LockIcon if locked, ScoreCircle if unlocked */}
                          {isLocked ? (
                            <LockIcon />
                          ) : (
                            <ScoreCircle score={profile.score} />
                          )}
                        </div>
                      </div>
                    )
                  )}
                </div>
                <div className="text-center pt-1">
                  {/* Link to an "all profiles" page */}
                  <Link
                    to="/dashboard/all-profiles"
                    className="px-4 py-1 bg-sky-500 text-white text-xs font-semibold rounded hover:bg-sky-600 transition-colors"
                  >
                    View All
                  </Link>
                </div>

                {/* --- Conditional "My Recent Profile" Card --- */}
                {isLocked && recentProfile && (
                  // Render the detailed card from the locked version
                  <div className="bg-white shadow-sm rounded-xl border border-slate-100 p-4">
                    <div className="flex items-center justify-between gap-4 mb-3">
                      <div className="flex items-center gap-3 flex-1 min-w-0">
                        <img
                          className="h-10 w-10 rounded-full flex-shrink-0 object-cover"
                          src={recentProfile.avatar}
                          alt={`${recentProfile.name} avatar`}
                        />
                        <div className="min-w-0">
                          <p className="text-sm font-semibold text-stone-900 truncate">
                            {recentProfile.name}
                          </p>
                          <p className="text-xs text-zinc-500 truncate">
                            {recentProfile.title}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center flex-shrink-0 gap-3 ml-4">
                        <img
                          className="h-5 w-5 object-contain grayscale opacity-70" // Style from locked version
                          src={recentProfile.logo}
                          alt={`${recentProfile.title} logo`}
                        />
                        <ScoreGaugeRecent scoreString={recentProfile.score} />
                      </div>
                    </div>
                    <hr className="border-gray-100 mb-3" />
                    <div className="flex items-start gap-2">
                      <img
                        src="/icons/report-doc-blue.svg" // Icon from locked version
                        alt="Report"
                        className="h-5 w-5 text-gray-400 mt-0.5 flex-shrink-0"
                      />
                      <div className="flex-1">
                        <h4 className="text-sm font-semibold text-zinc-800 mb-1.5 leading-tight">
                          {recentProfile.report.title}
                        </h4>
                        <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-xs">
                          <p className="text-gray-500">
                            Main Speaker:{" "}
                            <span className="text-gray-700 font-medium">
                              {recentProfile.report.speaker}
                            </span>
                          </p>
                          <p className="text-gray-500">
                            Date:{" "}
                            <span className="text-gray-700 font-medium">
                              {recentProfile.report.date}
                            </span>
                          </p>
                          <p className="text-gray-500">
                            Source:{" "}
                            <span className="text-gray-700 font-medium">
                              {recentProfile.report.source}
                            </span>
                          </p>
                          <p className="text-gray-500">
                            Custom:{" "}
                            <span className="text-gray-700 font-medium">
                              {recentProfile.report.customDate}
                            </span>
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {!isLocked && (
                  // Render the simpler card from the original unlocked version
                  <div className="bg-white shadow-sm rounded-xl p-5 border border-slate-100">
                    <h3 className="text-lg font-semibold text-zinc-800 mb-2">
                      My Recent Profile
                    </h3>
                    <p className="text-xs text-zinc-500">
                      {/* Placeholder or link to view recent activity */}
                      View your recently accessed or created profiles here.
                    </p>
                    {/* Add more content here if available for unlocked users */}
                  </div>
                )}
              </div>

              {/* --- Right Column --- */}
              {/* This content seems mostly static or driven by non-lock-specific data */}
              {/* No major changes needed here based on isLocked, unless the data source changes */}
              <div className="xl:col-span-2 space-y-6">
                {/* Top Buttons */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <Link // Use Link for navigation
                    to="/dashboard/make-your-own"
                    className="flex items-center justify-center gap-2 px-6 py-4 bg-sky-600 text-white rounded-lg shadow hover:bg-sky-700 transition-colors text-base font-semibold"
                  >
                    <img
                      src="/icons/add-circle-white.svg"
                      alt=""
                      className="h-5 w-5"
                    />
                    Make Your Own
                  </Link>
                  <Link // Use Link for navigation
                    to="/dashboard/my-reports?filter=new" // Example link
                    className="flex items-center justify-center gap-2 px-6 py-4 bg-white text-zinc-600 rounded-xl border border-slate-200 shadow-sm hover:bg-slate-50 transition-colors text-base font-semibold"
                  >
                    <img
                      src="/icons/report-doc-blue.svg"
                      alt=""
                      className="h-5 w-5"
                    />
                    New Reports this Week
                  </Link>
                </div>

                {/* Metrics Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Average TruthMetric */}
                  <div className="bg-white shadow-sm rounded-xl p-5 flex flex-col items-center justify-between border border-slate-100">
                    <h3 className="text-base font-semibold text-zinc-800 mb-4 self-start">
                      Average TruthMetric
                    </h3>
                    <div className="relative w-36 h-36 mb-4">
                      <svg
                        className="w-full h-full -rotate-90"
                        viewBox="0 0 36 36"
                      >
                        <circle
                          className="text-indigo-100"
                          strokeWidth="4"
                          stroke="currentColor"
                          fill="transparent"
                          r="15.9155"
                          cx="18"
                          cy="18"
                        />
                        <circle
                          className="text-sky-600"
                          strokeWidth="4"
                          strokeDasharray={`${100 * 0.78}, ${100}`} // Example 78%
                          strokeLinecap="round"
                          stroke="currentColor"
                          fill="transparent"
                          r="15.9155"
                          cx="18"
                          cy="18"
                        />
                      </svg>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="flex items-baseline text-3xl font-bold text-black leading-none">
                          78<span className="text-base font-semibold">%</span>
                        </span>
                      </div>
                    </div>
                    <div className="flex justify-between w-full text-center mt-2">
                      <div>
                        <p className="text-3xl font-semibold text-zinc-800">
                          3
                        </p>
                        <p className="text-[11px] font-medium text-zinc-500 opacity-90 leading-tight mt-1">
                          Average Fallacies
                          <br />
                          per report
                        </p>
                      </div>
                      <div>
                        <p className="text-3xl font-semibold text-zinc-800">
                          83<span className="text-lg">%</span>
                        </p>
                        <p className="text-[11px] font-medium text-zinc-500 opacity-90 leading-tight mt-1">
                          Average Logic
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Profile Checks & Country Data */}
                  <div className="bg-white shadow-sm rounded-xl p-5 border border-slate-100">
                    <h3 className="text-sm font-semibold text-zinc-800">
                      Profile Checks in last 30 minutes
                    </h3>
                    <p className="text-2xl font-bold text-zinc-800 mt-1">
                      16.5K
                    </p>
                    <p className="text-xs font-medium text-neutral-400 mb-4">
                      Checks per minute
                    </p>
                    <div className="h-20 flex items-end gap-px bg-slate-50 p-1 rounded mb-6">
                      {[
                        40, 20, 30, 10, 50, 40, 35, 60, 5, 15, 40, 10, 55, 3,
                        35, 50, 20, 55, 45, 8, 42, 18, 52, 70, 22, 44, 6, 58,
                        65, 19, 38, 28, 4, 24, 68, 12, 33, 21, 26, 66,
                      ].map((height, i) => (
                        <div
                          key={i}
                          className="w-[2.5px] bg-sky-500 rounded-t-sm"
                          style={{ height: `${height}%` }}
                        ></div>
                      ))}
                    </div>
                    <hr className="border-gray-100 -mx-5 mb-4" />
                    <div className="flex justify-between items-center mb-4">
                      <h3 className="text-sm font-semibold text-zinc-800">
                        Profile Added by Country
                      </h3>
                    </div>
                    <ul className="space-y-3.5">
                      {countries.map((country: CountryData) => (
                        <li key={country.name}>
                          <div className="flex justify-between items-center mb-1.5">
                            <div className="flex items-center">
                              <img
                                src={country.flag}
                                alt={`${country.name} flag`}
                                className="w-4 h-4 mr-2 rounded-sm object-cover"
                              />
                              <p className="text-sm font-semibold text-zinc-800">
                                {(country.value / 1000).toFixed(0)}k{" "}
                                <span className="text-xs font-normal text-neutral-400">
                                  {country.name}
                                </span>
                              </p>
                            </div>
                            <p
                              className={`text-xs font-semibold flex items-center ${
                                country.trend === "up"
                                  ? "text-green-500"
                                  : "text-red-500"
                              }`}
                            >
                              <img
                                src={
                                  country.trend === "up"
                                    ? "/icons/arrow-up-green.svg"
                                    : "/icons/arrow-down-red.svg"
                                }
                                alt=""
                                className="h-3 w-3 mr-0.5"
                              />
                              {country.percentage}%
                            </p>
                          </div>
                          <div className="w-full bg-indigo-100 rounded-full h-1.5">
                            <div
                              className="bg-sky-500 h-1.5 rounded-full"
                              style={{ width: `${country.percentage * 2.5}%` }}
                            ></div>{" "}
                            {/* Scaling factor might need adjustment */}
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Common Fallacies Card */}
                  <div className="bg-white shadow-sm rounded-xl p-5 border border-slate-100">
                    <h3 className="text-base font-semibold text-zinc-800 mb-1">
                      Common Fallacies
                    </h3>
                    <p className="text-sm font-medium text-neutral-400 mb-4">
                      Last 7 days
                    </p>
                    <div className="space-y-2">
                      {fallacies.map((fallacy: FallacyData) => (
                        <div
                          key={fallacy.name}
                          className="flex justify-between items-center bg-gray-50 px-2.5 py-1 rounded-md"
                        >
                          <span className="text-sm font-medium text-zinc-700">
                            {fallacy.name}
                          </span>
                          <span className="text-xs font-semibold text-sky-700 bg-sky-100 px-2 py-0.5 rounded-full">
                            {fallacy.percentage}%
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Upgrade Card */}
                  <div className="bg-white shadow-sm rounded-xl p-5 border border-slate-100">
                    <h3 className="text-base font-semibold text-zinc-800 mb-3">
                      Upgrade and Access More
                    </h3>
                    <ul className="space-y-0">
                      {upgradeItems.map(
                        (item: UpgradeItemData, index: number) => (
                          <li
                            key={item.name}
                            className={`flex items-center justify-between py-2.5 ${
                              index !== 0 ? "border-t border-gray-100" : ""
                            }`}
                          >
                            <div className="flex items-center gap-3">
                              <div className="flex items-center justify-center h-8 w-8 rounded-lg bg-sky-50">
                                <img
                                  src={item.icon}
                                  alt=""
                                  className="h-4 w-4 text-sky-600"
                                />
                              </div>
                              <span className="text-sm font-semibold text-zinc-800">
                                {item.name}
                              </span>
                            </div>
                            <Link
                              to="/upgrade"
                              className="text-sm font-medium text-sky-600 hover:underline flex items-center gap-1"
                            >
                              Add{" "}
                              <img
                                src="/icons/add-circle-blue.svg"
                                alt=""
                                className="h-4 w-4"
                              />
                            </Link>
                          </li>
                        )
                      )}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
