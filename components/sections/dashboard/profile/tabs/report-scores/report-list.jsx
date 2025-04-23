import { useState } from "react";
import { ProgressBar } from "@/components/ui/progess-bar";
import Image from "next/image";
import { ReportDetailsPopup } from "./report-details-popup";

const ReportList = ({ reportList }) => {
  const [selectedReport, setSelectedReport] = useState(null);
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const handleOpenPopup = (report) => {
    setSelectedReport(report);
    setIsPopupOpen(true);
  };

  const handleClosePopup = () => {
    setSelectedReport(null);
    setIsPopupOpen(false);
  };

  return (
    <>
      <div className="space-y-4">
        {reportList.map((data, index) => (
          <div key={index} className="flex items-center border-b border-gray-200">
            <div className="flex-shrink-0 p-2 mr-4">
              <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ background: "rgba(4, 138, 226, 0.15)" }}>
                <Image
                  src={data.icon || "/placeholder.svg"}
                  alt={data.category}
                  width={32}
                  height={32}
                  className="rounded-full"
                />
              </div>
            </div>

            <div className="flex-shrink-0 mr-2">
              <span className="text-[28px] font-bold text-gray-800">
                {data.score}
              </span>
            </div>

            <div className="flex-shrink-0 w-32 mr-2">
              <div className="space-y-2">
                <span className="font-semibold text-sm text-gray-800">
                  {data.category}
                </span>
              </div>
              <ProgressBar progress={data.score} negative={data.negative}/>
            </div>

            <div className="flex-grow mr-4 overflow-hidden w-48">
              <p className="text-xs line-clamp-3-custom text-gray-600">
                {data.description}
              </p>
            </div>

            <div className="flex-shrink-0">
              <button
                onClick={() => handleOpenPopup(data)}
                className="p-2 bg-sky-500 rounded text-white text-[10px] font-semibold leading-none hover:bg-sky-600 focus:outline-none focus:ring-2 focus:ring-sky-400 focus:ring-offset-1"
              >
                View Details
              </button>
            </div>
          </div>
        ))}
      </div>

      {isPopupOpen && (
        <ReportDetailsPopup
          report={selectedReport}
          onClose={handleClosePopup}
          
        />
      )}
    </>
  );
};

export default ReportList;
