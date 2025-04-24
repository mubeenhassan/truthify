'use client'
import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import { CountryList } from "./country-list";

const ProfileStatsCard = ({ title, count, subtitle, chartData, countries }) => {
  // Prepare data for Recharts
  const data = chartData.map((value, index) => ({
    name: index + 1,
    value,
  }));

  return (
    <div className="bg-white shadow-sm rounded-xl p-5 border border-slate-100">
      <h3 className="text-[14px]  font-semibold text-[#23272E]">{title}</h3>

      <p className="text-[24px] font-bold text-[#333333] mt-1">{count}</p>
      <p className="text-xs font-medium text-neutral-400 mb-4">{subtitle}</p>

      {/* Bar Chart */}
      <div className="h-32 mb-6">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <XAxis dataKey="name" hide />
            <YAxis hide />
            <Tooltip />
            <Bar dataKey="value" fill="#0ea5e9" radius={[2, 2, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <hr className="border-gray-100 -mx-5 mb-4" />

      <div className="flex justify-between items-center mb-4">
        <h3 className="text-[14px] font-semibold text-[#23272E]">
          Profile Added by Country
        </h3 >
        <h3 className="text-[14px] font-semibold text-[#23272E]">Fallacies</h3>
      </div>

      <CountryList countries={countries} />
    </div>
  );
};

export default ProfileStatsCard;
