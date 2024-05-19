import { sleep } from "./sleep";

async function merge(left: number[], right: number[]): Promise<number[]> {
  const result = [];
  let leftIndex = 0;
  let rightIndex = 0;

  while (leftIndex < left.length && rightIndex < right.length) {
    if (left[leftIndex] < right[rightIndex]) {
      result.push(left[leftIndex]);
      leftIndex++;
    } else {
      result.push(right[rightIndex]);
      rightIndex++;
    }
  }

  return result.concat(left.slice(leftIndex)).concat(right.slice(rightIndex));
}

export async function mergeSort(
  arr: number[],
  setHeightArray: React.Dispatch<React.SetStateAction<number[]>>,
  setComparingIndices: React.Dispatch<React.SetStateAction<number[]>>,
  sleepDuration: number
): Promise<number[]> {
  if (arr.length <= 1) {
    return arr;
  }

  const middle = Math.floor(arr.length / 2);
  const left = arr.slice(0, middle);
  const right = arr.slice(middle);

  const sortedLeft = await mergeSort(
    left,
    setHeightArray,
    setComparingIndices,
    sleepDuration
  );
  const sortedRight = await mergeSort(
    right,
    setHeightArray,
    setComparingIndices,
    sleepDuration
  );

  const d = await merge(sortedLeft, sortedRight);
  await sleep(sleepDuration);
  setHeightArray([...d]);
  return d;

  //return merge(mergeSort(left, setHeightArray, setComparingIndices, sleepDuration), mergeSort(right, setHeightArray, setComparingIndices, sleepDuration));
}
