
function FilterBar({
  areas,
  selectedArea,
  onAreaChange,
  searchTerm,
  onSearchChange,
}) {
  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8">
      <input
        type="text"
        placeholder="Search by name or code..."
        value={searchTerm}
        onChange={(e) => onSearchChange(e.target.value)}
        className="p-2 rounded-md bg-gray-800 text-white"
      />
      <select
        value={selectedArea}
        onChange={(e) => onAreaChange(e.target.value)}
        className="p-2 rounded-md bg-gray-800 text-white"
      >
        <option value="">All Areas</option>
        {areas.map((area) => (
          <option key={area} value={area}>
            {area}
          </option>
        ))}
      </select>
    </div>
  );
}
export default FilterBar;
