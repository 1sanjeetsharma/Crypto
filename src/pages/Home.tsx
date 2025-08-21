import { useState, useEffect } from "react";
import axios from "axios";
import Button from "../components/Button";
import type { Coin } from "../types/coin";
// import InputField from "../components/InputField";
// import useUserStore from "../store/userStore";

function Home() {
  // const { user, login, logout } = useUserStore();
  // const [email, setEmail] = useState("");
  // const [password, setPassword] = useState("");
  // const [error, setError] = useState("");

  const [coins, setCoins] = useState<Coin[]>([]);
  const [visibleCount, setVisibleCount] = useState(10);
  const [sortKey, setSortKey] = useState<"name" | "price">("name");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");

  // Track open dropdown
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  useEffect(() => {
    axios
      .get("https://api.coingecko.com/api/v3/coins/markets", {
        params: { vs_currency: "usd" },
      })
      .then((res) => setCoins(res.data))
      .catch(() => alert("Error loading coins"));
  }, []);

  // const handleLogin = () => {
  //   if (!email.includes("@") || password.length < 4) {
  //     setError("Invalid email or password (min 4 chars)");
  //     return;
  //   }
  //   login(email);
  // };

  const handleSort = (key: "name" | "price") => {
    if (sortKey === key) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortKey(key);
      setSortOrder("asc");
    }
  };

  const sortedCoins = [...coins].sort((a, b) => {
    if (sortKey === "name") {
      return sortOrder === "asc"
        ? a.name.localeCompare(b.name)
        : b.name.localeCompare(a.name);
    } else {
      return sortOrder === "asc"
        ? a.current_price - b.current_price
        : b.current_price - a.current_price;
    }
  });

  const renderSortSymbol = (key: "name" | "price") => {
    if (sortKey !== key) return "↕";
    return sortOrder === "asc" ? "▲" : "▼";
  };

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">Crypto Assets</h1>

      {/* LOGIN
      {!user ? (
        <div className="border p-4 rounded-lg shadow max-w-sm mb-6">
          <InputField
            label="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <InputField
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {error && <p className="text-red-500 text-sm mb-2">{error}</p>}
          <Button onClick={handleLogin}>Login</Button>
        </div>
      ) : (
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 flex items-center justify-center rounded-full bg-green-500 text-white text-lg font-bold">
            {user.email[0].toUpperCase()}
          </div>
          <span>{user.email}</span>
          <Button onClick={logout}>Logout</Button>
        </div>
      )} */}

      {/* TABLE */}
      <table className="border w-full mb-6">
        <thead>
          <tr className="bg-gray-200 text-left">
            <th className="border px-3 py-2 text-center">Icon</th>
            <th
              className="border px-3 py-2 cursor-pointer select-none text-center"
              onClick={() => handleSort("name")}
            >
              Name {renderSortSymbol("name")}
            </th>
            <th
              className="border px-3 py-2 cursor-pointer select-none text-center"
              onClick={() => handleSort("price")}
            >
              Price (USD) {renderSortSymbol("price")}
            </th>
            <th className="border px-3 py-2 text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          {sortedCoins.slice(0, visibleCount).map((c) => (
            <tr key={c.id} className="text-center relative">
              <td className="border px-3 py-2">
                <img src={c.image} alt={c.name} className="w-6 h-6 mx-auto" />
              </td>
              <td className="border px-3 py-2">{c.name}</td>
              <td className="border px-3 py-2">${c.current_price}</td>
              <td className="border px-3 py-2 relative">
                <button
                  onClick={() =>
                    setOpenDropdown(openDropdown === c.id ? null : c.id)
                  }
                  className="px-3 py-1 bg-gray-100 rounded border"
                >
                  Options
                </button>

                {openDropdown === c.id && (
                  <div
                    className="absolute right-0 mt-2 w-28 bg-white border rounded shadow-lg z-10"
                    tabIndex={0}
                    ref={(el) => {
                      if (el) {
                        const handleClick = (e: MouseEvent) => {
                          if (!el.contains(e.target as Node)) {
                            setOpenDropdown(null);
                          }
                        };
                        document.addEventListener("mousedown", handleClick);
                        return () => {
                          document.removeEventListener(
                            "mousedown",
                            handleClick
                          );
                        };
                      }
                    }}
                  >
                    <button className="block px-4 py-2 w-full hover:bg-gray-200">
                      Buy
                    </button>
                    <button className="block px-4 py-2 w-full hover:bg-gray-200">
                      Sell
                    </button>
                  </div>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* LOAD MORE */}
      {visibleCount < coins.length && (
        <div className="text-center">
          <Button onClick={() => setVisibleCount(visibleCount + 10)}>
            Load More
          </Button>
        </div>
      )}
    </div>
  );
}

export default Home;
