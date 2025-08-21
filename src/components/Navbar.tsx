import React, { useState } from "react";
import useUserStore from "../store/userStore";
import { useNavigate } from "react-router-dom";

const Navbar: React.FC = () => {
  const [activePage, setActivePage] = useState<"home" | "trade">("home");
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loginForm, setLoginForm] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleNavClick = (page: "home" | "trade") => {
    if(isLoggedIn && page === "trade" && !useUserStore.getState().user) {
      alert("Please log in to access the Trade page.");
      return;
    }
    setActivePage(page);
    navigate(`/${page}`);
  };

  const handleLoginChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLoginForm({ ...loginForm, [e.target.name]: e.target.value });
  };

  const { user, login, logout } = useUserStore();

  const [error, setError] = useState("");

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!loginForm.email.includes("@") || loginForm.password.length < 4) {
      setError("Invalid email or password (min 4 chars)");
      console.log(error);
      return;
    }
    login(loginForm.email);
    setIsLoggedIn(true);
    setShowLoginModal(false);
  };

  return (
    <>
      <header
        style={{
          position: "sticky",
          top: 0,
          background: "#222",
          color: "#fff",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "0 2rem",
          height: "64px",
          zIndex: 1000,
        }}
      >
        <nav style={{ display: "flex", gap: "1.5rem" }}>
          <button
            style={{
              background: "none",
              border: "none",
              color: activePage === "home" ? "#61dafb" : "#fff",
              fontWeight: activePage === "home" ? "bold" : "normal",
              fontSize: "1rem",
              cursor: "pointer",
            }}
            onClick={() => handleNavClick("home")}
          >
            Home
          </button>

          <button
            style={{
              background: "none",
              border: "none",
              color: activePage === "trade" ? "#61dafb" : "#fff",
              fontWeight: activePage === "trade" ? "bold" : "normal",
              fontSize: "1rem",
              cursor: "pointer",
            }}
            onClick={() => handleNavClick("trade")}
          >
            Trade
          </button>
        </nav>
        <div>
          {isLoggedIn ? (
            <>
              <span style={{ marginRight: "1rem" }}>
                {user?.email}
              </span>
              <button
                style={{
                  background: "#ff4d4f",
                  color: "#fff",
                  border: "none",
                  borderRadius: "4px",
                  padding: "0.5rem 1rem",
                  cursor: "pointer",
                  fontWeight: "bold",
                }}
                onClick={() => {
                  logout();
                  setIsLoggedIn(false);
                }}
              >
                Log Out
              </button>
            </>
          ) : (
            <button
              style={{
                background: "#61dafb",
                color: "#222",
                border: "none",
                borderRadius: "4px",
                padding: "0.5rem 1rem",
                cursor: "pointer",
                fontWeight: "bold",
              }}
              onClick={() => setShowLoginModal(true)}
            >
              Log In
            </button>
          )}
        </div>
      </header>
      {showLoginModal && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            background: "rgba(0,0,0,0.5)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 2000,
          }}
        >
          <form
            onSubmit={handleLoginSubmit}
            style={{
              background: "#fff",
              padding: "2rem",
              borderRadius: "8px",
              minWidth: "300px",
              display: "flex",
              flexDirection: "column",
              gap: "1rem",
            }}
          >
            <h2 style={{ margin: 0, color: "#222" }}>Log In</h2>
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={loginForm.email}
              onChange={handleLoginChange}
              required
              style={{
                padding: "0.5rem",
                borderRadius: "4px",
                border: "1px solid #ccc",
              }}
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={loginForm.password}
              onChange={handleLoginChange}
              required
              style={{
                padding: "0.5rem",
                borderRadius: "4px",
                border: "1px solid #ccc",
              }}
            />
            <div
              style={{
                display: "flex",
                justifyContent: "flex-end",
                gap: "0.5rem",
              }}
            >
              <button
                type="button"
                onClick={() => setShowLoginModal(false)}
                style={{
                  background: "#eee",
                  color: "#222",
                  border: "none",
                  borderRadius: "4px",
                  padding: "0.5rem 1rem",
                  cursor: "pointer",
                }}
              >
                Cancel
              </button>
              <button
                type="submit"
                style={{
                  background: "#61dafb",
                  color: "#222",
                  border: "none",
                  borderRadius: "4px",
                  padding: "0.5rem 1rem",
                  cursor: "pointer",
                  fontWeight: "bold",
                }}
              >
                Log In
              </button>
            </div>
          </form>
        </div>
      )}
      <main style={{ padding: "2rem" }}></main>
    </>
  );
};

export default Navbar;
