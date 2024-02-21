import "./App.css";
import { getToken } from "./API/script";
import { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Login from "./Login";

function App() {
  useEffect(() => {
    getToken();
  });
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/home" element={<Home />} />
    </Routes>
  );
}

export default App;
