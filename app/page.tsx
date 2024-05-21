"use client";
import Image from "next/image";
import Column from "./components/column";
import { useEffect, useState, useRef } from "react";
import bubbleSort from "./utils/bubbleSort";
import { mergeSort } from "./utils/mergeSort";

function generateInitialArray() {
  const initialArray = [];
  for (let i = 0; i < 150; i++) {
    initialArray.push(Math.floor(Math.random() * (600 - 50 + 1)) + 50);
  }
  return initialArray;
}

export default function Home() {
  const [heightArray, setHeightArray] = useState<number[]>([]);
  const [comparingIndices, setComparingIndices] = useState<number[]>([]);
  const [sleepDuration, setSleepDuration] = useState<number>(1);
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
      setComparingIndices,
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

  function reset(){
    window.location.reload();
  }

  return (
    <main className="container">
      <div className="columnContainer">
        {heightArray.map((height, index) => (
          <Column
            key={index}
            height={height}
            className={comparingIndices.includes(index) ? "comparing" : ""}
          />
        ))}
      </div>
      <div className="buttonContainer">
      <button className="button" onClick={() => sort()}>Bubble Sort</button>
      <button className="button" onClick={() => merge()}>Merge Sort</button>
      <button className="button" onClick={() => randomize()}>Generate Random Array</button>
      <button className="button" onClick={() => reset()}>Reset</button>
      <div>
      <label htmlFor="speedRange">Animation Speed:  </label>
      <input
        type="range"
        min="1"
        max="100"
        step="1"
        value={100-sleepDurationRef.current+1}
        onChange={(e) => sleepDurationRef.current = 100 - Number(e.target.value) + 1/*setSleepDuration(100 - Number(e.target.value)+1)*/}
      />
      </div>
      
      </div>
      
    </main>
  );
}
