export function ScoreGaugeRecent({ scoreString }) {
  console.log(scoreString)
  const score = Number.parseFloat(scoreString) || 0
  const percentage = Math.max(0, Math.min(100, (score / 10) * 100)) // Assuming score is out of 10
  const strokeWidth = 10
  const size = 72
  const radius = (size - strokeWidth) / 2
  const circumference = radius * 2 * Math.PI
  const offset = circumference - (percentage / 100) * circumference
  const gradientId = "recent-profile-score-gradient"

  return (
    <div className="relative h-[72px]s w-[72px] flex-shrink-0">
      <svg height={size} width={size} viewBox={`0 0 ${size} ${size}`} className="-rotate-90">
        <defs>
          <linearGradient id={gradientId} x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#0593E9" />
            <stop offset="100%" stopColor="#0560E9" />
          </linearGradient>
        </defs>
        <circle
          className="text-gray-200"
          strokeWidth={strokeWidth}
          stroke="currentColor"
          fill="transparent"
          r={radius}
          cx={size / 2}
          cy={size / 2}
        />
        <circle
          stroke={`url(#${gradientId})`}
          strokeWidth={strokeWidth}
          strokeDasharray={`${circumference} ${circumference}`}
          style={{ strokeDashoffset: offset }}
          strokeLinecap="round"
          fill="transparent"
          r={radius}
          cx={size / 2}
          cy={size / 2}
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="text-lg font-bold text-zinc-800 leading-none">{scoreString}</span>
      </div>
    </div>
  )
}
