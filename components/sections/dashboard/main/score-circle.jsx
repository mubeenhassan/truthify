export function ScoreCircle({ score }) {
  return (
    <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-gradient-to-bl from-sky-400 to-blue-500 border border-white/50 shadow-inner">
      <span className="text-xs font-extrabold text-stone-900">{score}</span>
    </div>
  )
}
