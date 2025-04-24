export function FallacyList({ fallacies }) {
  return (
    <div className="space-y-2">
      {fallacies.map((fallacy) => (
        <div key={fallacy.name} className="flex w-fit justify-between items-center bg-[#EDF1F4] px-2.5 py-1 rounded-sm">
          <span className="text-[14px] font-medium text-[#292929]">{fallacy.name}</span>
          <span className="text-[13px] font-semibold text-primary  px-2 py-0.5 ">
            {fallacy.percentage}%
          </span>
        </div>
      ))}
    </div>
  )
}
