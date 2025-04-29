import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import SortingControls from "./SortingControls";
import ArrayBar from "./ArrayBar";
import { generateRandomArray } from "../../utils/arrayHelpers";
import { bubbleSort } from "../../algorithms/sorting/bubbleSort";

function SortingVisualizer() {
  const [array, setArray] = useState([]);
  const [arraySize, setArraySize] = useState(20);
  const [animationSpeed, setAnimationSpeed] = useState(50);
  const [isSorting, setIsSorting] = useState(false);
  const [algorithm, setAlgorithm] = useState("bubbleSort");
  const [comparingIndices, setComparingIndices] = useState([]);
  const [swappingIndices, setSwappingIndices] = useState([]);
  const [sortedIndices, setSortedIndices] = useState([]);

  // Use refs to store animation timers
  const animationTimersRef = useRef([]);

  // Initialize array when component mounts or array size changes
  useEffect(() => {
    resetArray();

    // Clear any existing animation timers when component unmounts
    return () => {
      animationTimersRef.current.forEach((timer) => clearTimeout(timer));
    };
  }, [arraySize]);

  const resetArray = () => {
    // Cancel any ongoing animations
    if (isSorting) {
      animationTimersRef.current.forEach((timer) => clearTimeout(timer));
      animationTimersRef.current = [];
      setIsSorting(false);
    }

    const newArray = generateRandomArray(arraySize, 5, 100);
    setArray(newArray);
    setComparingIndices([]);
    setSwappingIndices([]);
    setSortedIndices([]);
  };

  const startSorting = () => {
    if (isSorting) return;

    // Clear any existing animation timers
    animationTimersRef.current.forEach((timer) => clearTimeout(timer));
    animationTimersRef.current = [];

    setIsSorting(true);

    // Reset visual states
    setComparingIndices([]);
    setSwappingIndices([]);
    setSortedIndices([]);

    // Get animation steps from selected algorithm
    const animations = [];

    if (algorithm === "bubbleSort") {
      bubbleSort([...array], animations);
    }
    // Add other algorithms here

    // Calculate the delay based on animation speed
    // Convert speed (1-100) to a delay (1000ms to 10ms)
    const delay = Math.max(10, 1010 - animationSpeed * 10);

    // Play animations
    for (let i = 0; i < animations.length; i++) {
      const { type, indices, newArray } = animations[i];

      const timer = setTimeout(() => {
        if (type === "compare") {
          setComparingIndices(indices);
          setSwappingIndices([]);
        } else if (type === "swap") {
          setComparingIndices([]);
          setSwappingIndices(indices);
          setArray(newArray);
        } else if (type === "sorted") {
          setComparingIndices([]);
          setSwappingIndices([]);
          setSortedIndices((prev) => [...prev, ...indices]);
        }

        // When all animations are done
        if (i === animations.length - 1) {
          setTimeout(() => {
            // Mark all as sorted when done
            setSortedIndices([...Array(array.length).keys()]);
            setIsSorting(false);
          }, delay);
        }
      }, i * delay);

      animationTimersRef.current.push(timer);
    }
  };

  return (
    <div className="p-4">
      <SortingControls
        resetArray={resetArray}
        startSorting={startSorting}
        arraySize={arraySize}
        setArraySize={setArraySize}
        animationSpeed={animationSpeed}
        setAnimationSpeed={setAnimationSpeed}
        algorithm={algorithm}
        setAlgorithm={setAlgorithm}
        isSorting={isSorting}
      />

      <div className="flex justify-center items-end h-64 mt-8 bg-gray-100 p-4 rounded-lg">
        {array.map((value, idx) => (
          <ArrayBar
            key={idx}
            value={value}
            index={idx}
            isComparing={comparingIndices.includes(idx)}
            isSwapping={swappingIndices.includes(idx)}
            isSorted={sortedIndices.includes(idx)}
            totalBars={array.length}
          />
        ))}
      </div>
    </div>
  );
}

export default SortingVisualizer;
