import React from "react";
import { motion } from "framer-motion";

function ArrayBar({
  value,
  index,
  isComparing,
  isSwapping,
  isSorted,
  totalBars,
}) {
  // Calculate width based on total number of bars
  const width = `calc(${100 / totalBars}% - 4px)`;

  // Determine color based on current state
  let backgroundColor = "bg-blue-500";
  if (isComparing) backgroundColor = "bg-yellow-500";
  if (isSwapping) backgroundColor = "bg-red-500";
  if (isSorted) backgroundColor = "bg-green-500";

  return (
    <motion.div
      layout
      initial={{ height: 0 }}
      animate={{
        height: `${value}%`,
        backgroundColor: isComparing
          ? "#FFD700"
          : isSwapping
          ? "#FF4500"
          : isSorted
          ? "#4CAF50"
          : "#3B82F6",
      }}
      transition={{
        duration: 0.3,
        type: "spring",
        stiffness: 300,
        damping: 20,
      }}
      style={{ width }}
      className={`mx-0.5 rounded-t-md ${backgroundColor}`}
    >
      {totalBars <= 20 && (
        <div className="text-white text-xs text-center">{value}</div>
      )}
    </motion.div>
  );
}

export default ArrayBar;
