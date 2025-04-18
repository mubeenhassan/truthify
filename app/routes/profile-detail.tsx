// app/routes/profile-detail.tsx
// Renders a static profile detail page visually matching image_232fa6.png
// Accessed via a generic, non-parameterized URL (e.g., /profile-detail)

import type { LoaderFunctionArgs, MetaFunction } from "@remix-run/node";
import { Link, useLoaderData, useMatch } from "@remix-run/react";
import React from "react"; // Import React (implicitly used by JSX)

// --- Type Definitions ---
interface ProfileDetail {
  id: string;
  name: string;
  title: string;
  avatarUrl: string;
  companyLogoUrl: string;
  integrityScore: number;
  comparativeScorePercent: number;
  reports: ReportSummary[];
  fallacies: FallacyItemData[];
  totalReportsAvailable: number;
}
interface ReportSummary {
  id: string;
  title: string;
  mainSpeaker: string;
  source: string;
  date: string;
  customInfo?: string;
  iconUrl: string;
}
interface FallacyItemData {
  id: string;
  title: string;
  thumbnailUrl: string;
  platformIconUrl: string;
  date: string;
  conclusion: string;
  count: number;
  tags: string[];
}
interface UserData {
  name: string;
  email: string;
  avatar: string;
}

// --- MOCK DATA (Specific to Elizabeth Holmes, as per the visual target) ---
const MOCK_PROFILE_DETAIL: ProfileDetail = {
  id: "elizabeth-holmes-static",
  name: "Elizabeth Holmes",
  title: "CEO of Theranos",
  avatarUrl: "/images/avatar-elizabeth.png", // Placeholder
  companyLogoUrl: "/icons/therenos-logo.svg", // Placeholder small icon
  integrityScore: 3.7,
  comparativeScorePercent: 12.7,
  totalReportsAvailable: 126,
  reports: [
    {
      id: "r1",
      title: "Elizabeth Holmes Interview Oct 13",
      mainSpeaker: "Elizabeth Holmes",
      source: "Youtube",
      date: "Feb 20 2020",
      iconUrl: "/icons/report-doc-blue.svg",
    },
    {
      id: "r2",
      title: "Elizabeth Holmes Interview Oct 13",
      mainSpeaker: "Elizabeth Holmes",
      source: "Youtube",
      date: "Feb 20 2020",
      customInfo: "Feb 20 2020",
      iconUrl: "/icons/report-doc-blue.svg",
    },
  ],
  fallacies: [
    {
      id: "f1",
      title:
        "Interview : Theranos’s Elizabeth Holmes on the Lifeblood of the Internet - FULL CONVERSATION",
      thumbnailUrl: "/images/fallacy-thumb-1.png",
      platformIconUrl: "/icons/youtube.svg",
      date: "13 Oct 2015",
      conclusion: "Conclusion and Number of Fallacies: 9",
      count: 9,
      tags: [
        "Non Sequitur",
        "Circular Reasoning",
        "Affirming the Consequent",
        "Appeal to Novelty",
        "False Dichotomy",
        "Cherry Picking",
        "Oversimplification",
      ],
    },
    {
      id: "f2",
      title:
        "Interview :Jonathan Zittrain in conversation with Elizabeth Holmes",
      thumbnailUrl: "/images/fallacy-thumb-2.png",
      platformIconUrl: "/icons/youtube.svg",
      date: "12 Oct 2018",
      conclusion: "Conclusion and Number of Fallacies: 8",
      count: 8,
      tags: [
        "Non Sequitur",
        "Circular Reasoning",
        "Appeal to Authority",
        "Undistributed Middle",
      ],
    },
    {
      id: "f3",
      title:
        "Interview :Jonathan Zittrain in conversation with Elizabeth Holmes",
      thumbnailUrl: "/images/fallacy-thumb-3.png",
      platformIconUrl: "/icons/youtube.svg",
      date: "12 Oct 2018",
      conclusion: "Conclusion and Number of Fallacies: 8",
      count: 8,
      tags: [
        "Non Sequitur",
        "Circular Reasoning",
        "Appeal to Authority",
        "Undistributed Middle",
      ],
    },
  ],
};
const MOCK_USER: UserData = {
  name: "Robert R",
  email: "robert14r@gmail.com",
  avatar: "/images/avatar-user.png", // Placeholder
};

