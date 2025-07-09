import { FaStar } from "react-icons/fa";
import CompetitionCard from "./CompetitionCard";

function Favorites({ favorites, onRemove }) {
  return (
    <div className="mt-10">
      {/* Section Heading */}
      <div className="flex items-center gap-2 mb-4">
        <FaStar className="text-yellow-400 text-2xl" />
        <h2 className="text-2xl font-bold text-yellow-300 tracking-wide">
          Your Favorite Competitions
        </h2>
      </div>

      {/* Empty State */}
      {favorites.length === 0 ? (
        <div className="bg-gray-800/80 border border-gray-700 p-6 rounded-xl text-center text-gray-400">
          <p className="text-lg">No favorites yet.</p>
          <p className="text-sm">Click the ☆ icon on a card to add one!</p>
        </div>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {favorites.map((comp) => (
            <CompetitionCard
              key={comp.id}
              comp={comp}
              onFavToggle={onRemove}
              isFav={true}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default Favorites;
