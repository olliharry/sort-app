import { sleep } from "./sleep";

async function partition(
  setPivotIndex: React.Dispatch<React.SetStateAction<number | undefined>>,
  arr: number[],
  low: number,
  high: number,
  setHeightArray: React.Dispatch<React.SetStateAction<number[]>>,
  setComparingIndices: React.Dispatch<React.SetStateAction<number[]>>,
  sleepDurationRef: React.MutableRefObject<number>
): Promise<number> {
  const pivot = arr[high];
  let i = low - 1;
  setPivotIndex(high);

  for (let j = low; j < high; j++) {
    setComparingIndices([j, high]);
    if (arr[j] < pivot) {
      i++;
      [arr[i], arr[j]] = [arr[j], arr[i]];
      setHeightArray([...arr]);
      await sleep(sleepDurationRef.current);
    }
  }
  [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];
  setHeightArray([...arr]);
  await sleep(sleepDurationRef.current * 5);
  setComparingIndices([]);
  setPivotIndex(undefined);
  return i + 1;
}

export async function quickSort(
  setPivotIndex: React.Dispatch<React.SetStateAction<number | undefined>>,
  arr: number[],
  low: number,
  high: number,
  setHeightArray: React.Dispatch<React.SetStateAction<number[]>>,
  setComparingIndices: React.Dispatch<React.SetStateAction<number[]>>,
  sleepDurationRef: React.MutableRefObject<number>
): Promise<void> {
  if (low < high) {
    const pi = await partition(
      setPivotIndex,
      arr,
      low,
      high,
      setHeightArray,
      setComparingIndices,
      sleepDurationRef
    );
    await quickSort(
      setPivotIndex,
      arr,
      low,
      pi - 1,
      setHeightArray,
      setComparingIndices,
      sleepDurationRef
    );
    await quickSort(
      setPivotIndex,
      arr,
      pi + 1,
      high,
      setHeightArray,
      setComparingIndices,
      sleepDurationRef
    );
  }
}
