"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

const data = [
  { month: "Jan", integrity: 26000, dashed1: 15000, dashed2: 9000 },
  { month: "Feb", integrity: 32000, dashed1: 20000, dashed2: 12000 },
  { month: "Mar", integrity: 29000, dashed1: 19000, dashed2: 11000 },
  { month: "Apr", integrity: 31000, dashed1: 18000, dashed2: 11500 },
  { month: "May", integrity: 34000, dashed1: 19000, dashed2: 10500 },
  { month: "Jun", integrity: 33000, dashed1: 18500, dashed2: 9000 },
  { month: "Jul", integrity: 36000, dashed1: 21000, dashed2: 10000 },
  { month: "Aug", integrity: 37000, dashed1: 23000, dashed2: 14000 },
  { month: "Sep", integrity: 34000, dashed1: 22000, dashed2: 16000 },
  { month: "Oct", integrity: 35000, dashed1: 22500, dashed2: 15000 },
  { month: "Nov", integrity: 30000, dashed1: 23000, dashed2: 14500 },
  { month: "Dec", integrity: 40000, dashed1: 27000, dashed2: 19000 },
];

export default function ScoreOverTimeChart() {
  return (
    <div className="w-full h-[400px] bg-white rounded-xl shadow py-6 px-2 md:p-6 pb-16">
      <h2 className="text-2xl font-semibold mb-4">Score Over Time</h2>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} />
          <XAxis
            dataKey="month"
            tick={{ fontSize: 12, fill: "#6B7280" }}
            axisLine={false}
            tickLine={false}
          />
          <YAxis
            tickFormatter={(value) => `${value / 1000}k`}
            tick={{ fontSize: 12, fill: "#6B7280" }}
            axisLine={false}
            tickLine={false}
            label={{
              value: "Active users",
              angle: -90,
              position: "insideLeft",
              offset: 10,
              style: {
                textAnchor: "middle",
                fill: "rgba(29, 34, 45, 0.7)",
                fontSize: 14,
                fontWeight: 500,
              },
            }}
          />
          <Tooltip formatter={(value) => `${value.toLocaleString()}`} />
          <Legend
            verticalAlign="top"
            align="right"
            iconType="circle"
            iconSize={10}
            wrapperStyle={{ fontSize: "12px", color: "#6B7280" }}
          />

          <Line
            type="monotone"
            dataKey="integrity"
            stroke="#007bff"
            strokeWidth={2}
            name="Integrity Score"
            dot={false}
          />
          <Line
            type="monotone"
            dataKey="dashed1"
            stroke="#00bfff"
            strokeDasharray="4 4"
            strokeWidth={1.5}
            name="Time Period"
            dot={false}
          />
          <Line
            type="monotone"
            dataKey="dashed2"
            stroke="#90ee90"
            strokeDasharray="4 4"
            strokeWidth={1.5}
            name="Time Period"
            dot={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
