const LimitSelector = ({ limit, onLimitChange }) => {
  return (
    <div className="limit-selector flex items-center justify-end gap-2">
      <label htmlFor="limit" className="mr-2 font-semibold">
        Show:
      </label>
      <select
        id="limit"
        value={limit}
        onChange={(e) => onLimitChange(Number(e.target.value))}
        className="rounded-md border border-border bg-surface px-3 py-2 text-body text-text focus:outline-none focus:ring-2 focus:ring-focus"
      >
        <option value={10}>10</option>
        <option value={20}>20</option>
        <option value={50}>50</option>
      </select>
    </div>
  );
};

export default LimitSelector;
