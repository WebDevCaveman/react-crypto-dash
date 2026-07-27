const FilterInput = ({ filter, onFilterChange }) => {
  return (
    <div className="filter flex items-center gap-2">
      <label htmlFor="filter" className="mr-2 font-semibold">
        Filter:
      </label>
      <input
        id="filter"
        type="text"
        value={filter}
        onChange={(e) => onFilterChange(e.target.value)}
        placeholder="Search coins by name or symbol"
        className="rounded-md border border-border bg-surface px-3 py-2 text-body text-text focus:outline-none focus:ring-2 focus:ring-focus w-md"
      />
    </div>
  );
};

export default FilterInput;
