import { Percent } from "lucide-react";

function ProgessBar({ value, status }) {
  const  barsections=Array(9).fill(undefined)
  const Percentage = value * 10;
  return (
    <div>
      <div
        style={{
          clipPath: "polygon(0% 0, 100% 0, 90% 100%, 0 100%)",
        }}
        className={`w-full h-[13px] bg-[#EBF2F5] overflow-hidden relative flex justify-between gap-1`}
      >
        <div
          style={{
            clipPath: "polygon(16% 0, 100% 0, 84% 100%, 0 100%)",
            width: `${Percentage}%`,
          }}
          className={`${status=='positive' ? 'bg-green-500': 'bg-red-500'} absolute top-0 left-[0%]  h-full -z-1 progress`}
        ></div>
         {
            barsections.map((_,i)=>(
                <div key={i} className="w-[2px] h-[110%] transform rotate-[40deg] bg-[#ffffff]"></div>
            ))
         }
      </div>
    </div>
  );
}

export default ProgessBar;
