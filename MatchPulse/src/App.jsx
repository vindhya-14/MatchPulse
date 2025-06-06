import { useEffect, useState } from "react";

function App() {
  const [competitions, setCompetitions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const API_URL = import.meta.env.VITE_API_BASE_URL;

  useEffect(() => {
    fetch(`${API_URL}/api/competitions`)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch competitions");
        return res.json();
      })
      .then((data) => setCompetitions(data.competitions || []))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [API_URL]);

  // Helper: format date nicely
  const formatDate = (dateStr) => {
    if (!dateStr) return "N/A";
    const d = new Date(dateStr);
    return d.toLocaleDateString(undefined, {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-indigo-900 to-purple-900 text-white relative overflow-hidden">
      {/* Background pulses */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute w-96 h-96 bg-blue-600/30 rounded-full -top-48 -left-48 animate-pulse"></div>
        <div className="absolute w-96 h-96 bg-purple-600/30 rounded-full -bottom-48 -right-48 animate-pulse"></div>
        <div className="absolute w-64 h-64 bg-indigo-600/30 rounded-full top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 animate-pulse"></div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-10 relative z-10">
        <header className="text-center mb-12">
          <div className="inline-block bg-gradient-to-r from-blue-500 to-indigo-600 p-1 rounded-full mb-4 shadow-lg hover:scale-105 transition-transform duration-300">
            <div className="bg-gray-900/90 backdrop-blur-sm px-4 py-2 rounded-full">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400 font-bold text-sm uppercase tracking-widest">
                Soccer Competitions Explorer
              </span>
            </div>
          </div>
          <h1 className="text-5xl font-extrabold tracking-tight mb-3">
            Explore <span className="text-blue-400">Global Soccer</span>{" "}
            Competitions
          </h1>
          <p className="text-gray-300 max-w-xl mx-auto text-lg font-medium">
            Discover detailed info on tournaments from all continents, their
            seasons, types, and current status.
          </p>
        </header>

        {/* Loading and Error */}
        {loading && (
          <div className="flex justify-center items-center h-64">
            <div className="animate-pulse flex flex-col items-center">
              <div className="w-16 h-16 bg-blue-400/40 rounded-full mb-4"></div>
              <p className="text-gray-300 text-lg">Loading competitions...</p>
            </div>
          </div>
        )}

        {error && (
          <div className="bg-red-900/70 p-6 rounded-lg max-w-2xl mx-auto text-center">
            <p className="text-red-400 font-semibold text-lg mb-2">
              Error Loading Competitions
            </p>
            <p className="text-red-300">{error}</p>
            <p>Please check your connection or try again later.</p>
          </div>
        )}

        {/* Competitions Grid */}
        {!loading && !error && (
          <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {competitions.length === 0 ? (
              <p className="text-center text-gray-400 col-span-full">
                No competitions data available.
              </p>
            ) : (
              competitions.map((comp) => (
                <div
                  key={comp.id}
                  className="bg-gray-900/80 backdrop-blur-md rounded-2xl shadow-xl border border-gray-700/60 p-6 hover:scale-105 hover:shadow-2xl transition-transform duration-300"
                >
                  <div className="flex justify-between items-center mb-3">
                    <h2 className="text-xl font-semibold text-blue-400">
                      {comp.name}
                    </h2>
                    <span className="px-3 py-1 bg-indigo-700 rounded-full text-xs uppercase font-semibold tracking-wide">
                      {comp.type || "Unknown"}
                    </span>
                  </div>

                  {/* Area info */}
                  <div className="mb-4 flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-gray-700 flex items-center justify-center text-sm font-bold uppercase text-indigo-300">
                      {comp.area.code || "NA"}
                    </div>
                    <p className="text-gray-300 font-medium">
                      {comp.area.name}
                    </p>
                  </div>

                  {/* Season Info */}
                  <div className="mb-3">
                    <h3 className="font-semibold text-white mb-1">
                      Current Season:
                    </h3>
                    {comp.currentSeason ? (
                      <ul className="text-gray-400 text-sm list-disc list-inside space-y-1">
                        <li>
                          <span className="font-medium text-indigo-300">
                            Start Date:
                          </span>{" "}
                          {formatDate(comp.currentSeason.startDate)}
                        </li>
                        <li>
                          <span className="font-medium text-indigo-300">
                            End Date:
                          </span>{" "}
                          {formatDate(comp.currentSeason.endDate)}
                        </li>
                        <li>
                          <span className="font-medium text-indigo-300">
                            Matchday:
                          </span>{" "}
                          {comp.currentSeason.currentMatchday || "N/A"}
                        </li>
                        <li>
                          <span className="font-medium text-indigo-300">
                            Winner:
                          </span>{" "}
                          {comp.currentSeason.winner?.name || "TBD"}
                        </li>
                      </ul>
                    ) : (
                      <p className="text-gray-400 italic">
                        No current season data
                      </p>
                    )}
                  </div>

                  {/* Other Info */}
                  <div className="flex justify-between items-center text-gray-400 text-sm mt-4">
                    <p>Seasons: {comp.numberOfAvailableSeasons}</p>
                    <p>
                      Last Updated:{" "}
                      {new Date(comp.lastUpdated).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
