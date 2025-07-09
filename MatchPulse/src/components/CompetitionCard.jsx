function CompetitionCard({ comp, onFavToggle, isFav }) {
  return (
    <div className="relative bg-gray-900/70 border border-gray-700 hover:border-indigo-500 transition duration-300 rounded-2xl p-5 shadow-lg hover:shadow-indigo-600/30 hover:scale-[1.02] transform">
      {/* Favorite Button */}
      <button
        onClick={() => onFavToggle(comp)}
        title={isFav ? "Remove from favorites" : "Add to favorites"}
        className="absolute top-3 right-3 text-yellow-400 hover:text-yellow-300 text-2xl transition-transform transform hover:scale-125"
      >
        {isFav ? "★" : "☆"}
      </button>

      {/* Competition Emblem */}
      {comp.emblem && (
        <div className="flex justify-center mb-3">
          <img
            src={comp.emblem}
            alt={`${comp.name} emblem`}
            className="w-12 h-12 object-contain"
          />
        </div>
      )}

      {/* Title & Area */}
      <h2 className="text-lg font-bold text-blue-300 text-center mb-1">
        {comp.name}
      </h2>
      <p className="text-sm text-center text-gray-400 mb-2">{comp.area.name}</p>

      {/* Details */}
      <div className="text-sm text-gray-300 space-y-1">
        <p>
          <span className="text-indigo-400 font-medium">Type:</span>{" "}
          {comp.type || "N/A"}
        </p>
        <p>
          <span className="text-indigo-400 font-medium">Seasons:</span>{" "}
          {comp.numberOfAvailableSeasons}
        </p>
        <p>
          <span className="text-indigo-400 font-medium">Matchday:</span>{" "}
          {comp.currentSeason?.currentMatchday ?? "N/A"}
        </p>
      </div>
    </div>
  );
}

export default CompetitionCard;
