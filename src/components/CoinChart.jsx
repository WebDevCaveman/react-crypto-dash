import { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  LinearScale,
  TimeScale,
  Tooltip,
  Filler,
} from "chart.js";
import "chartjs-adapter-date-fns";
import { ClipLoader } from "react-spinners";

// Chart.js v4 nie rejestruje niczego domyślnie — bez tego wykres się nie narysuje.
ChartJS.register(
  LineElement,
  PointElement,
  LinearScale,
  TimeScale,
  Tooltip,
  Filler,
);

const API_URL = import.meta.env.VITE_COINGECKO_API_URL;

// Canvas nie rozumie var(--token) — token trzeba odczytać do realnej wartości.
const token = (name) =>
  getComputedStyle(document.documentElement).getPropertyValue(name).trim();

const CoinChart = ({ coinId }) => {
  const [prices, setPrices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchChart = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(
          `${API_URL}/coins/${coinId}/market_chart?vs_currency=usd&days=7`,
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setPrices(data.prices);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchChart();
  }, [coinId]);

  if (loading) {
    return (
      <div
        role="status"
        aria-label="Loading"
        className="flex h-full items-center justify-center"
      >
        <ClipLoader color="var(--brand)" size={48} />
      </div>
    );
  }

  if (error) {
    return (
      <p className="flex h-full items-center justify-center text-body font-semibold text-danger">
        {error}
      </p>
    );
  }

  const data = {
    datasets: [
      {
        label: "Price",
        data: prices.map(([time, price]) => ({ x: time, y: price })),
        borderColor: token("--brand"),
        backgroundColor: `rgba(${token("--brand-rgb")}, 0.12)`,
        borderWidth: 2,
        pointRadius: 0,
        pointHoverRadius: 4,
        tension: 0.3,
        fill: true,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    interaction: { mode: "index", intersect: false },
    plugins: {
      tooltip: {
        backgroundColor: token("--surface-raised"),
        titleColor: token("--text-secondary"),
        bodyColor: token("--text"),
        borderColor: token("--border"),
        borderWidth: 1,
        padding: 12,
        displayColors: false,
        callbacks: {
          label: (ctx) =>
            `$${ctx.parsed.y.toLocaleString("en-US", {
              maximumFractionDigits: 2,
            })}`,
        },
      },
    },
    scales: {
      x: {
        type: "time",
        time: { unit: "day" },
        grid: { display: false },
        border: { color: token("--border-subtle") },
        ticks: { color: token("--text-muted"), font: { size: 12 } },
      },
      y: {
        grid: { color: token("--border-subtle") },
        border: { display: false },
        ticks: {
          color: token("--text-muted"),
          font: { size: 12 },
          callback: (value) => `$${value.toLocaleString("en-US")}`,
        },
      },
    },
  };

  return <Line data={data} options={options} />;
};

export default CoinChart;
