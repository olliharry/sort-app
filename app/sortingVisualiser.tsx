"use client";
import Image from "next/image";
import Column from "./components/column";
import { useEffect, useState, useRef } from "react";
import bubbleSort from "./utils/bubbleSort";
import { mergeSort } from "./utils/mergeSort";
import { quickSort } from "./utils/quickSort";
import { Link } from "react-router-dom";

function generateInitialArray() {
  const initialArray = [];
  for (let i = 0; i < 150; i++) {
    initialArray.push(Math.floor(Math.random() * (700 - 50 + 1)) + 50);
  }
  return initialArray;
}

export default function SortingVisualiser() {
  const [heightArray, setHeightArray] = useState<number[]>([]);
  const [comparingIndices, setComparingIndices] = useState<number[]>([]);
  const [pivotIndex, setPivotIndex] = useState<number | undefined>();
  const sleepDurationRef = useRef<number>(100);
  useEffect(() => {
    const initialArray = generateInitialArray();
    setHeightArray(initialArray);
  }, []);

  async function sort() {
    await bubbleSort(
      sleepDurationRef,
      heightArray,
      setHeightArray,
      setComparingIndices
    );
  }
  function randomize() {
    const t = generateInitialArray();
    setHeightArray([...t]);
  }
  async function merge() {
    await mergeSort(
      sleepDurationRef,
      heightArray,
      setHeightArray,
      setComparingIndices,
      heightArray,
      0
    );
  }

  async function quick() {
    await quickSort(
      setPivotIndex,
      heightArray,
      0,
      heightArray.length - 1,
      setHeightArray,
      setComparingIndices,
      sleepDurationRef
    );
  }

  function reset() {
    window.location.reload();
  }

  return (
    <main className="flex flex-col h-screen w-screen bg-gray-700">
      <div className="bar">
        <Link to="/SearchVisualiser">
          <button className="button">Go to Search Visualiser</button>
        </Link>
        <button className="button" onClick={() => sort()}>
          Bubble Sort
        </button>
        <button className="button" onClick={() => merge()}>
          Merge Sort
        </button>
        <button className="button" onClick={() => quick()}>
          Quick Sort
        </button>
        <button className="button" onClick={() => randomize()}>
          Generate Random Array
        </button>
        <button className="button" onClick={() => reset()}>
          Reset
        </button>
        <div>
          <label htmlFor="speedRange" className="textSearch">
            Animation Speed:{" "}
          </label>
          <input
            type="range"
            min="1"
            max="100"
            step="1"
            value={100 - sleepDurationRef.current + 1}
            onChange={(e) =>
              (sleepDurationRef.current = 100 - Number(e.target.value) + 1)
            }
          />
        </div>
      </div>
      {
        <div className="columnContainer">
          {heightArray.map((height, index) => (
            <Column
              key={index}
              height={height}
              className={`${
                comparingIndices.includes(index) ? "comparing" : ""
              } ${index === pivotIndex ? "pivot" : ""}`}
            />
          ))}
        </div>
      }
    </main>
  );
}
