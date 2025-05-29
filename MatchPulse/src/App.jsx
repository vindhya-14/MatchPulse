import { useEffect, useState } from "react";

function App() {
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("http://localhost:5000/api/matches")
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to fetch matches");
        }
        return res.json();
      })
      .then((data) => setMatches(data.matches || []))
      .catch((err) => {
        console.error(err);
        setError(err.message);
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-800 via-indigo-800 to-purple-900 text-white relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute w-96 h-96 bg-blue-500/20 rounded-full -top-48 -left-48 animate-pulse"></div>
        <div className="absolute w-96 h-96 bg-purple-500/20 rounded-full -bottom-48 -right-48 animate-pulse"></div>
        <div className="absolute w-64 h-64 bg-indigo-500/20 rounded-full top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 animate-pulse"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 relative z-10">
        {/* Header */}
        <header className="text-center mb-12">
          <div className="inline-block bg-gradient-to-r from-blue-500 to-indigo-600 p-1 rounded-full mb-4 shadow-lg transform hover:scale-105 transition-transform duration-300">
            <div className="bg-gray-900/80 backdrop-blur-sm px-4 py-2 rounded-full">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400 font-bold text-sm uppercase tracking-widest">
                Live Soccer Updates
              </span>
            </div>
          </div>
          <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-3 tracking-tight">
            Match <span className="text-blue-400">Pulse</span>
          </h1>
          <p className="text-gray-300 max-w-2xl mx-auto text-lg font-medium">
            Catch the latest soccer fixtures from top competitions worldwide
          </p>
        </header>

        {/* Stats Bar */}
        {!loading && !error && matches.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            {[
              {
                icon: (
                  <svg
                    className="w-8 h-8 text-blue-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                    />
                  </svg>
                ),
                title: "Total Matches",
                value: matches.length,
              },
              {
                icon: (
                  <svg
                    className="w-8 h-8 text-indigo-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                    />
                  </svg>
                ),
                title: "Competitions",
                value: new Set(matches.map((match) => match.competition?.name))
                  .size,
              },
              {
                icon: (
                  <svg
                    className="w-8 h-8 text-green-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                ),
                title: "Next Match",
                value: new Date(matches[0].utcDate).toLocaleDateString(),
              },
            ].map((stat, index) => (
              <div
                key={index}
                className="bg-gray-900/50 backdrop-blur-md p-6 rounded-2xl shadow-lg border border-gray-700/50 flex items-center hover:scale-105 transition-all duration-300"
              >
                <div className="bg-gray-800/50 p-3 rounded-full mr-4">
                  {stat.icon}
                </div>
                <div>
                  <p className="text-gray-400 text-sm font-medium">
                    {stat.title}
                  </p>
                  <p className="text-2xl font-bold text-white">{stat.value}</p>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Main Content */}
        <main>
          {loading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-pulse flex flex-col items-center">
                <div className="w-16 h-16 bg-blue-400/30 rounded-full mb-4"></div>
                <p className="text-gray-300 text-lg">Loading matches...</p>
              </div>
            </div>
          ) : error ? (
            <div className="bg-red-900/50 backdrop-blur-md border-l-4 border-red-500 p-6 rounded-lg max-w-2xl mx-auto">
              <div className="flex">
                <div className="flex-shrink-0">
                  <svg
                    className="h-6 w-6 text-red-400"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <div className="ml-3">
                  <h3 className="text-lg font-medium text-red-300">
                    Error loading matches
                  </h3>
                  <div className="mt-2 text-sm text-red-200">
                    <p>{error}</p>
                    <p className="mt-2">
                      Please try again later or check your connection.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ) : matches.length === 0 ? (
            <div className="text-center py-12">
              <svg
                className="mx-auto h-12 w-12 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <h3 className="mt-2 text-xl font-medium text-white">
                No matches scheduled
              </h3>
              <p className="mt-1 text-gray-300">
                There are currently no upcoming matches available.
              </p>
            </div>
          ) : (
            <div className="grid gap-6 grid-cols-1 lg:grid-cols-2 xl:grid-cols-3">
              {matches.map((match) => (
                <div
                  key={match.id}
                  className="bg-gray-900/70 backdrop-blur-md rounded-2xl shadow-xl border border-gray-700/50 overflow-hidden hover:scale-105 hover:shadow-2xl transition-all duration-300"
                >
                  {/* Match Header */}
                  <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-4">
                    <div className="flex justify-between items-center">
                      {match.competition && (
                        <span className="px-3 py-1 bg-white/20 rounded-full text-white text-xs font-semibold tracking-wide">
                          {match.competition.name}
                        </span>
                      )}
                      <span className="text-gray-200 text-xs font-medium">
                        {new Date(match.utcDate).toLocaleDateString("en-US", {
                          weekday: "short",
                          month: "short",
                          day: "numeric",
                        })}
                      </span>
                    </div>
                  </div>

                  {/* Teams */}
                  <div className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="text-center flex-1">
                        <div className="font-bold text-white text-lg">
                          {match.homeTeam.name}
                        </div>
                        <div className="mt-2">
                          <div className="w-12 h-12 bg-gray-700/50 rounded-full mx-auto flex items-center justify-center border border-gray-600">
                            <span className="text-gray-400 text-xs">Logo</span>
                          </div>
                        </div>
                      </div>

                      <div className="mx-4 text-center">
                        <div className="bg-gray-800/50 rounded-lg px-4 py-2">
                          <span className="text-white font-bold text-lg">
                            VS
                          </span>
                        </div>
                        <div className="mt-2 text-xs text-gray-300">
                          {new Date(match.utcDate).toLocaleTimeString([], {
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </div>
                      </div>

                      <div className="text-center flex-1">
                        <div className="font-bold text-white text-lg">
                          {match.awayTeam.name}
                        </div>
                        <div className="mt-2">
                          <div className="w-12 h-12 bg-gray-700/50 rounded-full mx-auto flex items-center justify-center border border-gray-600">
                            <span className="text-gray-400 text-xs">Logo</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Match Details */}
                  <div className="border-t border-gray-700/50 px-6 py-4 bg-gray-800/30">
                    <div className="grid grid-cols-2 gap-3 text-sm">
                      <div className="flex items-center">
                        <svg
                          className="w-5 h-5 text-gray-400 mr-2"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                          />
                        </svg>
                        <span className="text-gray-300">
                          {new Date(match.utcDate).toLocaleDateString()}
                        </span>
                      </div>
                      <div className="flex items-center">
                        <svg
                          className="w-5 h-5 text-gray-400 mr-2"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                          />
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                          />
                        </svg>
                        <span className="text-gray-300">
                          {match.venue || "TBD"}
                        </span>
                      </div>
                      {match.matchday && (
                        <div className="flex items-center col-span-2">
                          <svg
                            className="w-5 h-5 text-gray-400 mr-2"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                            />
                          </svg>
                          <span className="text-gray-300">
                            Matchday {match.matchday}
                          </span>
                        </div>
                      )}
                      <div className="flex items-center col-span-2">
                        <svg
                          className="w-5 h-5 text-gray-400 mr-2"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M13 10V3L4 14h7v7l9-11h-7z"
                          />
                        </svg>
                        <span className="text-gray-300">
                          Status:{" "}
                          <span className="font-medium capitalize">
                            {match.status.toLowerCase()}
                          </span>
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </main>

        {/* Footer */}
        <footer className="mt-16 text-center text-gray-400 text-sm pb-8">
          <p>
            © {new Date().getFullYear()} Soccer Matches Dashboard. All rights
            reserved.
          </p>
          <p className="mt-1">Data provided by Football API</p>
        </footer>
      </div>
    </div>
  );
}

export default App;
