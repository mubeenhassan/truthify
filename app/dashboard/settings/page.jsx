"use client";
import AccountSetting from "@/components/sections/dashboard/settings";
import SettingTabs from "@/components/sections/dashboard/settings/setting-tabs";
import { Search } from "lucide-react";
import { useState } from "react";

const Settings = () => {
  const [activeTab, setActiveTab] = useState("profile");
  return (
    <div className="w-full p-2">
      <div className="w-full flex flex-col md:flex-row justify-between items-center md:gap-3">
        <div className="">
          <h4 className="text-[#000000] font-semibold mt-6 md:mt-4 mb-1 text-[24px]">
            Account Settings
          </h4>
          <p className="text-[16px] text-[#475367] font-light ">
            Setup and edit Account settings and preferences
          </p>
        </div>
        <div className="flex justify-start items-center gap-2 border border-gray-200 rounded-lg p-2 mt-2 ml-auto md:ml-0">
          <Search className="size-5" />
          <input
            type="text "
            placeholder="Search Settings"
            className="text-[16px] text-[#667185] placeholder:text-[#667185] outline-none"
          />
        </div>
      </div>
      <SettingTabs activeTab={activeTab} setActiveTab={setActiveTab} />
      <div className="py-4">
        <AccountSetting activeTab={activeTab} />
      </div>
    </div>
  );
};

export default Settings;
