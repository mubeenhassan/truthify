export function FallacyList({ fallacies }) {
  return (
    <div className="space-y-2">
      {fallacies.map((fallacy) => (
        <div key={fallacy.name} className="flex w-fit justify-between items-center bg-[#EDF1F4] px-2.5 py-1 rounded-sm">
          <span className="text-sm font-medium text-zinc-700">{fallacy.name}</span>
          <span className="text-xs font-semibold text-sky-700  px-2 py-0.5 ">
            {fallacy.percentage}%
          </span>
        </div>
      ))}
    </div>
  )
}
