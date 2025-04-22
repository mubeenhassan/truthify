import ReportSection from "./report-section";
import ComparativeAnalysis from "./comparative-analysis";
import FallacyDetection from "./fallacy-detection";

const ContentLeft = ({ profile }) => (
  <ReportSection reports={profile.reports} />
);

const ContentRight = ({ profile }) => (
  <>
    <ComparativeAnalysis data={profile.info} />
    <FallacyDetection fallacies={profile.fallacies} />
  </>
);

const ProfileScore = {
  ContentLeft,
  ContentRight,
};

export default ProfileScore;
