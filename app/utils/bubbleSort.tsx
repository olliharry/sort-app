import { sleep } from "./sleep";

export async function bubbleSort(
  arr: number[],
  setHeightArray: React.Dispatch<React.SetStateAction<number[]>>,
  setComparingIndices: React.Dispatch<React.SetStateAction<number[]>>
): Promise<number[] | -1> {
  const len = arr.length;
  let swapped: boolean;

  do {
    swapped = false;
    for (let i = 0; i < len - 1; i++) {
      if (arr[i] > arr[i + 1]) {
        // Swap elements
        setComparingIndices([i, i + 1]);
        [arr[i], arr[i + 1]] = [arr[i + 1], arr[i]];
        swapped = true;
        await sleep(1);
        setHeightArray([...arr]);
      }
    }
  } while (swapped);
  setComparingIndices([]);
  return arr;
}

export default bubbleSort;
