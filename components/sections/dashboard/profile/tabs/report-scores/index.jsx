import { useSearchParams } from "next/navigation";
import ReportSection from "../profile-score/report-section";
import ReportList from "./report-list";

const ContentLeft = ({ profile }) => {
  const searchParams = useSearchParams();
  const activeReport = searchParams.get("reprot");

  return (
    <ReportSection
      reports={profile.reports}
      profileId={profile.id}
      activeReport={activeReport}
    />
  );
};

const ContentRight = ({ profile }) => {
  const searchParams = useSearchParams();
  const activeReport = searchParams.get("reprot");
  const activeReportDetails = profile.reports.find(
    (report) => report.id === activeReport
  )?.reportDetails;

  return (
    <>
      {activeReportDetails && activeReportDetails.length > 0 ? (
        <ReportList reportList={activeReportDetails} />
      ) : (
        <p className="text-sm text-center py-6 text-gray-500 italic">No list found</p>
      )}
    </>
  );
};

const ReportScores = {
  ContentLeft,
  ContentRight,
};

export default ReportScores;
