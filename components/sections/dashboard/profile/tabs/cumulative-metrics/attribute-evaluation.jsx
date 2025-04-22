"use client";

const Attributes = [
  {
    title: "Positive Attributes",
    value: "5.2",
    valuecolor: "#38A737",
    des: "When combined, these traits offer a holistic view of intellec",
  },
  {
    title: "Negative Attributes",
    value: "7.1",
    valuecolor: "#EC3232",
    des: "These negative traits expose irrationality, deception, and m",
  },
  {
    title: "Fallacy Detection",
    value: "7.5",
    valuecolor: "#EC3232",
    des: "The presence of logical fallacies—errors in reasoning that undermine an argument. These in",
  },
];

function AttributeEvaluation() {
  return (
    <div className="w-full grid grid-cols-2 gap-4 py-4 px-2">
      {Attributes.map((att, i) => (
        <div
          className={`p-4 rounded-2xl flex flex-col justify-between items-start bg-gradient-to-b from-[#F1F6FA] to-[#FFFFFF] border border-gray-200 shadow-[#F1F6FA] gap-4 pb-5 ${
            i == 2 && "col-span-2 "
          }`}
          key={i}
        >
          <div
            className={`${
              i == 2 && "flex justify-between items-start  w-full"
            }`}
          >
            <h3 className="text-[14px] md:text-[16px] text-[#292929] font-semibold">
              {att.title}
            </h3>
            <div className={`${i == 2 && "mt-3 mr-3"}`}>
              <span
                className={`text-[${att.valuecolor}] text-[24px] md:text-[26px] font-semibold block -mb-[10px]`}
              >
                {att.value}
              </span>
              <span className="text-[10px] md:text-[12px] text-[#292929] font-medium  ">
                Total Score
              </span>
            </div>
          </div>

          <div
            className={`${
              i == 2 && "max-w-[70%] -mt-10"
            } flex flex-col gap-[10px]`}
          >
            <p className="text-[12px] text-[#292929]">{att.des}</p>
            <button className="max-w-[90px] cursor-pointer text-[10px] text-[#FFFFFF] flex justify-center items-center bg-[#069AEE] rounded-sm  px-3 cursor-pointet p-2">
              View Details
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default AttributeEvaluation;
