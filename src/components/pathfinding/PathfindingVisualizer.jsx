import React, { useState, useEffect, useRef } from "react";
import GridNode from "./GridNode";
import PathfindingControls from "./PathfindingControls";
import { createGrid, getNewGridWithWall } from "../../utils/gridHelpers";
import { bfs } from "../../algorithms/pathfindings/bfs";

function PathfindingVisualizer() {
  const [grid, setGrid] = useState([]);
  const [mouseIsPressed, setMouseIsPressed] = useState(false);
  const [startNodePos, setStartNodePos] = useState({ row: 10, col: 5 });
  const [finishNodePos, setFinishNodePos] = useState({ row: 10, col: 45 });
  const [currentAlgorithm, setCurrentAlgorithm] = useState("bfs");
  const [isVisualizing, setIsVisualizing] = useState(false);
  const [isPathFound, setIsPathFound] = useState(false);
  const [animationSpeed, setAnimationSpeed] = useState(50);

  // Use refs to store animation timers
  const animationTimersRef = useRef([]);

  const numRows = 25;
  const numCols = 50;

  // Initialize grid when component mounts
  useEffect(() => {
    const initialGrid = createGrid(
      numRows,
      numCols,
      startNodePos,
      finishNodePos
    );
    setGrid(initialGrid);

    // Clear any existing animation timers when component unmounts
    return () => {
      animationTimersRef.current.forEach((timer) => clearTimeout(timer));
    };
  }, []);

  const handleMouseDown = (row, col) => {
    // Don't allow changes during visualization
    if (isVisualizing) return;

    // Check if this is the start or finish node
    if (row === startNodePos.row && col === startNodePos.col) {
      // Handle start node drag logic here
      return;
    }
    if (row === finishNodePos.row && col === finishNodePos.col) {
      // Handle finish node drag logic here
      return;
    }

    // Toggle wall
    const newGrid = getNewGridWithWall(grid, row, col);
    setGrid(newGrid);
    setMouseIsPressed(true);
  };

  const handleMouseEnter = (row, col) => {
    if (!mouseIsPressed || isVisualizing) return;

    // Create wall by dragging
    const newGrid = getNewGridWithWall(grid, row, col);
    setGrid(newGrid);
  };

  const handleMouseUp = () => {
    setMouseIsPressed(false);
  };

  const visualizeAlgorithm = () => {
    if (isVisualizing) return;

    // Clear any existing animation timers
    animationTimersRef.current.forEach((timer) => clearTimeout(timer));
    animationTimersRef.current = [];

    // Reset any previous visualization
    resetGridWithoutWalls();
    setIsVisualizing(true);
    setIsPathFound(false);

    const startNode = grid[startNodePos.row][startNodePos.col];
    const finishNode = grid[finishNodePos.row][finishNodePos.col];

    let visitedNodesInOrder = [];

    // Run the selected algorithm
    if (currentAlgorithm === "bfs") {
      visitedNodesInOrder = bfs(grid, startNode, finishNode);
    }
    // Add other algorithms here

    const nodesInShortestPathOrder = getNodesInShortestPathOrder(finishNode);

    // Animate the algorithm
    animateAlgorithm(visitedNodesInOrder, nodesInShortestPathOrder);
  };

  const animateAlgorithm = (visitedNodesInOrder, nodesInShortestPathOrder) => {
    // Calculate the delay based on animation speed
    // Convert speed (1-100) to a delay (1000ms to 10ms)
    const delay = Math.max(5, 505 - animationSpeed * 10);

    // Animate visited nodes
    for (let i = 0; i < visitedNodesInOrder.length; i++) {
      const timer = setTimeout(() => {
        const node = visitedNodesInOrder[i];

        setGrid((prevGrid) => {
          const newGrid = prevGrid.map((row) => [...row]);
          const nodeToUpdate = newGrid[node.row][node.col];
          newGrid[node.row][node.col] = {
            ...nodeToUpdate,
            isVisited: true,
          };
          return newGrid;
        });

        // When all nodes are visited, animate the shortest path
        if (i === visitedNodesInOrder.length - 1) {
          const pathFound =
            visitedNodesInOrder[visitedNodesInOrder.length - 1].row ===
              finishNodePos.row &&
            visitedNodesInOrder[visitedNodesInOrder.length - 1].col ===
              finishNodePos.col;
          setIsPathFound(pathFound);

          if (pathFound) {
            setTimeout(() => {
              animateShortestPath(nodesInShortestPathOrder, delay);
            }, delay);
          } else {
            setTimeout(() => {
              setIsVisualizing(false);
            }, delay);
          }
        }
      }, i * delay);

      animationTimersRef.current.push(timer);
    }

    // If there are no nodes to visit, end visualization
    if (visitedNodesInOrder.length === 0) {
      setIsVisualizing(false);
    }
  };

  const animateShortestPath = (nodesInShortestPathOrder, delay) => {
    for (let i = 0; i < nodesInShortestPathOrder.length; i++) {
      const timer = setTimeout(() => {
        const node = nodesInShortestPathOrder[i];

        setGrid((prevGrid) => {
          const newGrid = prevGrid.map((row) => [...row]);
          const nodeToUpdate = newGrid[node.row][node.col];
          newGrid[node.row][node.col] = {
            ...nodeToUpdate,
            isInPath: true,
          };
          return newGrid;
        });

        // When path animation is complete
        if (i === nodesInShortestPathOrder.length - 1) {
          setTimeout(() => {
            setIsVisualizing(false);
          }, delay);
        }
      }, i * delay);

      animationTimersRef.current.push(timer);
    }
  };

  const getNodesInShortestPathOrder = (finishNode) => {
    const nodesInShortestPathOrder = [];
    let currentNode = finishNode;

    // Check if there is a path to the finish node
    if (
      !currentNode.previousNode &&
      currentNode.row !== startNodePos.row &&
      currentNode.col !== startNodePos.col
    ) {
      return [];
    }

    while (currentNode !== null) {
      nodesInShortestPathOrder.unshift(currentNode);
      currentNode = currentNode.previousNode;
    }

    return nodesInShortestPathOrder;
  };

  const resetGrid = () => {
    if (isVisualizing) {
      // Cancel ongoing animations
      animationTimersRef.current.forEach((timer) => clearTimeout(timer));
      animationTimersRef.current = [];
      setIsVisualizing(false);
    }

    const newGrid = createGrid(numRows, numCols, startNodePos, finishNodePos);
    setGrid(newGrid);
    setIsPathFound(false);
  };

  const resetGridWithoutWalls = () => {
    // Reset grid but keep walls
    setGrid((prevGrid) => {
      return prevGrid.map((row) =>
        row.map((node) => ({
          ...node,
          isVisited: false,
          isInPath: false,
          distance: Infinity,
          previousNode: null,
        }))
      );
    });
    setIsPathFound(false);
  };

  return (
    <div className="p-4">
      <PathfindingControls
        visualizeAlgorithm={visualizeAlgorithm}
        resetGrid={resetGrid}
        currentAlgorithm={currentAlgorithm}
        setCurrentAlgorithm={setCurrentAlgorithm}
        isVisualizing={isVisualizing}
        animationSpeed={animationSpeed}
        setAnimationSpeed={setAnimationSpeed}
      />

      <div
        className="grid mt-4 bg-gray-100 p-2 rounded-lg overflow-auto"
        style={{
          display: "grid",
          gridTemplateColumns: `repeat(${numCols}, 20px)`,
          gridTemplateRows: `repeat(${numRows}, 20px)`,
          gap: "1px",
        }}
      >
        {grid.map((row, rowIdx) =>
          row.map((node, nodeIdx) => {
            const { row, col, isStart, isFinish, isWall, isVisited, isInPath } =
              node;
            return (
              <GridNode
                key={`${row}-${col}`}
                row={row}
                col={col}
                isStart={isStart}
                isFinish={isFinish}
                isWall={isWall}
                isVisited={isVisited}
                isInPath={isInPath}
                onMouseDown={() => handleMouseDown(row, col)}
                onMouseEnter={() => handleMouseEnter(row, col)}
                onMouseUp={handleMouseUp}
              />
            );
          })
        )}
      </div>
    </div>
  );
}

export default PathfindingVisualizer;
