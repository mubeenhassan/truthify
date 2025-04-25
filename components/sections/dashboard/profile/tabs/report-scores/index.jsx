import { useSearchParams } from 'next/navigation';
import ReportSection from "../profile-score/report-section";
import ReportList from "./report-list";

const ContentLeft = ({ profile }) => {
  const searchParams = useSearchParams();
  const activeReport = searchParams.get('reprot');

  return <ReportSection reports={profile.reports} profileId={profile.id}  activeReport={activeReport}/>;
};

const ContentRight = ({ profile }) => {
  const searchParams = useSearchParams();
  const activeReport = searchParams.get('reprot');
  return(
  <>
    <ReportList reportList={profile.reports[activeReport-1].reportDetails} />
  </>
)};

const ReportScores = {
  ContentLeft,
  ContentRight,
};

export default ReportScores;
