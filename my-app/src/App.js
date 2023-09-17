import "./index";
import Login from "./Components/Login";
import { Routes, Route } from "react-router-dom";
import Home from "./Components/Home";
import About from "./Components/About";

export default function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </>
  );
}
