import { ClipLoader } from "react-spinners";
import CoinCard from "../components/CoinCard";
import LimitSelector from "../components/LimitSelector";
import FilterInput from "../components/FilterInput";
import SortSelector from "../components/SortSelector";

const HomePage = ({
  coins,
  loading,
  error,
  filter,
  setFilter,
  limit,
  setLimit,
  sortBy,
  setSortBy,
}) => {
  // Korzystamy ze slice() przed sortowaniem, aby utworzyć nową tablicę i uniknąć mutacji stanu. W przeciwnym razie sortowanie mogłoby zmienić oryginalną tablicę coins, co jest niezalecane w React.
  const filteredCoins = coins
    .filter(
      (coin) =>
        coin.name.toLowerCase().includes(filter.toLowerCase()) ||
        coin.symbol.toLowerCase().includes(filter.toLowerCase()),
    )
    .slice()
    .sort((a, b) => {
      if (sortBy === "market_cap_desc") {
        return b.market_cap - a.market_cap;
      }
      if (sortBy === "market_cap_asc") {
        return a.market_cap - b.market_cap;
      }
      if (sortBy === "price_desc") {
        return b.current_price - a.current_price;
      }
      if (sortBy === "price_asc") {
        return a.current_price - b.current_price;
      }
      return 0;
    });

  return (
    <div className="min-h-screen bg-canvas font-sans text-body text-text">
      <main className="mx-auto max-w-360 px-8 py-8">
        {loading && (
          <div
            role="status"
            aria-label="Loading"
            className="flex justify-center py-16"
          >
            <ClipLoader color="var(--brand)" size={96} />
          </div>
        )}

        {error && (
          <p className="rounded-[18px] border border-border border-l-4 border-l-danger bg-surface px-6 py-4 text-body font-semibold text-danger shadow-sm">
            {error}
          </p>
        )}

        <div className="controls mb-4 flex flex-col items-start justify-between gap-4 md:flex-row">
          <FilterInput filter={filter} onFilterChange={setFilter} />

          <div className="flex gap-3">
            <SortSelector sortBy={sortBy} onSortChange={setSortBy} />
            <LimitSelector limit={limit} onLimitChange={setLimit} />
          </div>
        </div>

        {coins.length > 0 && (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredCoins.length > 0 ? (
              filteredCoins.map((coin) => (
                <CoinCard key={coin.id} coin={coin} />
              ))
            ) : (
              <p className="text-body text-text-secondary">
                No coins found matching your filter.
              </p>
            )}
          </div>
        )}
      </main>
    </div>
  );
};

export default HomePage;
