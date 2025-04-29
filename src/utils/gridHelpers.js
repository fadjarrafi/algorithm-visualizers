/**
 * Creates a node object with the specified properties
 * 
 * @param {number} row - Row index of the node
 * @param {number} col - Column index of the node
 * @param {Object} startPos - Position of the start node
 * @param {Object} finishPos - Position of the finish node
 * @returns {Object} - The created node
 */
export function createNode(row, col, startPos, finishPos) {
    return {
        row,
        col,
        isStart: row === startPos.row && col === startPos.col,
        isFinish: row === finishPos.row && col === finishPos.col,
        isVisited: false,
        isWall: false,
        isInPath: false,
        distance: Infinity,
        previousNode: null
    };
}

/**
 * Creates a grid of nodes
 * 
 * @param {number} numRows - Number of rows in the grid
 * @param {number} numCols - Number of columns in the grid
 * @param {Object} startPos - Position of the start node
 * @param {Object} finishPos - Position of the finish node
 * @returns {Array} - 2D array representing the grid
 */
export function createGrid(numRows, numCols, startPos, finishPos) {
    const grid = [];
    for (let row = 0; row < numRows; row++) {
        const currentRow = [];
        for (let col = 0; col < numCols; col++) {
            currentRow.push(createNode(row, col, startPos, finishPos));
        }
        grid.push(currentRow);
    }
    return grid;
}

/**
 * Creates a new grid with a wall toggled at the specified position
 * 
 * @param {Array} grid - The current grid
 * @param {number} row - Row index where the wall should be toggled
 * @param {number} col - Column index where the wall should be toggled
 * @returns {Array} - New grid with wall toggled
 */
export function getNewGridWithWall(grid, row, col) {
    // Create a deep copy of the grid
    const newGrid = grid.map(rowArray => rowArray.map(node => ({ ...node })));

    // Get the node at the specified position
    const node = newGrid[row][col];

    // Don't toggle wall if it's start or finish node
    if (node.isStart || node.isFinish) return newGrid;

    // Toggle the wall
    const newNode = {
        ...node,
        isWall: !node.isWall
    };

    newGrid[row][col] = newNode;
    return newGrid;
}

/**
 * Get neighboring nodes of a given node
 * 
 * @param {Object} node - The node to get neighbors for
 * @param {Array} grid - The grid containing the nodes
 * @returns {Array} - List of neighboring nodes
 */
export function getNeighbors(node, grid) {
    const neighbors = [];
    const { row, col } = node;
    const numRows = grid.length;
    const numCols = grid[0].length;

    // Check all four directions
    if (row > 0) neighbors.push(grid[row - 1][col]); // Up
    if (row < numRows - 1) neighbors.push(grid[row + 1][col]); // Down
    if (col > 0) neighbors.push(grid[row][col - 1]); // Left
    if (col < numCols - 1) neighbors.push(grid[row][col + 1]); // Right

    // Filter out walls
    return neighbors.filter(neighbor => !neighbor.isWall);
}
