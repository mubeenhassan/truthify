import AllReports from "./all-reports";
import ComparativeAnalysis from "./comparative-analysis";
import FallacyDetection from "./fallacy-detection";

const ContentLeft = ({ profile }) => (
  <AllReports reports={profile.reports} />
);

const ContentRight = ({ profile }) => (
  <>
    <ComparativeAnalysis data={profile.info} />
    <FallacyDetection fallacies={profile.fallacies} />
  </>
);

const ReportScores = {
  ContentLeft,
  ContentRight,
};

export default ReportScores;
