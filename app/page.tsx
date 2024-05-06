"use client";
import Image from "next/image";
import Column from "./components/column";
import { useEffect, useState } from "react";
import bubbleSort from "./utils/bubbleSort";

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
  useEffect(() => {
    const initialArray = generateInitialArray();
    setHeightArray(initialArray);
  }, []);

  async function sort() {
    await bubbleSort(heightArray, setHeightArray, setComparingIndices);
  }
  function randomize() {
    const t = generateInitialArray();
    setHeightArray([...t]);
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
      <button onClick={() => sort()}>Bubble Sort</button>
      <button onClick={() => randomize()}>Generate Random Array</button>
    </main>
  );
}
