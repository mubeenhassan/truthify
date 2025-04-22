const ContentLeft = ({ profile }) => {
  return (
    <div className="w-full">
      {/* Replace with actual report summary or scores */}
      <h2 className="text-xl font-semibold mb-4">Report Overview</h2>
      <div className="bg-white p-4 rounded shadow">
        <p>This is a placeholder for left-side content in Report Scores.</p>
      </div>
    </div>
  );
};

const ContentRight = ({ profile }) => {
  return (
    <div className="w-full">
      {/* Replace with insights, analysis, or charts */}
      <h2 className="text-xl font-semibold mb-4">Detailed Insights</h2>
      <div className="bg-white p-4 rounded shadow">
        <p>This is a placeholder for right-side content in Report Scores.</p>
      </div>
    </div>
  );
};

const ReportScores = {
  ContentLeft,
  ContentRight,
};

export default ReportScores;
