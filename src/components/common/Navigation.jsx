import React from "react";
import { motion } from "framer-motion";

function Navigation({ activeVisualizer, setActiveVisualizer }) {
  return (
    <nav className="flex justify-center p-4 bg-gray-100">
      <div className="flex space-x-4">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className={`px-4 py-2 rounded-md ${
            activeVisualizer === "sorting"
              ? "bg-blue-500 text-white"
              : "bg-gray-200 text-gray-800"
          }`}
          onClick={() => setActiveVisualizer("sorting")}
        >
          Sorting Visualizer
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className={`px-4 py-2 rounded-md ${
            activeVisualizer === "pathfinding"
              ? "bg-purple-500 text-white"
              : "bg-gray-200 text-gray-800"
          }`}
          onClick={() => setActiveVisualizer("pathfinding")}
        >
          Pathfinding Visualizer
        </motion.button>
      </div>
    </nav>
  );
}

export default Navigation;
