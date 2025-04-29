import React from "react";
import { motion } from "framer-motion";

function PathfindingControls({
  visualizeAlgorithm,
  resetGrid,
  currentAlgorithm,
  setCurrentAlgorithm,
  isVisualizing,
  animationSpeed,
  setAnimationSpeed,
}) {
  return (
    <div className="flex flex-col md:flex-row justify-between items-center p-4 bg-gray-200 rounded-lg">
      <div className="flex flex-col md:flex-row gap-4 mb-4 md:mb-0">
        <div>
          <label
            htmlFor="algorithm"
            className="block text-sm font-medium text-gray-700"
          >
            Algorithm:
          </label>
          <select
            id="algorithm"
            value={currentAlgorithm}
            onChange={(e) => setCurrentAlgorithm(e.target.value)}
            disabled={isVisualizing}
            className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm rounded-md"
          >
            <option value="bfs">Breadth-First Search</option>
            <option value="dijkstra">Dijkstra's Algorithm</option>
            <option value="aStar">A* Search</option>
          </select>
        </div>

        <div>
          <label
            htmlFor="pathSpeed"
            className="block text-sm font-medium text-gray-700"
          >
            Animation Speed: {animationSpeed}
          </label>
          <input
            type="range"
            id="pathSpeed"
            min="1"
            max="100"
            value={animationSpeed}
            onChange={(e) => setAnimationSpeed(parseInt(e.target.value))}
            disabled={isVisualizing}
            className="w-full"
          />
        </div>
      </div>

      <div className="flex gap-2">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={resetGrid}
          disabled={isVisualizing}
          className={`px-4 py-2 rounded-md ${
            isVisualizing
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-blue-500 text-white hover:bg-blue-600"
          }`}
        >
          Clear Grid
        </motion.button>

        <motion.button
          whileHover={!isVisualizing ? { scale: 1.05 } : {}}
          whileTap={!isVisualizing ? { scale: 0.95 } : {}}
          onClick={visualizeAlgorithm}
          disabled={isVisualizing}
          className={`px-4 py-2 rounded-md ${
            isVisualizing
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-purple-500 text-white hover:bg-purple-600"
          }`}
        >
          {isVisualizing ? "Visualizing..." : "Visualize!"}
        </motion.button>
      </div>
    </div>
  );
}

export default PathfindingControls;
