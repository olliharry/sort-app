"use client";
import Image from "next/image";
import Column from "./components/column";
import { useEffect, useState } from "react";
import bubbleSort from "./utils/bubbleSort";

export default function Home() {  
  const initialArray = Array.from(
    { length: 10 },
    () => Math.floor(Math.random() * (600 - 50 + 1)) + 50
  );
  const [heightArray, setHeightArray] = useState(initialArray);
  
  function sort() {
    const v = bubbleSort(heightArray);
    console.log(v);
    setHeightArray([...v]);
  }

  return (
    <main className="container">
      <div className="columnContainer">
        {heightArray.map((height, index) => (
          <Column key={index} height={height} />
        ))}
      </div>
      <button onClick={() => sort()}>awd</button>
    </main>
  );
}
