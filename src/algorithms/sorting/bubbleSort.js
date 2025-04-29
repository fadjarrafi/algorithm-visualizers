/**
 * Bubble Sort Algorithm Implementation
 * 
 * @param {Array} array - The array to be sorted
 * @param {Array} animations - Array to store animation steps
 * @returns {Array} - The sorted array
 */
export function bubbleSort(array, animations = []) {
    const n = array.length;

    for (let i = 0; i < n - 1; i++) {
        for (let j = 0; j < n - i - 1; j++) {
            // Add comparison animation
            animations.push({
                type: 'compare',
                indices: [j, j + 1],
                newArray: [...array]
            });

            if (array[j] > array[j + 1]) {
                // Swap elements
                [array[j], array[j + 1]] = [array[j + 1], array[j]];

                // Add swap animation
                animations.push({
                    type: 'swap',
                    indices: [j, j + 1],
                    newArray: [...array]
                });
            }
        }

        // Mark the last element in this pass as sorted
        animations.push({
            type: 'sorted',
            indices: [n - i - 1],
            newArray: [...array]
        });
    }

    // Mark the first element as sorted (it's already in place)
    animations.push({
        type: 'sorted',
        indices: [0],
        newArray: [...array]
    });

    return array;
}
