
export const ScoreCircle = ({ score }) => {
  const radius = 20;
  const stroke = 4;
  const normalizedRadius = radius - stroke * 2;
  const circumference = normalizedRadius * 2 * Math.PI;
  const percent = Math.min(Math.max(score / 5, 0), 1); // Cap at [0, 1]
  const strokeDashoffset = circumference - percent * circumference;

  return (
    <svg height={radius * 2} width={radius * 2} className="text-blue-500">
      <circle
        stroke="#e5e7eb"
        fill="transparent"
        strokeWidth={stroke}
        r={normalizedRadius}
        cx={radius}
        cy={radius}
      />
      <circle
        stroke="currentColor"
        fill="transparent"
        strokeWidth={stroke}
        strokeLinecap="round"
        strokeDasharray={circumference + " " + circumference}
        style={{ strokeDashoffset }}
        r={normalizedRadius}
        cx={radius}
        cy={radius}
      />
      <text
        x="50%"
        y="50%"
        dy=".3em"
        textAnchor="middle"
        className="text-xs fill-gray-900 font-semibold"
      >
        {score}
      </text>
    </svg>
  );
};
