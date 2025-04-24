"use client";

import { useState } from "react";
import Image from "next/image";
import { X } from "lucide-react";
import { ProgressBar } from "@/components/ui/progess-bar";

export default function AttributeCard({
  id,
  label,
  progress = 0,
  icon = null,
  negative,
  description,
}) {
  const [isFlipped, setIsFlipped] = useState(false);

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  return (
    <div
      id={id}
      className="flex-shrink-0 relative w-full max-w-[180px] h-full"
      // style={{ perspective: "1000px" }}
    >
      <div
        className={`relative w-full h-full transition-transform duration-500 transform-style-3d ${
          isFlipped ? "rotate-y-180" : ""
        }`}
        style={{
          transformStyle: "preserve-3d",
          transform: isFlipped ? "rotateY(180deg)" : "rotateY(0deg)",
        }}
      >
        {/* Front side */}
        <div
          className={`bg-white rounded-lg p-4 border border-[#ECECEC] cursor-pointer flex flex-col gap-2 relative overflow-hidden hover:shadow-md transition-all duration-200 w-full h-full backface-hidden`}
          style={{ backfaceVisibility: "hidden" }}
        >
          <div className="w-16 h-16 rounded-full bg-[#e5f3fde6] absolute -top-2 -right-2" />
          <div className="flex justify-between items-start">
            <h4 className="text-[28px] font-bold text-[#292929]">{progress}</h4>
            {icon ? (
              <Image
                src={icon || "/placeholder.svg"}
                alt="icon"
                height={20}
                width={20}
                className="w-8 h-8 z-9 -mr-1 -mt-1"
                priority
              />
            ) : (
              ""
            )}
          </div>

          <span className="text-[14px] text-[#292929] -mt-1">{label}</span>
          <ProgressBar progress={progress} negative={negative} />
          <div
            className="w-6 h-6 cursor-pointer rounded-sm border-blue-600 border flex justify-center items-center mt-1"
            onClick={handleFlip}
          >
            <i className="transform -rotate-15 text-blue-600 -ml-[2px]">i</i>
          </div>
        </div>

        {/* Back side (info) */}
        <div
          className={`bg-white rounded-lg p-4 border border-[#ECECEC] cursor-pointer flex flex-col gap-2 overflow-hidden hover:shadow-md transition-all duration-200 w-full h-full top-0 left-0 absolute backface-hidden rotate-y-180`}
          style={{
            backfaceVisibility: "hidden",
            transform: "rotateY(180deg)",
          }}
        >
          <X
            className="float-right ml-auto cursor-pointer"
            onClick={handleFlip}
          />
          <div className="flex flex-col justify-center items-center gap-2">
            <h5 className="text-[12px] text-[#292929] font-semibold -mt-1">
              {label}
            </h5>
            <p className="text-[12px] text-[#292929] text-center text-xs line-clamp-3-custom">
              {description}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
