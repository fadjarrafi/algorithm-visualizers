import React from "react";
import { motion } from "framer-motion";

function SortingControls({
  resetArray,
  startSorting,
  arraySize,
  setArraySize,
  animationSpeed,
  setAnimationSpeed,
  algorithm,
  setAlgorithm,
  isSorting,
}) {
  return (
    <div className="flex flex-col md:flex-row justify-between items-center p-4 bg-gray-200 rounded-lg">
      <div className="flex flex-col md:flex-row gap-4 mb-4 md:mb-0">
        <div>
          <label
            htmlFor="arraySize"
            className="block text-sm font-medium text-gray-700"
          >
            Array Size: {arraySize}
          </label>
          <input
            type="range"
            id="arraySize"
            min="5"
            max="100"
            value={arraySize}
            onChange={(e) => setArraySize(parseInt(e.target.value))}
            disabled={isSorting}
            className="w-full"
          />
        </div>

        <div>
          <label
            htmlFor="speed"
            className="block text-sm font-medium text-gray-700"
          >
            Speed: {animationSpeed}
          </label>
          <input
            type="range"
            id="speed"
            min="1"
            max="100"
            value={animationSpeed}
            onChange={(e) => setAnimationSpeed(parseInt(e.target.value))}
            disabled={isSorting}
            className="w-full"
          />
        </div>

        <div>
          <label
            htmlFor="algorithm"
            className="block text-sm font-medium text-gray-700"
          >
            Algorithm:
          </label>
          <select
            id="algorithm"
            value={algorithm}
            onChange={(e) => setAlgorithm(e.target.value)}
            disabled={isSorting}
            className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
          >
            <option value="bubbleSort">Bubble Sort</option>
            <option value="quickSort">Quick Sort</option>
            <option value="mergeSort">Merge Sort</option>
            <option value="insertionSort">Insertion Sort</option>
          </select>
        </div>
      </div>

      <div className="flex gap-2">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={resetArray}
          disabled={isSorting}
          className={`px-4 py-2 rounded-md ${
            isSorting
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-blue-500 text-white hover:bg-blue-600"
          }`}
        >
          Generate New Array
        </motion.button>

        <motion.button
          whileHover={!isSorting ? { scale: 1.05 } : {}}
          whileTap={!isSorting ? { scale: 0.95 } : {}}
          onClick={startSorting}
          disabled={isSorting}
          className={`px-4 py-2 rounded-md ${
            isSorting
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-green-500 text-white hover:bg-green-600"
          }`}
        >
          Start Sorting
        </motion.button>
      </div>
    </div>
  );
}

export default SortingControls;
