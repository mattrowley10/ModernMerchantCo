import "./App.css";
import { getToken } from "./API/script";
import { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Login from "./Login";
import Home from "./Home";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/home" element={<Home />} />
    </Routes>
  );
}

export default App;
