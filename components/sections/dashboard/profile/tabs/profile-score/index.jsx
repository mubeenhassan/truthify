import Link from "next/link";
import { ReportCard } from "@/components/ui/report-card";
import ProfileCard from "../../profile-card";
import ProfileTabs from "../../profile-tabs";
import ReportSection from "./report-section";
import ComparativeAnalysis from "./comparative-analysis";
import FallacyDetection from "./fallacy-detection";

const ProfileScore = ({ activeTab, setActiveTab, profile }) => {
  const { info, reports, fallacies } = profile;
  return (
    <>
      <div className="w-full flex flex-col items-center md:w-6/12 p-2 px-0 sm:px-5 gap-4">
        <ProfileTabs activeTab={activeTab} setActiveTab={setActiveTab} />
        <ProfileCard {...info} />
        <ReportSection reports={reports} />
      </div>
      <div className="w-full md:w-7/12 bg-[#F5F8FB] p-2 px-0 sm:px-5">
        <ComparativeAnalysis data={info} />
        <FallacyDetection fallacies={fallacies} />
      </div>
    </>
  );
};

export default ProfileScore;
