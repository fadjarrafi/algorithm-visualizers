import { useState } from "react";
import "./App.css";
import Header from "./components/common/Header";
import Footer from "./components/common/Footer";
import Navigation from "./components/common/Navigation";
import SortingVisualizer from "./components/sorting/SortingVisualizer";
import PathfindingVisualizer from "./components/pathfinding/PathfindingVisualizer";

function App() {
  const [activeVisualizer, setActiveVisualizer] = useState("sorting");

  return (
    <div className="app-container">
      <Header />
      <Navigation
        activeVisualizer={activeVisualizer}
        setActiveVisualizer={setActiveVisualizer}
      />

      <main className="visualizer-container">
        {activeVisualizer === "sorting" ? (
          <SortingVisualizer />
        ) : (
          <PathfindingVisualizer />
        )}
      </main>

      <Footer />
    </div>
  );
}

export default App;
