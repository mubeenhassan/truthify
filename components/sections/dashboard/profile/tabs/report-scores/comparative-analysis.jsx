
const ComparativeAnalysis = ({ data }) => {
    const { comparativeScorePercent, name, profileImage } = data;
    return (
      <div className="p-5 bg-white rounded-lg border border-slate-200 shadow-sm mb-6">
        <div className="mb-6">
          <h3 className="text-zinc-800 text-xl font-semibold leading-tight">
            Comparative Analysis
          </h3>
          <p className="text-zinc-500 text-xs font-normal leading-3 mt-1">
            {name}
          </p>
        </div>
        <div className="relative h-24 mb-4">
          <div className="absolute top-1/2 -translate-y-1/2 h-[5px] w-full bg-gradient-to-r from-red-600 via-amber-400 to-green-600 rounded-full"></div>
          <div className="absolute top-1/2 -translate-y-1/2 left-1/2 w-2 h-2 -ml-1 bg-zinc-700 rounded-full z-10"></div>
          {typeof comparativeScorePercent === "number" &&
            !isNaN(comparativeScorePercent) && (
              <div
                className="absolute top-1/2 -translate-y-1/2 z-20"
                style={{
                  left: `calc(${Math.max(
                    0,
                    Math.min(100, comparativeScorePercent)
                  )}% - 8px)`,
                }}
              >
                <div className="absolute -top-[60px] left-1/2 -translate-x-1/2 flex flex-col items-center w-max">
                  <div className="p-0.5 bg-zinc-800 rounded shadow-md mb-1 w-[36px] h-[36px] flex items-center justify-center">
                    <img
                      className="w-8 h-8 rounded-sm object-cover"
                      src={profileImage}
                      alt=""
                    />
                  </div>
                </div>
                <div className="w-4 h-4 bg-zinc-800 rounded-full ring-[3px] ring-white shadow"></div>
                <div className="absolute top-6 left-1/2 -translate-x-1/2 whitespace-nowrap text-center mt-1">
                  <p className="text-zinc-800 text-xl font-bold">
                    {comparativeScorePercent.toFixed(1)}%
                  </p>
                  <p className="text-zinc-600 text-xs mt-0.5">{name}</p>
                </div>
              </div>
            )}
          <div className="absolute top-full w-full flex justify-between text-zinc-500 text-xs mt-2.5">
            <span>0</span>
            <span>50%</span>
            <span>100</span>
          </div>
        </div>
      </div>
    );
  };
  
export default ComparativeAnalysis;
