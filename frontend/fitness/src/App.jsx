import "./App.css";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Exercise from "./pages/Exercise";
import Food from "./pages/Food";
import Goals from "./pages/Goals";
import Navbar from "./components/Navbar";

function App() {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/exercise" element={<Exercise />} />
        <Route path="/food" element={<Food />} />
        <Route path="/goals" element={<Goals />} />
      </Routes>
    </div>
  );
}

export default App;
