"use client";

import { useEffect, useState, useMemo } from "react";
import ProfileScore from "./tabs/profile-score";
import ReportScores from "./tabs/report-scores";
import CumulativeMetrics from "./tabs/cumulative-metrics";

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

  const ActiveComponent = useMemo(() => tabComponents[activeTab], [activeTab]);

  return ActiveComponent ? (
    <ActiveComponent activeTab={activeTab} setActiveTab={setActiveTab} profile={profile} />
  ) : null;
};

export default ProfileDetails;
