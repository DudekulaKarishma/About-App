import "./index";
import Login from "./Components/Login";
import { Routes, Route, useLocation } from "react-router-dom";
import Home from "./Components/Home";
import About from "./Components/About";
import { AppBar } from "@mui/material";
import Navbar from "./Components/Navbar";

export default function App() {
  const location = useLocation();
  return (
    <>
      {location.pathname !== '/' &&
        <Navbar />}
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/about/:id" element={<About />} />
      </Routes>
    </>
  );
}
