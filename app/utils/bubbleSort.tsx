const bubbleSort = (arr: number[]): number[] => {
    const len = arr.length;
    let swapped: boolean;
    
    do {
        swapped = false;
        for (let i = 0; i < len - 1; i++) {
            if (arr[i] > arr[i + 1]) {
                // Swap elements
                [arr[i], arr[i + 1]] = [arr[i + 1], arr[i]];
                swapped = true;
                
            }
        }
    } while (swapped);

    return arr;
};

export default bubbleSort;