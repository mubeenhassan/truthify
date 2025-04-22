import { ReportCard } from "@/components/ui/report-card";
import Link from "next/link";

const AllReports = ({ reports }) => {
  return (
    <div className="p-4 w-full bg-white rounded-lg border border-slate-200 shadow-sm bg-[radial-gradient(ellipse_at_bottom_right,_var(--tw-gradient-stops))] from-blue-50/60 via-white to-white">
      <div className="flex justify-between items-start mb-3">
        <h3 className="text-zinc-800 text-base font-semibold">
          All the reports related to Elizabeth Homes
        </h3>
      </div>

      <div className="space-y-3.5 mb-4">
        {reports.map((report) => (
          <ReportCard
            key={report.id}
            report={{ ...report, variant: "compact" }}
          />
        ))}
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

export default AllReports;
