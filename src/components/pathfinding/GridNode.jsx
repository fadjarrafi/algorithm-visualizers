import React from "react";
import { motion } from "framer-motion";

function GridNode({
  row,
  col,
  isStart,
  isFinish,
  isWall,
  isVisited,
  isInPath,
  onMouseDown,
  onMouseEnter,
  onMouseUp,
}) {
  // Determine node type for styling
  const nodeType = isStart
    ? "start"
    : isFinish
    ? "finish"
    : isWall
    ? "wall"
    : isInPath
    ? "path"
    : isVisited
    ? "visited"
    : "";

  // Get appropriate background color based on node type
  const getBackgroundColor = () => {
    if (isStart) return "#22c55e"; // Green
    if (isFinish) return "#ef4444"; // Red
    if (isWall) return "#475569"; // Gray
    if (isInPath) return "#f59e0b"; // Yellow/Orange
    if (isVisited) return "#60a5fa"; // Blue
    return "#ffffff"; // Default white
  };

  return (
    <motion.div
      className="grid-node"
      initial={{ scale: 1 }}
      animate={{
        backgroundColor: getBackgroundColor(),
        scale: isVisited ? [1, 1.2, 1] : 1,
      }}
      transition={{
        duration: 0.3,
        type: "tween",
        stiffness: 300,
        damping: 20,
      }}
      style={{
        width: "20px",
        height: "20px",
        border: "1px solid #e5e7eb",
        borderRadius: "3px",
      }}
      onMouseDown={onMouseDown}
      onMouseEnter={onMouseEnter}
      onMouseUp={onMouseUp}
    >
      {isStart && (
        <div className="flex items-center justify-center h-full text-xs">S</div>
      )}
      {isFinish && (
        <div className="flex items-center justify-center h-full text-xs">F</div>
      )}
    </motion.div>
  );
}

export default GridNode;
