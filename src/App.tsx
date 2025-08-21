import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import Trade from "./pages/Trade";
import useUserStore from "./store/userStore";
import Navbar from "./components/Navbar";

function App() {
  const { user } = useUserStore();
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/trade" element={user && user.email ? <Trade /> : <Navigate to="/" />} />
      </Routes>
    </>
  );
}
export default App;
