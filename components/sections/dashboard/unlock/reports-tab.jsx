import { ReportCard } from "@/components/ui/report-card";

// Mock data for reports
const reportsData = Array(8)
  .fill()
  .map((_, index) => ({
    id: index + 1,
    title: "Report Title 1",
    speaker: "Jensen",
    source: "Youtube",
    date: "feb 20 2020",
    customDate: "feb 20 2020",
    isLocked: true,
  }));

export function ReportsTab() {
  return (
    <div className="grid w-full max-w-6xl grid-cols-1 md:grid-cols-2 gap-6">
      {reportsData.map((report) => (
        <ReportCard key={report.id} report={report} />
      ))}
    </div>
  );
}
