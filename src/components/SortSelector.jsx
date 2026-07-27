const SortSelector = ({ sortBy, onSortChange }) => {
  return (
    <div className="sort-selector flex items-center gap-2">
      <label htmlFor="sort" className="mr-2 font-semibold">
        Sort by:
      </label>
      <select
        id="sort"
        value={sortBy}
        onChange={(e) => onSortChange(e.target.value)}
        className="rounded-md border border-border bg-surface px-3 py-2 text-body text-text focus:outline-none focus:ring-2 focus:ring-focus"
      >
        <option value="market_cap_desc">Market Cap (High to Low)</option>
        <option value="market_cap_asc">Market Cap (Low to High)</option>
        <option value="price_desc">Price (High to Low)</option>
        <option value="price_asc">Price (Low to High)</option>
      </select>
    </div>
  );
};

export default SortSelector;
