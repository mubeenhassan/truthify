import ProfileCard from "../../profile-card";
import ProfileTabs from "../../profile-tabs";
import AttributeEvaluation from "./attributeEvaluation";
import MetricsProgress from "./metricsProgress";

const CumulativeMetrics = ({ activeTab, setActiveTab, profile }) => {
  const { info, reports, fallacies } = profile;
  return(
<>
    <div className="w-full md:w-6/12  p-2  h-screen">
      <ProfileTabs activeTab={activeTab} setActiveTab={setActiveTab} />
      <ProfileCard {...info} />
      <AttributeEvaluation/>
    </div>
    <div className="w-full md:w-8/12 bg-[#F1F6FA] p-4 h-screen">
    <MetricsProgress/>
    </div>
  </>
  )
  
};

export default CumulativeMetrics;
