import Image from "next/image";
import ProgessBar from "./progess-bar";
import { X } from "lucide-react";

function MetricsProgress() {
  const positiveAttributes = [
    {
      label: "Unbias",
      progress: 3.7,
      color: "bg-blue-500",
      icon: "/icons/positiveAttributeIcon1.svg",
    },
    {
      label: "Consistent",
      progress: 5.2,
      color: "bg-green-500",
      icon: "/icons/positiveAttributeIcon2.svg",
    },
  ];

  const negativeAttributes = [
    {
      label: "Excessive fear",
      progress: 5.3,
      color: "bg-red-500",
      icon: "/icons/negativeAttributeIcon1.svg",
    },
    {
      label: "Overoptimism",
      progress: 8.2,
      color: "bg-red-600",
      icon: "/icons/negativeAttributeIcon2.svg",
    },
    {
      label: "Deflection",
      progress: 7.6,
      color: "bg-red-400",
      icon: "/icons/negativeAttributeIcon3.svg",
    },
  ];

  return (
    <div className="w-full">
      <div className="w-full">
        {/* Positive Attributes Progress */}
        <h3 className="text-[18px] text-[#292929] font-semibold my-1">
          Positive Attributes
        </h3>
        <div className="w-full grid grid-cols-2 xl:grid-cols-3 gap-4 ">
          {positiveAttributes.map((att, i) => (
            <div
              key={i}
              className="bg-white rounded:lg p-4 shadow-white border border-gray-100 cursor-pointer flex flex-col gap-2 relative overflow-hidden"
            >
              <div className="w-16 h-16 rounded-full bg-[#e5f3fde6] absolute -top-2  -right-2"></div>
              <div className="flex justify-between">
                <h4 className="text-[28px] font-bold text-[#292929]">
                  {att.progress}
                </h4>
                <Image
                  src={att.icon}
                  alt="icon"
                  height={20}
                  width={20}
                  className="w-8 h-8 z-9 -mr-1 -mt-1"
                  priority
                />
              </div>
              <span className="text-[14px] text-[#292929] -mt-1">
                {att.label}
              </span>
              <ProgessBar value={att.progress} status="positive" />
              <div className="w-6 h-6 cursor-pointer rounded-sm border-blue-600 border flex justify-center items-center mt-1">
                <i className="transform -rotate-15 text-blue-600 -ml-[2px]">
                  i
                </i>
              </div>
            </div>
          ))}
          <div className="bg-white rounded:lg p-4 shadow-white border border-gray-100 cursor-pointer flex flex-col gap-2 w-full">
            <X className="float-right ml-auto" />
            <div className="flex flex-col justify-center items-center gap-2">
              <h5 className="text-[12px] text-[#292929] font-semibold -mt-1">
                Conceptual
              </h5>
              <p className="text-[12px] text-[#292929] text-center">
                Measures the level of discussion around abstract concepts and
                principles versus concrete examples.
              </p>
            </div>
          </div>
        </div>
        {/* negative Attributes Progress */}

        <h3 className="text-[18px] text-[#292929] font-semibold mt-7 my-1">
          Negative Attributes
        </h3>
        <div className="w-full grid grid-cols-2 xl:grid-cols-3 gap-4 ">
          {negativeAttributes.map((att, i) => (
            <div
              key={i}
              className="bg-white rounded:lg p-4 shadow-white border border-gray-100 cursor-pointer flex flex-col gap-2 relative overflow-hidden"
            >
              <div className="w-16 h-16 rounded-full bg-[#e5f3fde6] absolute -top-2  -right-2"></div>
              <div className="flex justify-between">
                <h4 className="text-[28px] font-bold text-[#292929]">
                  {att.progress}
                </h4>
                <Image
                  src={att.icon}
                  alt="icon"
                  height={20}
                  width={20}
                  className="w-8 h-8 z-9 -mr-1 -mt-1"
                  priority
                />
              </div>
              <span className="text-[14px] text-[#292929] -mt-1">
                {att.label}
              </span>
              <ProgessBar value={att.progress} status="negative" />
              <div className="w-6 h-6 cursor-pointer rounded-sm border-blue-600 border flex justify-center items-center mt-1">
                <i className="transform -rotate-15 text-blue-600 -ml-[2px]">
                  i
                </i>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default MetricsProgress;
