import ProfileTabs from "../profile-tabs";

const CumulativeMetrics = ({ activeTab, setActiveTab, profile }) => (
  <>
    <div className="w-full md:w-5/12 bg-amber-300 p-2 h-screen">
      <ProfileTabs activeTab={activeTab} setActiveTab={setActiveTab} />
      <h1>Cumulative Metrics</h1>
    </div>
    <div className="w-full md:w-7/12 bg-[#127be4] p-2 h-screen"></div>
  </>
);

export default CumulativeMetrics;
