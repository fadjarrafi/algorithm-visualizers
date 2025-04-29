import { getNeighbors } from '../../utils/gridHelpers';

/**
 * Breadth-First Search Algorithm for pathfinding
 * 
 * @param {Array} grid - The grid of nodes
 * @param {Object} startNode - Starting node
 * @param {Object} finishNode - Target node
 * @returns {Array} - Order of nodes visited
 */
export function bfs(grid, startNode, finishNode) {
    // Create a new grid with clean visit states
    const newGrid = grid.map(row =>
        row.map(node => ({
            ...node,
            isVisited: false,
            distance: Infinity,
            previousNode: null
        }))
    );

    // Get references to start and finish nodes in new grid
    const start = newGrid[startNode.row][startNode.col];
    const finish = newGrid[finishNode.row][finishNode.col];

    const visitedNodesInOrder = [];
    const queue = [];

    // Mark start node as visited and add to queue
    start.distance = 0;
    start.previousNode = null;
    queue.push(start);

    // BFS main loop
    while (queue.length > 0) {
        // Get the next node from the queue
        const currentNode = queue.shift();

        // Skip if already visited
        if (currentNode.isVisited) continue;

        // Mark as visited
        currentNode.isVisited = true;
        visitedNodesInOrder.push(currentNode);

        // Check if we reached the target
        if (currentNode.row === finish.row && currentNode.col === finish.col) {
            return visitedNodesInOrder;
        }

        // Get unvisited neighbors
        const neighbors = getNeighbors(currentNode, newGrid).filter(
            neighbor => !neighbor.isVisited
        );

        // Process each neighbor
        for (const neighbor of neighbors) {
            neighbor.distance = currentNode.distance + 1;
            neighbor.previousNode = currentNode;
            queue.push(neighbor);
        }
    }

    // Path not found
    return visitedNodesInOrder;
}