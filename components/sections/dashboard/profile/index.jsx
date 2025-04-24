"use client";

import { useEffect, useState } from "react";
import ProfileTabs from "./profile-tabs";
import ProfileCard from "./profile-card";
import ProfileScore from "./tabs/profile-score";
import CumulativeMetrics from "./tabs/cumulative-metrics";
import ReportScores from "./tabs/report-scores";

const tabComponents = {
  "profile-scores": ProfileScore,
  "cumulative-metrics": CumulativeMetrics,
  "report-scores": ReportScores,
};

const ProfileDetails = ({ id, profile }) => {
  const [activeTab, setActiveTab] = useState("profile-scores");

  useEffect(() => {
    const setHashAsTab = () => {
      const hash = window.location.hash.replace("#", "");
      if (hash && tabComponents[hash]) {
        setActiveTab(hash);
      }
    };

    setHashAsTab();
    window.addEventListener("hashchange", setHashAsTab);
    return () => window.removeEventListener("hashchange", setHashAsTab);
  }, [id]);

  const ActiveComponent = tabComponents[activeTab];

  return (
    <div className="flex flex-col md:flex-row w-full overflow-hidden ">
      <div className="w-full flex flex-col items-center md:w-[43%] p-2 px-0 sm:px-5 gap-4">
        <ProfileTabs activeTab={activeTab} setActiveTab={setActiveTab} />
        <ProfileCard {...profile.info} />
        {ActiveComponent && <ActiveComponent.ContentLeft profile={profile} />}
      </div>

      <div className="w-full md:w-[57%] bg-[#F5F8FB] p-2 px-0 sm:px-5">
        {ActiveComponent && <ActiveComponent.ContentRight profile={profile} />}
      </div>
    </div>
  );
};

export default ProfileDetails;