// --- Loader Function ---
export async function loader({ request }: LoaderFunctionArgs) {
  console.log("Loading static profile detail page data");
  return Response.json({ profile: MOCK_PROFILE_DETAIL, user: MOCK_USER });
}

// --- Meta Function ---
export const meta: MetaFunction<typeof loader> = ({ data }) => {
  const profileName = data?.profile?.name ?? "Profile Detail";
  return [
    { title: `${profileName} - Truthify` },
    {
      name: "description",
      content: `Profile scores and analysis for ${profileName}.`,
    },
  ];
};

// --- Helper Components ---

function Icon({
  src,
  alt = "",
  className = "",
}: {
  src: string;
  alt?: string;
  className?: string;
}) {
  return (
    <img
      src={src}
      alt={alt}
      className={`inline-block ${className}`}
      aria-hidden={alt === ""}
    />
  );
}

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
  const activeClassName = "text-sky-600 bg-sky-50/60 font-semibold";
  const inactiveClassName =
    "text-zinc-700 hover:text-zinc-900 hover:bg-gray-100 font-medium";
  const baseIconClass = "mr-3 flex-shrink-0 h-5 w-5 opacity-80";
  return (
    <Link
      to={to}
      className={`group flex items-center px-3 py-2.5 text-sm rounded-md relative ${
        isActive ? activeClassName : inactiveClassName
      }`}
    >
      <Icon
        src={iconSrc}
        className={`${baseIconClass} ${isActive ? "opacity-100" : ""}`}
      />
      {children}
      {isActive && (
        <div className="absolute right-0 inset-y-1 w-1 bg-sky-600 rounded-l-lg"></div>
      )}
    </Link>
  );
}

function LargeScoreGauge({
  score,
  maxScore = 10, // Assuming max score is 10 based on visual? Adjust if needed.
  radius = 110,
  strokeWidth = 32,
}: {
  score: number;
  maxScore?: number;
  radius?: number;
  strokeWidth?: number;
}) {
  const center = radius + strokeWidth / 2;
  const circumference = Math.PI * radius; // Only need half for semi-circle
  const scorePercentage = Math.min(Math.max(0, score), maxScore) / maxScore; // Clamp score between 0 and maxScore
  const strokeDashoffsetValue = circumference * (1 - scorePercentage);

  // Determine color based on score (example thresholds, adjust as needed)
  let scoreColorClass = "stroke-green-500"; // Default: Good
  if (score < 3.5) {
    scoreColorClass = "stroke-red-500"; // Low score: Bad
  } else if (score < 7) {
    scoreColorClass = "stroke-yellow-400"; // Medium score: Okay
  }

  // SVG path function for a semi-circle arc (adjust angles as needed)
  const describeArc = (
    cx: number,
    cy: number,
    r: number,
    startAngle: number,
    endAngle: number
  ): string => {
    const start = polarToCartesian(cx, cy, r, endAngle);
    const end = polarToCartesian(cx, cy, r, startAngle);
    const largeArcFlag = endAngle - startAngle <= 180 ? "0" : "1";
    // Use sweep flag 0 for standard semi-circle
    return `M ${start.x} ${start.y} A ${r} ${r} 0 ${largeArcFlag} 0 ${end.x} ${end.y}`;
  };

  const polarToCartesian = (
    cx: number,
    cy: number,
    r: number,
    angleInDegrees: number
  ) => {
    const angleInRadians = ((angleInDegrees - 180) * Math.PI) / 180.0; // Start from left horizontal (-180 deg)
    return {
      x: cx + r * Math.cos(angleInRadians),
      y: cy + r * Math.sin(angleInRadians),
    };
  };

  return (
    <div className="relative w-[284px] h-[142px]">
      {" "}
      {/* Width ~= 2*center, Height ~= center */}
      <svg
        width="100%"
        height="100%"
        viewBox={`0 0 ${center * 2} ${center + strokeWidth / 2}`} // Adjusted height to fit arc bottom
        className="absolute top-0 left-0"
        aria-label={`Integrity score gauge showing ${score.toFixed(
          1
        )} out of ${maxScore}`}
      >
        {/* Background Track */}
        <path
          d={describeArc(center, center, radius, 0, 180)} // 0 to 180 degrees for semi-circle
          className="stroke-gray-200"
          strokeWidth={strokeWidth}
          fill="none"
        />
        {/* Score Arc */}
        <path
          d={describeArc(center, center, radius, 0, 180)}
          className={scoreColorClass} // Dynamic color based on score
          strokeWidth={strokeWidth}
          fill="none"
          strokeLinecap="round" // Rounded end for the score arc
          style={{
            strokeDasharray: `${circumference}, ${circumference}`,
            strokeDashoffset: strokeDashoffsetValue,
            transition: "stroke-dashoffset 0.5s ease-in-out", // Smooth transition
          }}
        />
      </svg>
      {/* Text positioned absolutely inside the container */}
      <div className="absolute inset-0 flex flex-col items-center justify-end pb-3 pointer-events-none">
        <div className="text-stone-900 text-3xl font-extrabold">
          {score.toFixed(1)}
        </div>
        <div className="text-zinc-700 text-sm font-medium mt-0">
          Total Integrity Score
        </div>
      </div>
    </div>
  );
}

