import { useState, useEffect } from "react";
import FilterBar from "./components/FilterBar";
import CompetitionCard from "./components/CompetitionCard";
import ChartView from "./components/ChartView";
import MapView from "./components/MapView";
import Favorites from "./components/Favorites";

function App() {
  const [competitions, setCompetitions] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [favorites, setFavorites] = useState(() =>
    JSON.parse(localStorage.getItem("favorites") || "[]")
  );
  const [areaFilter, setAreaFilter] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetch(import.meta.env.VITE_API_BASE_URL + "/api/competitions")
      .then((res) => res.json())
      .then((data) => {
        setCompetitions(data.competitions);
        setFiltered(data.competitions);
      });
  }, []);

  useEffect(() => {
    let data = competitions;
    if (areaFilter) {
      data = data.filter((c) => c.area.name === areaFilter);
    }
    if (searchTerm) {
      data = data.filter(
        (c) =>
          c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          c.code?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    setFiltered(data);
  }, [areaFilter, searchTerm, competitions]);

  const toggleFav = (comp) => {
    let updated;
    if (favorites.some((f) => f.id === comp.id)) {
      updated = favorites.filter((f) => f.id !== comp.id);
    } else {
      updated = [...favorites, comp];
    }
    setFavorites(updated);
    localStorage.setItem("favorites", JSON.stringify(updated));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-[#0f172a] text-white px-6 py-10">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl sm:text-5xl font-extrabold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-500">
          Football Competitions Explorer
        </h1>
        <p className="text-gray-300 max-w-2xl mx-auto text-lg">
          Explore worldwide football competitions, filter them by region or
          name, visualize insights, and save your favorites!
        </p>
      </div>

      {/* Filter & Search */}
      <div className="bg-gray-800/40 backdrop-blur-md p-4 rounded-xl mb-10 shadow-lg border border-gray-700">
        <FilterBar
          areas={[...new Set(competitions.map((c) => c.area.name))]}
          selectedArea={areaFilter}
          onAreaChange={setAreaFilter}
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
        />
      </div>

      {/* Chart */}
      <div className="bg-gray-900/60 p-6 rounded-2xl shadow-xl mb-10 border border-gray-700/50">
        <h2 className="text-2xl font-semibold text-indigo-400 mb-4">
          Area-wise Competitions Chart
        </h2>
        <ChartView competitions={filtered} />
      </div>

      {/* Map */}
      <div className="bg-gray-900/60 p-6 rounded-2xl shadow-xl mb-10 border border-gray-700/50">
        <h2 className="text-2xl font-semibold text-blue-400 mb-4">
          Geographic Distribution
        </h2>
        <MapView competitions={filtered} />
      </div>

      {/* Grid of Competitions */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold text-green-400 mb-6">
          All Competitions ({filtered.length})
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filtered.map((c) => (
            <CompetitionCard
              key={c.id}
              comp={c}
              isFav={favorites.some((f) => f.id === c.id)}
              onFavToggle={toggleFav}
            />
          ))}
        </div>
      </div>

      {/* Favorites Section */}
      <div className="bg-yellow-500/10 border border-yellow-400/40 p-6 rounded-2xl shadow-xl">
        <Favorites favorites={favorites} onRemove={toggleFav} />
      </div>
    </div>
  );
}

export default App;
