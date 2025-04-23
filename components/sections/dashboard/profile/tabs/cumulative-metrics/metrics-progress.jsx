// components/MetricsProgress.tsx
import AttributeCard from "./attribute-card";
import ScoreOverTimeChart from "./score-over-time-chart";

const MetricsProgress = () => {
  const positiveAttributes = [
    {
      id: "attr-unbias-1",
      label: "Unbias",
      progress: 4.2,
      icon: "/icons/feature-fair.svg",
      status: "positive",
      description:
        "Holmes' speech exhibits a highly rehearsed and strategically persuasive tone, characteristic of someone attempting to sell a vision rather than transparently discuss facts.",
    },
    {
      id: "attr-consistent-1",
      label: "Consistent",
      progress: 6.1,
      icon: "/icons/feature-logical.svg",
      status: "positive",
      description:
        "Holmes' speech demonstrates a moderate level of internal inconsistency, primarily due to contradictions in her portrayal of transparency, technology capabilities, and timeline.",
    },
    {
      id: "attr-emotional-1",
      label: "Emotional Misdirection",
      progress: 7.4,
      icon: "/icons/feature-consistency.svg",
      status: "positive",
      description:
        "She repeatedly invokes themes of personal loss, mission-driven purpose, and an almost spiritual devotion to her work, which serves to build an emotional connection while diverting from factual scrutiny.",
    },
  ];

  const negativeAttributes = [
    {
      id: "attr-fear-1",
      label: "Excessive fear",
      progress: 5.7,
      icon: "/icons/politician.svg",
      negative: true,
      description:
        "Holmes employs moderate exaggeration of fear, particularly in her framing of the healthcare system as fundamentally broken and inaccessible.",
    },
    {
      id: "attr-optimism-1",
      label: "Overoptimism",
      progress: 8.6,
      icon: "/icons/security.svg",
      negative: true,
      description:
        "Holmes' speech contains a significant degree of exaggerated excitement, particularly in her portrayal of Theranos as a revolutionary force in healthcare.",
    },
    {
      id: "attr-deflection-1",
      label: "Deflection",
      progress: 7.8,
      icon: "/icons/private-capital.svg",
      negative: true,
      description:
        "Holmes demonstrates a notable degree of deflection throughout the conversation, often shifting focus away from direct scrutiny and redirecting to emotional appeals.",
    },
    {
      id: "attr-triangulation-1",
      label: "Triangulation",
      progress: 7.2,
      icon: "/icons/feature-aggregation.svg",
      negative: true,
      description:
        "Holmes employs a moderate level of triangulation, frequently invoking external authorities, regulatory milestones, and high-profile endorsements to bolster credibility.",
    },
    {
      id: "attr-formal-1",
      label: "Formal Fallacies",
      progress: 7.9,
      icon: "/icons/feature-conceptual.svg",
      negative: true,
      description:
        "Holmes' speech contains multiple logical fallacies that weaken the coherence of her arguments, particularly in how she justifies Theranos' mission.",
    },
    {
      id: "attr-informal-1",
      label: "Informal Fallacies",
      progress: 8.2,
      icon: "/icons/feature-conceptual.svg",
      negative: true,
      description:
        "Holmes exhibits a significant reliance on informal fallacies, using rhetorical tactics that obscure the weaknesses in her arguments while amplifying their emotional appeal.",
    },
  ];

  return (
    <div className="w-full flex flex-col gap-4">
      <div className="">
        <h3 className="text-[18px] text-[#292929] font-semibold my-1">
          Positive Attributes
        </h3>
        <div className="flex overflow-x-auto w-full max-w-[750px] gap-4 pb-2">
          {positiveAttributes.map((att) => (
            <div key={att.id} className="flex-shrink-0">
              <AttributeCard {...att} />
            </div>
          ))}
        </div>

        <h3 className="text-[18px] text-[#292929] font-semibold mt-7 my-1">
          Negative Attributes
        </h3>
        <div className="flex overflow-x-auto w-full max-w-[750px] gap-4 pb-2">
          {negativeAttributes.map((att) => (
            <div key={att.id} className="flex-shrink-0">
              <AttributeCard {...att} />
            </div>
          ))}
        </div>
      </div>

      <ScoreOverTimeChart />
    </div>
  );
};

export default MetricsProgress;
