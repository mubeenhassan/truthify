"use client";

import { useEffect, useState } from "react";

export default function IntegrityGauge({
  score,
  maxScore = 5,
  label = "Total Integrity Score",
  animationDuration = 1500,
}) {
  const [animatedBars, setAnimatedBars] = useState([]);
  const totalBars = 60;
  const scorePercentage = (score / maxScore) * 100;
  const activeBarCount = Math.round((scorePercentage / 100) * totalBars);

  useEffect(() => {
    setAnimatedBars([]);

    const interval = setInterval(() => {
      setAnimatedBars((prev) => {
        if (prev.length >= activeBarCount) {
          clearInterval(interval);
          return prev;
        }
        return [...prev, prev.length];
      });
    }, animationDuration / activeBarCount);

    return () => clearInterval(interval);
  }, [activeBarCount, animationDuration]);

  return (
    <div className="relative w-full max-w-md mx-auto overflow-hidden aspect-[2/1]">
      <div className="relative flex justify-center items-start h-full">
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center">
          <div className="text-2xl font-bold">{score.toFixed(1)}</div>
          <div className="text-sm text-gray-600 mt-1">{label}</div>
        </div>
        <svg viewBox="52 8 95 92" className="w-full h-full">
          {Array.from({ length: totalBars }).map((_, i) => {
            const rotation = -90 + (i * 180) / totalBars;
            return (
              <rect
                key={`bg-${i}`}
                x="98"
                y="10"
                width="2"
                height="24"
                rx="2"
                fill="#f0f0f0"
                transform={`rotate(${rotation} 100 100)`}
              />
            );
          })}
          {/* Active bars */}
          {animatedBars.map((i) => {
            const rotation = -90 + (i * 180) / totalBars;
            let color;

            if (i < totalBars * 0.2) color = "#ff4d4d";
            else if (i < totalBars * 0.4) color = "#ff9933";
            else if (i < totalBars * 0.6) color = "#ffcc00";
            else if (i < totalBars * 0.8) color = "#99cc33";
            else color = "#66cc66";

            return (
              <rect
                key={`active-${i}`}
                x="98"
                y="10"
                width="2"
                height="24"
                rx="2"
                fill={color}
                transform={`rotate(${rotation} 100 100)`}
              />
            );
          })}
        </svg>
      </div>
    </div>
  );
}
