import { useEffect, useState } from "react";
import HomePage from "./pages/home";
import AboutPage from "./pages/about";
import NotFoundPage from "./pages/not-found";
import CoinDetailsPage from "./pages/coin-details";
import Header from "./components/Header";
import { Route, Routes } from "react-router";

const API_URL = import.meta.env.VITE_COINGECKO_API_URL;

const App = () => {
  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [limit, setLimit] = useState(10);
  const [filter, setFilter] = useState("");
  const [sortBy, setSortBy] = useState("market_cap_desc");

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(
          `${API_URL}/coins/markets?vs_currency=usd&sparkline=false&page=1&order=${sortBy}&per_page=${limit}`,
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setCoins(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [limit]);

  return (
    <>
      <Header />

      <Routes>
        <Route
          path="/"
          element={
            <HomePage
              coins={coins}
              loading={loading}
              error={error}
              limit={limit}
              setLimit={setLimit}
              filter={filter}
              setFilter={setFilter}
              sortBy={sortBy}
              setSortBy={setSortBy}
            />
          }
        />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/coin/:id" element={<CoinDetailsPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </>
  );
};

export default App;
