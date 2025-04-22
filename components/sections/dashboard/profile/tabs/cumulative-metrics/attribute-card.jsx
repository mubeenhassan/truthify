import Image from "next/image";
import { X } from "lucide-react";

export default function AttributeCard({
  id,
  label,
  progress = 0,
  icon,
  type = "progress",
  status = "positive",
  description,
}) {
  const barSections = Array(9).fill(undefined);
  const percentage = progress * 10;

  return (
    <div
      id={id}
      className="bg-white rounded-lg p-4  border border-[#ECECEC] cursor-pointer flex flex-col gap-2 relative overflow-hidden hover:shadow-md transition-all duration-200 w-full"
    >
      {type === "info" ? (
        <>
          <X className="float-right ml-auto" />
          <div className="flex flex-col justify-center items-center gap-2">
            <h5 className="text-[12px] text-[#292929] font-semibold -mt-1">
              {label}
            </h5>
            <p className="text-[12px] text-[#292929] text-center">
              {description}
            </p>
          </div>
        </>
      ) : (
        <>
          <div className="w-16 h-16 rounded-full bg-[#e5f3fde6] absolute -top-2 -right-2" />
          <div className="flex justify-between items-start">
            <h4 className="text-[28px] font-bold text-[#292929]">{progress}</h4>
            {icon && (
              <Image
                src={icon}
                alt="icon"
                height={20}
                width={20}
                className="w-8 h-8 z-9 -mr-1 -mt-1"
                priority
              />
            )}
          </div>

          <span className="text-[14px] text-[#292929] -mt-1">{label}</span>

          {/* Inline Progress Bar */}
          <div className="mt-2">
            <div
              style={{
                clipPath: "polygon(0% 0, 100% 0, 90% 100%, 0 100%)",
              }}
              className="w-full h-[13px] bg-[#EBF2F5] overflow-hidden relative flex justify-between gap-1"
            >
              <div
                style={{
                  clipPath: "polygon(16% 0, 100% 0, 84% 100%, 0 100%)",
                  width: `${percentage}%`,
                }}
                className={`${
                  status === "positive" ? "bg-green-500" : "bg-red-500"
                } absolute top-0 left-0 h-full`}
              ></div>

              {barSections.map((_, i) => (
                <div
                  key={i}
                  className="w-[2px] h-[110%] transform rotate-[40deg] bg-white"
                ></div>
              ))}
            </div>
          </div>

          <div className="w-6 h-6 cursor-pointer rounded-sm border-blue-600 border flex justify-center items-center mt-1">
            <i className="transform -rotate-15 text-blue-600 -ml-[2px]">i</i>
          </div>
        </>
      )}
    </div>
  );
}
