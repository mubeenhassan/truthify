// components/MetricsProgress.tsx
import AttributeCard from "./attribute-card";
import ScoreOverTimeChart from "./score-over-time-chart";


const MetricsProgress=()=> {
  const positiveAttributes = [
    {
      id: "attr-unbias-1",
      label: "Unbias",
      progress: 3.7,
      color: "bg-blue-500",
      icon: "/icons/positiveAttributeIcon1.svg",
      status: "positive",
    },
    {
      id: "attr-consistent-1",
      label: "Consistent",
      progress: 5.2,
      color: "bg-green-500",
      icon: "/icons/positiveAttributeIcon2.svg",
      status: "positive",
    },
  ];

  const negativeAttributes = [
    {
      id: "attr-fear-1",
      label: "Excessive fear",
      progress: 5.3,
      color: "bg-red-500",
      icon: "/icons/negativeAttributeIcon1.svg",
      status: "negative",
    },
    {
      id: "attr-optimism-1",
      label: "Overoptimism",
      progress: 8.2,
      color: "bg-red-600",
      icon: "/icons/negativeAttributeIcon2.svg",
      status: "negative",
    },
  ];

  return (
    <div className="w-full flex flex-col gap-4">
    <div className="">
      <h3 className="text-[18px] text-[#292929] font-semibold my-1">
        Positive Attributes
      </h3>
      <div className="grid grid-cols-2 xl:grid-cols-3 gap-4">
        {positiveAttributes.map((att) => (
          <AttributeCard key={att.id} {...att} type="progress" />
        ))}
        <AttributeCard
          id="info-card-1"
          type="info"
          label="Conceptual"
          description="Measures the level of discussion around abstract concepts and principles versus concrete examples."
        />
      </div>

      <h3 className="text-[18px] text-[#292929] font-semibold mt-7 my-1">
        Negative Attributes
      </h3>
      <div className="grid grid-cols-2 xl:grid-cols-3 gap-4">
        {negativeAttributes.map((att) => (
          <AttributeCard key={att.id} {...att} type="progress" />
        ))}
      </div>
    </div>
    <ScoreOverTimeChart/>
    </div>
  );
}

export default MetricsProgress;
