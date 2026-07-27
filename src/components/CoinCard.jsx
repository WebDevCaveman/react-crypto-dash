import { Link } from "react-router";

const CoinCard = ({ coin }) => {
  return (
    <Link to={`/coin/${coin.id}`} className="block">
      <div className="rounded-[18px] border border-border bg-surface p-6 shadow-sm transition-shadow duration-200 ease-out hover:shadow-md">
        <div className="flex items-center gap-4">
          <img
            src={coin.image}
            alt={coin.name}
            className="h-12 w-12 shrink-0 rounded-full"
          />
          <div className="min-w-0">
            <h2 className="truncate font-display text-h6 font-semibold">
              {coin.name}
            </h2>
            <p className="text-caption-1 font-medium tracking-wide text-text-muted">
              {coin.symbol.toUpperCase()}
            </p>
          </div>
        </div>

        <div className="mt-6 flex items-baseline justify-between gap-3">
          <p className="font-display text-h5 font-semibold text-text">
            ${coin.current_price.toFixed(2)}
          </p>
          <p
            className={`inline-flex shrink-0 items-center rounded-full px-3 py-1 text-caption-1 font-semibold ${
              coin.price_change_percentage_24h >= 0
                ? "bg-success/12 text-success"
                : "bg-danger/12 text-danger"
            }`}
          >
            {coin.price_change_percentage_24h.toFixed(2)}%
          </p>
        </div>

        <div className="mt-4 flex items-baseline justify-between gap-3 border-t border-border-subtle pt-4 text-body-sm">
          <span className="text-text-secondary">Market Cap</span>
          <span className="font-semibold text-text">
            ${coin.market_cap.toLocaleString("en-US")}
          </span>
        </div>
      </div>
    </Link>
  );
};

export default CoinCard;
