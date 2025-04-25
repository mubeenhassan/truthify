"use client";

import Link from "next/link";
import { FileText, LockIcon } from "lucide-react";
import { cn } from "@/lib/utils";

export function ReportCard({ report, profileId = 1, activeReport }) {
  const {
    id,
    title,
    speaker,
    source,
    date,
    customDate,
    isLocked = false,
    variant = "default",
    className,
  } = report;
  const CardContent = () => (
    <div
      className={cn(
        "relative flex items-start w-full rounded-lg border border-gray-200 bg-white shadow-sm transition-colors",
        variant === "compact" ? "p-2" : "p-4",
        activeReport == report.id
          ? "rounded-md group text-blue-600 bg-blue-50 border-r-4 border-blue-600"
          : "",
        className
      )}
    >
      {/* Document Icon */}
      <div className="flex-shrink-0 m-auto mr-5">
        <FileText className="w-12 h-12 text-[#016CCD]" />
      </div>

      {/* Content */}
      <div className="flex-grow">
        <h3 className="text-sm font-semibold text-gray-800 mb-1">{title}</h3>
        <div
          className={cn(
            "grid gap-x-4",
            variant === "compact" ? "grid-cols-2" : "grid-cols-2"
          )}
        >
          <div className="text-gray-600 text-xs">
            <p>
              Main Speaker: <span className="font-semibold ">{speaker}</span>
            </p>
            <p>
              Source: <span className="font-semibold">{source}</span>
            </p>
          </div>
          <div className="text-gray-600 text-xs">
            <p>
              Date: <span className="font-semibold">{date}</span>
            </p>
            {customDate && (
              <p>
                Custom: <span className="font-medium">{customDate}</span>
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Lock Icon */}
      {isLocked && (
        <div className="absolute -top-[22px] right-4">
          <div className="rounded-full bg-gray-100 border-[1px] border-gray-300 p-3">
            <LockIcon className="h-5 w-5 text-[#016CCD]" />
          </div>
        </div>
      )}
    </div>
  );

  if (isLocked) {
    return <CardContent />;
  }

  return (
    <Link
      href={`/dashboard/profile/${profileId}?reprot=${id}#report-scores`}
      className="block no-underline"
    >
      <CardContent />
    </Link>
  );
}
