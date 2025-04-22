import AllReports from "./all-reports";
import ReportList from "./report-list";

const ContentLeft = ({ profile }) => <AllReports reports={profile.reports} />;

const ContentRight = ({ profile }) => (
  <>
    <ReportList reportList={profile.reportList} />
  </>
);

const ReportScores = {
  ContentLeft,
  ContentRight,
};

export default ReportScores;
