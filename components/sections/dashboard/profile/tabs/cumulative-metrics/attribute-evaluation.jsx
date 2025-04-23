"use client";

import { useState } from "react";
import { X, HelpCircle } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

const Attributes = [
  {
    title: "Positive Attributes",
    value: "5.2",
    valuecolor: "#38A737",
    des: "When combined, these traits offer a holistic view of intellec",
    details:
      "When combined, Positive traits offer a holistic view of intellectual strength and ethical communication. A speaker who demonstrates high genuineness, consistency, abstract thinking, and logical reasoning is likely to engage in principled, rational, and insightful discussions, making them a credible and trustworthy source of information.",
  },
  {
    title: "Negative Attributes",
    value: "7.1",
    valuecolor: "#EC3232",
    des: "These negative traits expose irrationality, deception, and m",
    details:
      "These negative traits expose irrationality, deception, and manipulative tactics that degrade logical integrity. A speaker exhibiting high fallacy usage, emotional exaggeration, inconsistency, triangulation, and deflection is likely to engage in dishonest, evasive, or misleading argumentation, making them an unreliable source of information.",
  },
  {
    title: "Fallacy Detection",
    value: "7.5",
    valuecolor: "#EC3232",
    des: "The presence of logical fallacies—errors in reasoning that undermine an argument. These in",
    details:
      "The presence of logical fallacies—errors in reasoning that undermine an argument. These include ad hominem attacks, straw man arguments, false equivalences, and other deceptive tactics that distort rational discourse and mislead audiences.",
  },
];

export default function AttributeEvaluation() {
  const [open, setOpen] = useState(false);
  const [selectedAttribute, setSelectedAttribute] = useState(null);

  const handleViewDetails = (attribute) => {
    setSelectedAttribute(attribute);
    setOpen(true);
  };

  return (
    <>
      <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-4 py-4 px-2">
        {Attributes.map((att, i) => (
          <div
            className={`p-4 rounded-2xl flex flex-col justify-between items-start bg-gradient-to-b from-[#F1F6FA] to-[#FFFFFF] border border-gray-200 shadow-sm gap-4 pb-5 ${
              i === 2 ? "col-span-1 md:col-span-2" : ""
            }`}
            key={i}
          >
            <div
              className={`${
                i === 2
                  ? "flex flex-col md:flex-row justify-between items-start w-full"
                  : ""
              }`}
            >
              <h3 className="text-[14px] md:text-[16px] text-[#292929] font-semibold">
                {att.title}
              </h3>
              <div className={`${i === 2 ? "mt-3 md:mr-3" : ""}`}>
                <span
                  className="text-[24px] md:text-[26px] font-semibold block -mb-[10px]"
                  style={{ color: att.valuecolor }}
                >
                  {att.value}
                </span>
                <span className="text-[10px] md:text-[12px] text-[#292929] font-medium">
                  Total Score
                </span>
              </div>
            </div>

            <div
              className={`${
                i === 2 ? "md:max-w-[70%] md:-mt-10" : ""
              } flex flex-col gap-[10px]`}
            >
              <p className="text-[12px] text-[#292929]">{att.des}</p>
              <Button
                onClick={() => handleViewDetails(att)}
                className="max-w-[90px] h-auto text-[10px] text-white bg-[#069AEE] hover:bg-[#0588d3] rounded-sm px-3 py-2"
                variant="default"
                size="sm"
              >
                View Details
              </Button>
            </div>
          </div>
        ))}
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent
          className="sm:max-w-[500px] p-0 overflow-hidden bg-white rounded-lg"
          closeButton={false}
        >
          <div className="p-6">
            <DialogHeader className="flex flex-row items-center gap-3 pb-2">
              <HelpCircle className="h-10 w-10 text-gray-500" />
              <DialogTitle className="text-2xl font-bold">
                Why These Attributes Matter?
              </DialogTitle>
            </DialogHeader>

            {selectedAttribute && (
              <div className="mt-4">
                <div className="flex items-center gap-4 mb-4">
                  <span
                    className="text-5xl font-bold"
                    style={{ color: selectedAttribute.valuecolor }}
                  >
                    {selectedAttribute.value}
                  </span>
                  <span className="text-xl font-medium">
                    Total {selectedAttribute.title} Score
                  </span>
                </div>

                <p className="text-base leading-relaxed text-gray-800 mt-4">
                  {selectedAttribute.details}
                </p>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
