
export default function ProfileTabs({ activeTab, setActiveTab }) {
  const tabs = [
    { id: "profile-scores", label: "Profile Scores" },
    { id: "cumulative-metrics", label: "Cumulative Metrics" },
    { id: "report-scores", label: "Reports" },
  ];

  return (
    <div className="flex items-center bg-white rounded-md p-1 border border-gray-200 w-fit">
      {tabs.map((tab, index) => (
        <div key={tab.id} className="flex items-center">
          <button
            onClick={() => {
              setActiveTab(tab.id);
              window.location.hash = tab.id;
            }}
            className={`px-2 sm:px-4 py-2 text-xs cursor-pointer font-medium rounded-md transition-colors duration-200 ${
              activeTab === tab.id
                ? "bg-[#016CCD] text-white"
                : "text-gray-700 hover:bg-gray-100"
            }`}
          >
            {tab.label}
          </button>
          {index !== tabs.length - 1 && (
            <div className="h-5 w-px bg-gray-300 mx-1"></div>
          )}
        </div>
      ))}
    </div>
  );
}
