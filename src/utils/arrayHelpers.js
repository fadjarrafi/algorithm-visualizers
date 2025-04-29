/**
 * Generates a random array of integers
 * 
 * @param {number} size - Size of the array
 * @param {number} min - Minimum possible value
 * @param {number} max - Maximum possible value
 * @returns {Array} - Random array of integers
 */
export function generateRandomArray(size, min, max) {
    return Array.from({ length: size }, () =>
        Math.floor(Math.random() * (max - min + 1)) + min
    );
}

/**
 * Creates a shallow copy of an array
 * 
 * @param {Array} array - Array to copy
 * @returns {Array} - Copy of the array
 */
export function copyArray(array) {
    return [...array];
}

/**
 * Swaps two elements in an array
 * 
 * @param {Array} array - The array
 * @param {number} i - First index
 * @param {number} j - Second index
 */
export function swap(array, i, j) {
    const temp = array[i];
    array[i] = array[j];
    array[j] = temp;
}
