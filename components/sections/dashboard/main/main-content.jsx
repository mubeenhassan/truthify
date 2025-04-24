import Link from "next/link";
import Image from "next/image";
import { ProfileList } from "./profile-list";
import { FallacyList } from "./fallacy-list";
import { UpgradeList } from "./upgrade-list";
import ProfileStatsCard from "./profile-stats-card";

export function MainContent({ dashboardData }) {
  const {
    mostSearched,
    recentProfile,
    countries,
    chartData,
    fallacies,
    upgradeItems,
  } = dashboardData;

  return (
    <div className="max-w-full mx-auto grid grid-cols-1 xl:grid-cols-12 gap-6 ">
      <div className="xl:col-span-5 space-y-6 py-4 overflow-hidden">
        <div className="px-1">
          <h2 className="text-xl font-semibold text-zinc-800 mb-1">
            Most Searched this Week
          </h2>
          <p className="text-xs text-zinc-500 opacity-70">
            "Some of our most popular searches this week."
          </p>
        </div>
        <div className="">
        <ProfileList profiles={mostSearched} />
        </div>
        <div className="text-center pt-1">
          <Link
            href="/dashboard/all-profiles"
            className="px-4 py-1 bg-sky-500 text-white text-xs font-semibold rounded hover:bg-sky-600 transition-colors"
          >
            View All
          </Link>
        </div>

        {recentProfile.length > 0 ? (
          <ProfileList profiles={recentProfile} isRecent={true} />
        ) : (
          <div className="bg-white h-32 shadow-sm rounded-xl p-5 border border-slate-100">
            <h3 className="text-lg font-semibold text-zinc-800 mb-2">
              My Recent Profile
            </h3>
            <p className="text-xs text-zinc-500">
              View your recently accessed or created profiles here.
            </p>
          </div>
        )}
      </div>

      <div className="xl:col-span-7 space-y-6 py-4 px-4 bg-[#F5F8FB]">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <Link
            href="/dashboard/make-your-own"
            className="flex items-center justify-center gap-2 px-6 py-4 bg-primary text-white rounded-lg shadow hover:bg-sky-700 transition-colors text-[18px] font-medium"
          >
            <Image
              width={20}
              height={20}
              src="/icons/add-circle-white.svg"
              alt=""
              className="h-5 w-5"
            />
            Make Your Own
          </Link>
          <Link
            href="/dashboard/all-reports?filter=new"
            className="flex items-center justify-center gap-2 px-6 py-4 bg-white rounded-xl border border-slate-200 shadow-sm hover:bg-slate-50 transition-colors text-[18px] text-[#585858] font-semibold"
          >
            <Image
              width={20}
              height={20}
              src="/icons/report-doc-blue.svg"
              alt=""
              className="h-5 w-5"
            />
            New Reports this Week
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white shadow-sm rounded-xl p-5 flex flex-col items-center justify-between border border-slate-100">
            <h3 className="text-[20px]  font-semibold text-zinc-800 mb-4 self-start">
              Average TruthMetric
            </h3>
            <div className="relative w-36 h-36 mb-4">
              <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
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
                  className="text-sky-800"
                  strokeWidth="4"
                  strokeDasharray={`${100 * 0.78}, ${100}`}
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
                <p className="text-[32px] font-semibold text-[#333333]">3</p>
                <p className="text-[11px] font-medium text-zinc-500 opacity-90 leading-tight mt-1">
                  Average Fallacies
                  <br />
                  per report
                </p>
              </div>
              <div>
                <p className="text-[32px] font-semibold text-[#333333]">
                  83<span className="text-lg">%</span>
                </p>
                <p className="text-[11px] font-medium text-zinc-500 opacity-90 leading-tight mt-1">
                  Average Logic
                </p>
              </div>
            </div>
          </div>

          <ProfileStatsCard
            title="Profile Checks in last 30 minutes"
            count="16.5K"
            subtitle="Checks per minute"
            chartData={chartData}
            countries={countries}
          />

          <div className="bg-white shadow-sm rounded-xl p-5 border border-slate-100">
            <h3 className="text-[18px] font-semibold text-[#23272E] mb-1">
              Common Fallacies
            </h3>
            <p className="text-[14px] font-medium text-[#8B909A] mb-4">
              Last 7 days
            </p>

            <FallacyList fallacies={fallacies} />
          </div>

          <div className="bg-white shadow-sm rounded-xl p-5 border border-slate-100">
            <h3 className="text-[18px] font-semibold text-[#23272E] mb-3">
              Upgrade and Access More
            </h3>

            <UpgradeList upgradeItems={upgradeItems} />
          </div>
        </div>
      </div>
    </div>
  );
}