// --- Main Page Component ---
export default function ProfileDetailPage() {
  const { profile, user } = useLoaderData<typeof loader>();
  const inactiveClassName =
    "text-zinc-700 hover:text-zinc-900 hover:bg-gray-100 font-medium";

  return (
    <div className="flex h-screen max-h-screen overflow-hidden bg-white font-['Inter'] text-sm">
      {/* --- Sidebar --- */}
      <div className="hidden md:flex md:w-64 md:flex-col md:fixed md:inset-y-0">
        <div className="flex flex-col flex-grow border-r border-gray-200 bg-white overflow-y-auto">
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
            <p className="text-xs font-bold text-neutral-500/80 uppercase tracking-wider">
              Dashboard
            </p>
          </div>
          {/* Nav Links */}
          <nav className="flex-1 mt-1 px-3 space-y-1 text-sm">
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
            <div className="p-4 bg-gradient-to-br from-sky-500 to-blue-600 rounded-xl text-white relative overflow-hidden">
              <div className="relative z-10 text-center">
                <div className="inline-flex items-center justify-center space-x-2 mb-2">
                  <span className="text-2xl font-semibold leading-none">3</span>
                  <div className="w-6 h-7 bg-blue-800/70 rounded-sm flex items-center justify-center shadow-inner">
                    <Icon
                      src="/icons/check-icon-white.svg"
                      className="w-4 h-4 opacity-90"
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
                  className="block w-full bg-white text-sky-600 text-sm font-semibold py-1.5 px-4 rounded-md hover:bg-gray-100 transition-colors shadow-sm"
                >
                  Upgrade
                </Link>
              </div>
            </div>
          </div>
          {/* User Profile & Logout */}
          <div className="flex-shrink-0 mt-auto px-4 pb-4 pt-5">
            <hr className="border-gray-200 mb-4" />
            <div className="flex items-center p-2 bg-slate-100 rounded-lg mb-2">
              <img
                className="inline-block h-9 w-9 rounded-full object-cover ring-1 ring-slate-200"
                src={user.avatar}
                alt="User Avatar"
              />
              <div className="ml-3 flex-1 min-w-0">
                <p className="text-sm font-semibold text-zinc-800 leading-none truncate">
                  {user.name}
                </p>
                <p className="text-xs font-medium text-neutral-500 leading-none mt-0.5 truncate">
                  {user.email}
                </p>
              </div>
              <Icon
                src="/icons/chevron-down.svg"
                className="w-3 h-3 text-gray-500 ml-1 flex-shrink-0"
              />
            </div>
            <Link
              to="/logout"
              className={`${inactiveClassName} group flex items-center px-3 py-2.5 text-sm rounded-md`}
            >
              <Icon
                src="/icons/logout.svg"
                className="mr-3 h-5 w-5 text-gray-400 group-hover:text-gray-500 opacity-80"
              />
              Logout
            </Link>
          </div>
        </div>
      </div>

      {/* --- Main Content Area --- */}
      <div className="md:pl-64 flex flex-col flex-1 overflow-hidden">
        {/* --- Header --- */}
        <div className="sticky top-0 z-20 flex-shrink-0 flex h-16 bg-white border-b border-gray-200 px-4 sm:px-6 lg:px-7">
          {/* Search Input */}
          <div className="flex-1 flex items-center">
            <div className="relative w-full max-w-sm text-gray-400 focus-within:text-gray-600">
              <input
                id="user-input-field"
                className="block w-full h-10 pl-3 pr-3 py-2 border border-slate-200 rounded-lg text-gray-500 placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-sky-500 focus:border-sky-500 sm:text-sm"
                placeholder="Satya Na|"
                type="text"
                name="user_input"
              />
            </div>
          </div>
          {/* Right side icons/buttons */}
          <div className="ml-4 flex items-center md:ml-6 gap-3">
            <button
              type="button"
              className="px-5 h-9 bg-sky-600 rounded text-white text-xs font-semibold font-['Inter'] leading-3 inline-flex items-center gap-1.5 hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500 shadow-sm"
            >
              <Icon
                src="/icons/make-your-own-icon-white.svg"
                className="w-4 h-4"
              />
              Make Your Own
            </button>
            <button
              type="button"
              className="p-2.5 w-10 h-10 bg-orange-50 rounded-lg text-amber-600 hover:bg-orange-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500 relative flex items-center justify-center"
            >
              <span className="sr-only">View notifications</span>
              <Icon src="/icons/bell.svg" className="h-5 w-5" />
              <span className="absolute top-2 right-2 block h-1.5 w-1.5 rounded-full bg-rose-500 ring-1 ring-orange-50"></span>
            </button>
            <img
              className="h-10 w-10 rounded-lg object-cover"
              src={user.avatar}
              alt="User Avatar"
            />
          </div>
        </div>

        {/* --- Profile Content Area (Scrollable with two columns) --- */}
        <main className="flex-1 flex max-h-[calc(100vh-4rem)] overflow-hidden bg-slate-50">
          {/* Left Column */}
          <div className="w-[472px] flex-shrink-0 border-r border-gray-200 overflow-y-auto p-6 bg-white">
            {/* Tabs */}
            <div className="mb-6 flex items-center space-x-1 text-sm">
              <button className="px-4 py-1.5 bg-sky-600 rounded-md shadow-sm text-white font-medium leading-tight">
                Profile Scores
              </button>
              <button className="px-4 py-1.5 rounded-md text-zinc-600 font-medium hover:bg-gray-100 leading-tight">
                Cumulative Metrics
              </button>
              <div className="h-4 w-px bg-neutral-200 mx-1"></div>
              <button className="px-4 py-1.5 rounded-md text-zinc-600 font-medium hover:bg-gray-100 leading-tight">
                Report Scores
              </button>
            </div>
            {/* Profile Header */}
            <div className="flex items-center gap-4 mb-6">
              <img
                className="w-20 h-20 rounded-full flex-shrink-0 object-cover border border-gray-100"
                src={profile.avatarUrl}
                alt={`${profile.name} avatar`}
              />
              <div className="flex-1 min-w-0">
                <h1 className="text-zinc-800 text-lg font-semibold truncate">
                  {profile.name}
                </h1>
                <p className="text-zinc-500 text-sm truncate">
                  {profile.title}
                </p>
              </div>
              <img
                className="w-10 h-10 flex-shrink-0 object-contain"
                src={profile.companyLogoUrl}
                alt={`${profile.title} logo`}
              />
            </div>
            {/* Large Score Gauge Area */}
            <div className="relative flex flex-col items-center mb-4 pt-2">
              <LargeScoreGauge score={profile.integrityScore} />
            </div>
            {/* Score Explanation Text */}
            <p className="text-center text-zinc-700 text-xs font-normal leading-relaxed mb-8">
              The integrity score is a measure of how consistently and <br />
              habitually one repeats their{" "}
              <strong className="font-bold text-zinc-800">
                Positive or Negative Attributes
              </strong>
              .
            </p>
            {/* Available Reports Card */}
            <div className="p-5 bg-white rounded-lg border border-slate-200 shadow-sm bg-[radial-gradient(ellipse_at_bottom_right,_var(--tw-gradient-stops))] from-blue-50/60 via-white to-white">
              <div className="flex justify-between items-start mb-3">
                <div>
                  <h3 className="text-zinc-800 text-base font-semibold">
                    Available Reports
                  </h3>
                  <p className="text-zinc-600 text-xs font-normal leading-tight mt-0.5">
                    Most Recent - Background Integrity Check
                  </p>
                </div>
                <div className="text-center flex-shrink-0 ml-2">
                  <p className="text-indigo-700 text-2xl font-extrabold">
                    {profile.totalReportsAvailable}
                  </p>
                  <p className="text-zinc-700 text-xs font-medium leading-tight mt-0.5">
                    Total Reports
                    <br />
                    Available
                  </p>
                </div>
              </div>
              <div className="space-y-2.5 mb-4">
                {/* --- FIX 1: Added type ReportSummary --- */}
                {profile.reports.slice(0, 2).map((report: ReportSummary) => (
                  <div
                    key={report.id}
                    className="p-2.5 bg-white rounded-lg border border-gray-200/90 shadow-[0px_1px_4px_0px_rgba(169,169,169,0.2)] flex items-center gap-2.5 hover:border-gray-300"
                  >
                    <div className="w-9 h-9 flex-shrink-0 flex items-center justify-center rounded bg-sky-50">
                      <Icon
                        src={report.iconUrl}
                        alt=""
                        className="w-6 h-6 text-sky-600"
                      />
                    </div>
                    <div className="flex-1 text-[10.5px] leading-[1.3] overflow-hidden">
                      <p className="text-zinc-800 text-[13px] font-semibold truncate mb-1">
                        {report.title}
                      </p>
                      <div className="flex justify-between text-zinc-600/90 mb-0.5">
                        <span>
                          Main Speaker:{" "}
                          <span className="font-bold text-zinc-700">
                            {report.mainSpeaker}
                          </span>
                        </span>
                        <span>
                          Date:{" "}
                          <span className="font-semibold text-zinc-700">
                            {report.date}
                          </span>
                        </span>
                      </div>
                      <div className="flex justify-between text-zinc-600/90">
                        <span>
                          Source:{" "}
                          <span className="font-semibold text-zinc-700">
                            {report.source}
                          </span>
                        </span>
                        {report.customInfo && (
                          <span>
                            Custom:{" "}
                            <span className="font-semibold text-zinc-700">
                              {report.customInfo}
                            </span>
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="text-center mt-3">
                <button className="px-3 py-1 bg-sky-500 rounded text-white text-[10px] font-semibold leading-none hover:bg-sky-600 focus:outline-none focus:ring-2 focus:ring-sky-400 focus:ring-offset-1">
                  View All
                </button>
              </div>
            </div>
          </div>
          {/* Right Column */}
          <div className="flex-1 overflow-y-auto p-6 bg-slate-50 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
            {/* Comparative Analysis Card */}
            <div className="p-5 bg-white rounded-lg border border-slate-200 shadow-sm mb-6">
              <div className="mb-6">
                <h3 className="text-zinc-800 text-xl font-semibold leading-tight">
                  Comparative Analysis
                </h3>
                <p className="text-zinc-500 text-xs font-normal leading-3 mt-1">
                  {profile.name}
                </p>
              </div>
              <div className="relative h-24 mb-4">
                <div className="absolute top-1/2 -translate-y-1/2 h-[5px] w-full bg-gradient-to-r from-red-600 via-amber-400 to-green-600 rounded-full"></div>
                <div className="absolute top-1/2 -translate-y-1/2 left-1/2 w-2 h-2 -ml-1 bg-zinc-700 rounded-full z-10"></div>
                {typeof profile.comparativeScorePercent === "number" &&
                  !isNaN(profile.comparativeScorePercent) && (
                    <div
                      className="absolute top-1/2 -translate-y-1/2 z-20"
                      style={{
                        left: `calc(${Math.max(
                          0,
                          Math.min(100, profile.comparativeScorePercent)
                        )}% - 8px)`,
                      }}
                    >
                      <div className="absolute -top-[60px] left-1/2 -translate-x-1/2 flex flex-col items-center w-max">
                        <div className="p-0.5 bg-zinc-800 rounded shadow-md mb-1 w-[36px] h-[36px] flex items-center justify-center">
                          <img
                            className="w-8 h-8 rounded-sm object-cover"
                            src={profile.avatarUrl}
                            alt=""
                          />
                        </div>
                      </div>
                      <div className="w-4 h-4 bg-zinc-800 rounded-full ring-[3px] ring-white shadow"></div>
                      <div className="absolute top-6 left-1/2 -translate-x-1/2 whitespace-nowrap text-center mt-1">
                        <p className="text-zinc-800 text-xl font-bold">
                          {profile.comparativeScorePercent.toFixed(1)}%
                        </p>
                        <p className="text-zinc-600 text-xs mt-0.5">
                          {profile.name}
                        </p>
                      </div>
                    </div>
                  )}
                <div className="absolute top-full w-full flex justify-between text-zinc-500 text-xs mt-2.5">
                  <span>0</span>
                  <span>50%</span>
                  <span>100</span>
                </div>
              </div>
            </div>
            {/* Fallacy Detection Card */}
            <div className="p-5 bg-white rounded-lg border border-gray-200 shadow-sm relative">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-zinc-800 text-lg font-semibold">
                  Fallacy Detection
                </h3>
              </div>
              <div className="relative">
                <div className="space-y-4 divide-y divide-zinc-100 max-h-[470px] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100 pr-3 pb-12">
                  {/* --- FIX 2: Added type FallacyItemData --- */}
                  {profile.fallacies.map((fallacy: FallacyItemData) => (
                    <div key={fallacy.id} className="pt-4 flex gap-4">
                      <div className="relative flex-shrink-0">
                        <img
                          src={fallacy.thumbnailUrl}
                          alt="Fallacy thumbnail"
                          className="w-32 h-[74px] object-cover bg-zinc-200 rounded-md"
                        />
                        <div className="absolute bottom-1.5 left-1.5 w-6 h-6 bg-red-600 rounded flex items-center justify-center shadow">
                          <Icon
                            src={fallacy.platformIconUrl}
                            alt="Platform"
                            className="h-3.5 w-3.5"
                          />
                        </div>
                      </div>
                      <div className="flex-1 text-[11px] leading-relaxed">
                        <p className="font-semibold text-zinc-800 text-[12px] mb-1 line-clamp-2">
                          {fallacy.title}
                        </p>
                        <p className="text-zinc-400 text-[10px] font-medium mb-1.5">
                          {fallacy.date}
                        </p>
                        <p className="text-zinc-600 font-medium text-[11px] mb-1.5">
                          {fallacy.conclusion}
                        </p>
                        <p className="text-zinc-700 text-[11px] font-semibold mb-1.5">
                          {fallacy.count} Fallacies Found:
                        </p>
                        <div className="flex flex-wrap gap-1.5 mb-2">
                          {/* --- FIX 3: Added type string --- */}
                          {fallacy.tags.slice(0, 7).map((tag: string) => (
                            <span
                              key={tag}
                              className="px-2 py-0.5 bg-gray-100 rounded-[3px] text-zinc-700 text-[10px] border border-gray-200 whitespace-nowrap"
                            >
                              {tag}
                            </span>
                          ))}
                          {fallacy.tags.length > 7 && (
                            <span className="text-gray-400 text-[10px] self-center">
                              ...
                            </span>
                          )}
                        </div>
                        <p className="text-zinc-500 text-[10px] leading-tight mb-1">
                          These fallacies are identified based on the source.
                        </p>
                        <button className="text-sky-600 text-[10px] font-semibold border-b border-transparent hover:border-sky-600 leading-none">
                          See More
                        </button>
                      </div>
                      <div className="flex-shrink-0">
                        <div className="w-14 h-14 bg-red-500/10 rounded-md flex items-center justify-center">
                          <span className="text-red-500 text-3xl font-semibold">
                            {fallacy.count}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="absolute bottom-0 left-0 right-3 h-12 bg-gradient-to-t from-white via-white/90 to-transparent pointer-events-none"></div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
