import { Link, useParams } from "react-router";
import { lazy, Suspense, useEffect, useState } from "react";
import { ClipLoader } from "react-spinners";
// Chart.js to ~200 kB — laduje sie dopiero tutaj, nie w bundlu dashboardu.
const CoinChart = lazy(() => import("../components/CoinChart"));
const API_URL = import.meta.env.VITE_COINGECKO_API_URL;

// Lokalny helper prezentacyjny — pojedyncza komórka statystyki, powtarzana 6x.
const Stat = ({ label, value }) => (
  <div className="rounded-[18px] border border-border bg-surface p-6 shadow-sm">
    <p className="text-caption-1 font-medium tracking-wide text-text-muted">
      {label}
    </p>
    <p className="mt-2 font-display text-h6 font-semibold text-text">{value}</p>
  </div>
);

const CoinDetailsPage = () => {
  const { id } = useParams();
  const [coin, setCoin] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch coin details using the id from the URL
    const fetchCoinDetails = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(`${API_URL}/coins/${id}`);
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        // Handle the fetched coin details (e.g., set state)
        setCoin(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCoinDetails();
  }, [id]);

  return (
    <div className="min-h-screen bg-canvas font-sans text-body text-text">
      <main className="mx-auto max-w-360 px-8 py-8">
        <Link
          to="/"
          className="text-body-sm font-semibold text-text-secondary transition-colors duration-200 ease-out hover:text-brand"
        >
          &larr; Back to Dashboard
        </Link>

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
          <p className="mt-8 rounded-[18px] border border-border border-l-4 border-l-danger bg-surface px-6 py-4 text-body font-semibold text-danger shadow-sm">
            {error}
          </p>
        )}

        {coin && (
          <>
            {/* Hero — tożsamość, cena, zmiana 24h, pozycja w zakresie 24h */}
            <section className="mt-6 rounded-[18px] border border-border bg-surface p-8 shadow-sm">
              <div className="flex flex-wrap items-center gap-4">
                <img
                  src={coin.image.large}
                  alt={coin.name}
                  className="h-16 w-16 shrink-0 rounded-full"
                />
                <div className="min-w-0">
                  <h1 className="truncate font-display text-h4 font-bold">
                    {coin.name}
                  </h1>
                  <p className="text-caption-1 font-medium tracking-wide text-text-muted">
                    {coin.symbol.toUpperCase()}
                  </p>
                </div>
                <span className="ml-auto inline-flex items-center rounded-full bg-brand-subtle px-3 py-1 text-caption-1 font-semibold tracking-wide text-brand">
                  RANK #{coin.market_cap_rank}
                </span>
              </div>

              <div className="mt-8 flex flex-wrap items-baseline gap-4">
                <p className="font-display text-h2 font-bold text-text">
                  ${coin.market_data.current_price.usd.toLocaleString("en-US")}
                </p>
                <span
                  className={`inline-flex items-center rounded-full px-3 py-1 text-body-sm font-semibold ${
                    coin.market_data.price_change_percentage_24h >= 0
                      ? "bg-success/12 text-success"
                      : "bg-danger/12 text-danger"
                  }`}
                >
                  {coin.market_data.price_change_percentage_24h >= 0 ? "+" : ""}
                  {coin.market_data.price_change_percentage_24h.toFixed(2)}%
                  (24h)
                </span>
              </div>

              <div className="mt-8">
                <div className="flex items-baseline justify-between text-body-sm">
                  <span className="text-text-secondary">
                    Low ${coin.market_data.low_24h.usd.toLocaleString("en-US")}
                  </span>
                  <span className="text-text-secondary">
                    High $
                    {coin.market_data.high_24h.usd.toLocaleString("en-US")}
                  </span>
                </div>
                <div className="relative mt-3 h-1.5 rounded-full bg-bg-subtle">
                  <span
                    className="absolute top-1/2 h-3.5 w-3.5 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-surface bg-brand shadow-xs"
                    style={{
                      left: `${Math.min(100, Math.max(0, ((coin.market_data.current_price.usd - coin.market_data.low_24h.usd) / (coin.market_data.high_24h.usd - coin.market_data.low_24h.usd || 1)) * 100))}%`,
                    }}
                  />
                </div>
              </div>
            </section>

            {/* Statystyki rynkowe */}
            <section className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              <Stat
                label="Market Cap"
                value={`$${coin.market_data.market_cap.usd.toLocaleString("en-US")}`}
              />
              <Stat
                label="Volume 24h"
                value={`$${coin.market_data.total_volume.usd.toLocaleString("en-US")}`}
              />
              <Stat
                label="Fully Diluted Valuation"
                value={
                  coin.market_data.fully_diluted_valuation?.usd
                    ? `$${coin.market_data.fully_diluted_valuation.usd.toLocaleString("en-US")}`
                    : "—"
                }
              />
              <Stat
                label="All-Time High"
                value={`$${coin.market_data.ath.usd.toLocaleString("en-US")}`}
              />
              <Stat
                label="All-Time Low"
                value={`$${coin.market_data.atl.usd.toLocaleString("en-US")}`}
              />
              <Stat
                label="Price Change 24h"
                value={`$${coin.market_data.price_change_24h.toFixed(2)}`}
              />
            </section>

            {/* Podaż — ile z maksymalnej podaży jest już w obiegu */}
            <section className="mt-6 rounded-[18px] border border-border bg-surface p-8 shadow-sm">
              <h2 className="font-display text-h6 font-semibold">Supply</h2>

              <div className="mt-6 flex items-baseline justify-between gap-3 text-body-sm">
                <span className="text-text-secondary">Circulating</span>
                <span className="font-semibold text-text">
                  {coin.market_data.circulating_supply.toLocaleString("en-US")}{" "}
                  {coin.symbol.toUpperCase()}
                </span>
              </div>

              <div className="mt-4 flex items-baseline justify-between gap-3 border-t border-border-subtle pt-4 text-body-sm">
                <span className="text-text-secondary">Max Supply</span>
                <span className="font-semibold text-text">
                  {coin.market_data.max_supply
                    ? `${coin.market_data.max_supply.toLocaleString("en-US")} ${coin.symbol.toUpperCase()}`
                    : "Unlimited"}
                </span>
              </div>

              {coin.market_data.max_supply && (
                <div className="mt-6">
                  <div className="h-2 overflow-hidden rounded-full bg-bg-subtle">
                    <div
                      className="h-full rounded-full bg-brand"
                      style={{
                        width: `${Math.min(100, (coin.market_data.circulating_supply / coin.market_data.max_supply) * 100)}%`,
                      }}
                    />
                  </div>
                  <p className="mt-2 text-caption-1 text-text-muted">
                    {(
                      (coin.market_data.circulating_supply /
                        coin.market_data.max_supply) *
                      100
                    ).toFixed(1)}
                    % of max supply in circulation
                  </p>
                </div>
              )}
            </section>

            {/* Wykres cenowy - dodalismy Suspense, zeby wczytywal sie dopiero po załadowaniu komponentu */}
            <section className="mt-6 rounded-[18px] border border-border bg-surface p-8 shadow-sm">
              <h2 className="font-display text-h6 font-semibold">
                Price Chart (7d)
              </h2>
              <div className="mt-6 h-64">
                <Suspense
                  fallback={
                    <div
                      role="status"
                      aria-label="Loading"
                      className="flex h-full items-center justify-center"
                    >
                      <ClipLoader color="var(--brand)" size={48} />
                    </div>
                  }
                >
                  <CoinChart coinId={coin.id} />
                </Suspense>
              </div>
            </section>
          </>
        )}
      </main>
    </div>
  );
};

export default CoinDetailsPage;
