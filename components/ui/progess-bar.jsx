import { cn } from "@/lib/utils"

export function ProgressBar({ progress = 0, showAsSegments = true, negative = false, className }) {
  const totalSegments = 10

  const segmentValue = showAsSegments
    ? Math.min(progress, totalSegments) 
    : (progress / 100) * totalSegments 

  const completeSegments = Math.floor(segmentValue)
  const partialFill = segmentValue - completeSegments
  const greenGradient = [
    "#8ece8e", 
    "#83c983",
    "#79c479",
    "#6fbf6f",
    "#65ba65",
    "#5cb55c", 
    "#52a052",
    "#489b48",
    "#3e963e",
    "#349134", 
  ]

  const redGradient = [
    "#f5a9a9", 
    "#f29a9a",
    "#ef8b8b",
    "#ec7c7c",
    "#e96d6d",
    "#e65e5e", 
    "#d45555",
    "#c24d4d",
    "#b04444",
    "#9e3b3b", 
  ]
  const colorGradient = negative ? redGradient : greenGradient

  return (
    <div className={cn("w-full flex items-center", className)}>
      {Array.from({ length: totalSegments }).map((_, index) => {
        const isFilled = index < completeSegments

        const isPartial = index === completeSegments && partialFill > 0

        const segmentColor = colorGradient[index]

        return (
          <div key={index} className="relative h-[10px] w-16 mr-[2px]">
            <div className="absolute inset-0 transform skew-x-[-20deg] bg-gray-100" />
            {isFilled && (
              <div className="absolute inset-0 transform skew-x-[-20deg]" style={{ backgroundColor: segmentColor }} />
            )}
            {isPartial && (
              <div
                className="absolute inset-0 transform skew-x-[-20deg]"
                style={{
                  width: `${partialFill * 100}%`,
                  backgroundColor: segmentColor,
                }}
              />
            )}
          </div>
        )
      })}
    </div>
  )
}
