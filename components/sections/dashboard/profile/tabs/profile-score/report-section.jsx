import { ReportCard } from "@/components/ui/report-card";
import Link from "next/link";

const ReportSection = ({ reports, profileId, activeReport = null }) => {
  return (
    <div className="p-4 w-full bg-white rounded-lg border border-slate-200 shadow-sm bg-[radial-gradient(ellipse_at_bottom_right,_var(--tw-gradient-stops))] from-blue-50/60 via-white to-white">
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
          <p className="text-[#3749A6] text-2xl font-extrabold">126</p>
          <p className="text-zinc-700 text-xs font-medium leading-tight mt-0.5">
            Total Reports
            <br />
            Available
          </p>
        </div>
      </div>

      <div className="h-full max-h-[300px] overflow-y-scroll scrollbar-thin px-2">
        <div className="space-y-3.5 mb-4">
          {reports.map((report) => (
            <ReportCard
              profileId={profileId}
              key={report.id}
              report={{ ...report, variant: "compact" }}
              activeReport={activeReport}
            />
          ))}
        </div>
      </div>
      <div className="text-center mt-3">
        <Link
          href="/dashboard/my-reports"
          className="px-3 py-1 bg-sky-500 rounded text-white text-[10px] font-semibold leading-none hover:bg-sky-600 focus:outline-none focus:ring-2 focus:ring-sky-400 focus:ring-offset-1"
        >
          View All
        </Link>
      </div>
    </div>
  );
};

export default ReportSection;
