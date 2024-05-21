import { sleep } from "./sleep";

async function merge(sleepDurationRef: React.MutableRefObject<number>,setComparingIndices: React.Dispatch<React.SetStateAction<number[]>>,left: number[], right: number[],startIndex: number, currentArray: number[], setHeightArray: React.Dispatch<React.SetStateAction<number[]>>,): Promise<number[]> {
  const result = [];
  let leftIndex = 0;
  let rightIndex = 0;

  while (leftIndex < left.length && rightIndex < right.length) {
    setComparingIndices([startIndex + leftIndex, startIndex + left.length + rightIndex]);
    if (left[leftIndex] < right[rightIndex]) {
      result.push(left[leftIndex]);
      leftIndex++;
    } else {
      result.push(right[rightIndex]);
      rightIndex++;
    }
    const newArray = [...currentArray];
    newArray.splice(startIndex, result.length, ...result);
    setHeightArray(newArray);
    await sleep(sleepDurationRef.current);
  }
  setComparingIndices([]);
  const finalResult = result.concat(left.slice(leftIndex)).concat(right.slice(rightIndex));

  currentArray.splice(startIndex, finalResult.length, ...finalResult);

  return finalResult;
 
}

export async function mergeSort(
  sleepDurationRef: React.MutableRefObject<number>,
  arr: number[],
  setHeightArray: React.Dispatch<React.SetStateAction<number[]>>,
  setComparingIndices: React.Dispatch<React.SetStateAction<number[]>>,
  currentArray: number[],
  startIndex: number,
): Promise<number[]> {
  if (arr.length <= 1) {
    return arr;
  }


  const middle = Math.floor(arr.length / 2);
  const left = arr.slice(0, middle);
  const right = arr.slice(middle);

  const sortedLeft = await mergeSort(
    sleepDurationRef,
    left,
    setHeightArray,
    setComparingIndices,
    currentArray, 
    startIndex
  );
  const sortedRight = await mergeSort(
    sleepDurationRef,
    right,
    setHeightArray,
    setComparingIndices,
    currentArray, 
    startIndex+middle,
  );

  const d = await merge(sleepDurationRef, setComparingIndices, sortedLeft, sortedRight, startIndex, currentArray, setHeightArray);
  
  setHeightArray([...d]);
  return d;
}
