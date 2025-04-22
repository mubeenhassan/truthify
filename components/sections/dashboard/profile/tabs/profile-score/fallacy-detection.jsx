const FallacyDetection = ({ fallacies }) => {
  return (
    <>
      <h3 className="text-zinc-800 text-lg font-semibold">Fallacy Detection</h3>
      <div className="p-3 bg-white rounded-lg border border-gray-200 shadow-sm relative">
        <div className="relative">
          <div className="space-y-4 divide-y divide-zinc-100 max-h-[500px] overflow-y-auto thin-scrollbar pr-3 pb-12">
            {fallacies.map((fallacy) => (
              <div key={fallacy.id} className="pb-4 flex gap-4">
                <div className="relative flex-shrink-0">
                  <img
                    src="/images/youtube-thumbnail.png"
                    alt="Fallacy thumbnail"
                    className="w-32 h-[74px] object-cover bg-zinc-200 rounded-md"
                  />
                </div>
                <div className="flex-1 text-[11px] leading-relaxed">
                  <p className="font-semibold text-zinc-800 text-[12px] mb-1 line-clamp-2">
                    {fallacy.title}
                  </p>
                  <p className="text-zinc-400 text-[10px] font-medium mb-1.5">
                    {fallacy.date}
                  </p>
                  <p className="text-zinc-600 font-medium text-[11px] mb-1.5">
                    {fallacy.conclusion}
                  </p>
                  <p className="text-zinc-700 text-[11px] font-semibold mb-1.5">
                    {fallacy.count} Fallacies Found:
                  </p>
                  <div className="flex flex-wrap gap-1.5 mb-2">
                    {fallacy.tags.slice(0, 7).map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-0.5 bg-gray-100 rounded-[3px] text-zinc-700 text-[10px] border border-gray-200 whitespace-nowrap"
                      >
                        {tag}
                      </span>
                    ))}
                    {fallacy.tags.length > 7 && (
                      <span className="text-gray-400 text-[10px] self-center">
                        ...
                      </span>
                    )}
                  </div>
                  <p className="text-zinc-500 text-[10px] leading-tight mb-1">
                    These fallacies are identified based on the source.
                  </p>
                  <button className="text-sky-600 text-[10px] font-semibold border-b border-transparent hover:border-sky-600 leading-none">
                    See More
                  </button>
                </div>
                <div className="flex-shrink-0">
                  <div className="w-14 h-14 bg-red-500/10 rounded-md flex items-center justify-center">
                    <span className="text-red-500 text-3xl font-semibold">
                      {fallacy.count}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="absolute bottom-0 left-0 right-3 h-12 bg-gradient-to-t from-white via-white/90 to-transparent pointer-events-none"></div>
        </div>
      </div>
    </>
  );
};

export default FallacyDetection;
