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
    analysis: `Holmes' speech exhibits a highly rehearsed and strategically persuasive tone...`,
    quotes: [
      "We ignored it at first and we knew this would happen...",
      "You've created something that all of a sudden is real...",
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
    <Dialog open onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[800px] p-6 rounded-xl">
        <DialogHeader className="flex flex-row justify-between items-start mb-4">
        <DialogTitle>
          <div className="w-full flex space-x-2">
            <img
              src={report.icon}
              alt={report.category}
              className="w-16 h-16"
            />
            <div className="w-full flex space-x-2">
              <h4 className="text-3xl font-semibold">{report.score}</h4>
              <div>
                <h4>{report.category}</h4>
                <ProgressBar
                  progress={report.score}
                  className="max-w-[150px]"
                />
              </div>
            </div>
            <div className="flex gap-2">
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
