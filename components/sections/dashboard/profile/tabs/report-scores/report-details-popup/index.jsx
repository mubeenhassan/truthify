"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { X, ThumbsUp, ThumbsDown } from 'lucide-react';
import { ReportContent } from "./report-content";
import { ProgressBar } from "@/components/ui/progess-bar";

export function ReportDetailsPopup({ report, onClose }) {
  const [feedback, setFeedback] = useState(null);

  const handleFeedback = (type) => {
    setFeedback(type);
  };

  // Fallback dummy content
  const dummy = {
    date: "13-10-2015",
    source: "YouTube",
    analysis: `Holmes' speech exhibits a highly rehearsed and strategically persuasive tone, characteristic of someone attempting to sell a vision rather than transparently discuss reality. She frequently employs emotionally charged narratives, such as referencing personal losses and the supposed transformative impact of her technology, yet she consistently avoids providing concrete, verifiable details about how Theranos’ testing actually worked. Her rhetoric is dominated by broad claims of "changing the world" and "democratizing healthcare," which serve to generate excitement but lack substantive proof. Additionally, when pressed about challenges or failures, she shifts the focus to external resistance from industry competitors rather than addressing legitimate concerns about her technology's viability. The overall effect is one of calculated optimism rather than sincere disclosure, suggesting a significant degree of disingenuousness.`,
    quotes: [
      `"We ignored it at first and we knew this would happen... but what's interesting about it is how recive it is especially in this space and in contacting our regulators saying pull stuff about us trying to seed false facts to investigative journalists."`,
      `"You’ve created something that all of a sudden is real… it’s the most addictive feeling in the world."`,
    ],
  };

  const content = {
    date: report?.date || dummy.date,
    source: report?.source || dummy.source,
    analysis: report?.analysis || dummy.analysis,
    quotes: report?.quotes?.length ? report.quotes : dummy.quotes,
  };
  console.log(report);
  return (
    <Dialog open onOpenChange={onClose} className="max-w-[700px] w-full">
      <DialogContent className="sm:max-w-[700px] w-full p-6 rounded-xl ">
        <DialogHeader className="flex flex-row justify-between items-center mb-4">
        <DialogTitle className='w-[100%] relative '>
          <div className="absolute -top-10 -left-10 w-[100px] h-[100px] rounded-full bg-[#048AE20F]"></div>
          <div className="flex justify-between items-center gap-2 w-full ml-20">
          <div className="w-full flex items-center space-x-7">
            <img
              src={report.icon}
              alt={report.category}
              className="w-14 h-14 absolute -top-[10px] -left-[10px]"
            />
            <div className="w-full flex space-x-5">
              <h4 className="text-[36px] font-extrabold">{report.score}</h4>
              <div className="space-y-2">
                <h4 className="text-[14px] text-[#292929] mt-1">{report.category}</h4>
                <ProgressBar
                  progress={report.score}
                  className="max-w-[150px]"
                />
              </div>
            </div>
           
          </div>
          <div className="flex gap-2  mr-16">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => handleFeedback("like")}
                className={
                  feedback === "like" ? "text-blue-600" : "text-gray-400"
                }
              >
                <ThumbsUp size={20} />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => handleFeedback("dislike")}
                className={
                  feedback === "dislike" ? "text-blue-600" : "text-gray-400"
                }
              >
                <ThumbsDown size={20} />
              </Button>
            </div>
          </div>
          </DialogTitle>
        </DialogHeader>
        <ReportContent {...content} />
      </DialogContent>
    </Dialog>
  );
}
