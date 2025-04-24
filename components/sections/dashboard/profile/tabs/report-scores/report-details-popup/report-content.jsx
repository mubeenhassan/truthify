import React, { useState } from "react";

export function ReportContent({ date, source, analysis, quotes }) {
  const [activeTab, setActiveTab] = useState("summary");

  const tabs = [
    { id: "summary", label: "Summary" },
    { id: "transcript", label: "Transcript" },
  ];

  const transcriptData = [
    {
      id: 1,
      speaker: "Speaker 1",
      content:
        "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.",
      timestamp: "00:10",
    },
    {
      id: 2,
      speaker: "Speaker 2",
      content:
        "Duis aute irure dolor in in proident velit esse cillum dolore eu fugiat",
      timestamp: "00:10",
    },
    {
      id: 3,
      speaker: "Speaker 1",
      content:
        "Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem.",
      timestamp: "00:10",
    },
  ];

  return (
    <div className="flex flex-col items-center w-full">
      <div className="flex items-center bg-white rounded-md p-1 border border-gray-200 w-fit mt-2">
        {tabs.map((tab, index) => (
          <div key={tab.id} className="flex items-center">
            <button
              onClick={() => setActiveTab(tab.id)}
              className={`px-2 sm:px-4 py-2 text-xs cursor-pointer font-medium rounded-md transition-colors duration-200 ${
                activeTab === tab.id
                  ? "bg-[#016CCD] text-white"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              {tab.label}
            </button>
            {index !== tabs.length - 1 && (
              <div className="h-5 w-px bg-gray-300 mx-1"></div>
            )}
          </div>
        ))}
      </div>

      <div className="mt-6 w-full max-w-3xl ">
        {activeTab === "summary" && (
          <div className="w-full overflow-y-scroll h-full max-h-[400px] px-2 scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200">
            <h3 className="text-[14px] font-semibold mb-1 text-[#202224]">Analysis of UnBias</h3>
            <div className="flex flex-wrap mb-4">
              <div className="mr-8 mb-2 text-[12px]">
                <span className="font-semibold text-[#202224] text-[12px]">Date:</span > {date}
              </div>
              <div className="text-[#202224] text-[12px]">
                <span className="font-semibold text-[#747474] tetx-[12px]">Source:</span> {source}
              </div>
            </div>
            <p className="text-gray-800 leading-relaxed  text-[12px]">{analysis}</p>
          <hr className="w-full bg-gray-300 my-6"/>
            <h3 className="text-2xl font-bold mb-4 text-[14px] text-[#202224]">
              Quote from Elizabeth Holmes
            </h3>
            {quotes.map((quote, index) => (
              <p key={index} className="text-gray-800 leading-relaxed mb-4 text-[12px]">
                "{quote}"
              </p>
            ))}
          </div>
        )}

        {activeTab === "transcript" && (
          <div className="w-full h-[400px] overflow-y-scroll scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200">
            {transcriptData.map((item, index) => (
              <div
                key={index}
                className={`mb-6 bg-gray-50 p-4 rounded-lg w-full max-w-[400px] ${index%2 !== 0 ? "ml-auto" : ""}`}
              >
                <div className="flex justify-between items-center mb-2">
                  <h4 className="font-medium text-[#252836] text-[13px]">{item.speaker}</h4>
                  <span className="text-sm text-gray-700 text-[12px]">
                    {item.timestamp}
                  </span>
                </div>
                  <p className="text-[#808191] text-[12px]   leading-relaxed">
                    {item.content}
                  </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
