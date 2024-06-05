"use client";
import Grid from "./components/grid";
import React, { useState, useEffect } from "react";
import { bfs } from "./utils/bfs";
import { dfs } from "./utils/dfs";
import { gridInterface } from "./interfaces/gridInterface";
import { Link } from "react-router-dom";

export default function SearchVisualiser() {
  const handleCellClick = (row: number, col: number) => {
    var newWalls = gridProps.walls;
    if (gridProps.walls.some((wall) => wall.row === row && wall.col === col)) {
      newWalls.splice(newWalls.indexOf({ row, col }), 1);
    } else {
      newWalls.push({ row, col });
    }
    setGridProps((prevGridProps) => ({
      ...prevGridProps,
      walls: newWalls,
    }));
  };

  const [isSearchRunning, setIsSearchRunning] = useState(false);

  const initialGridProps: gridInterface = {
    rows: 20,
    cols: 20,
    start: { row: 0, col: 10 },
    end: { row: 19, col: 10 },
    walls: [],
    path: [],
    visited: [],
    onCellClick: handleCellClick,
  };

  const [gridProps, setGridProps] = useState<gridInterface>(initialGridProps);

  function resetClicked() {
    window.location.reload();
  }

  async function bfsClicked() {
    setIsSearchRunning(true);
    await bfs(gridProps, setGridProps);
    setIsSearchRunning(false);
  }
  async function dfsClicked() {
    setIsSearchRunning(true);
    await dfs(gridProps, setGridProps);
    setIsSearchRunning(false);
  }

  return (
    <div className="containerSearch">
      <div className="bar">
        <Link to="/">
          <button className="button">Go to Sorting Visualiser</button>
        </Link>
        <button
          onClick={() => bfsClicked()}
          disabled={isSearchRunning}
          className="button"
        >
          Breadth First search
        </button>
        <button
          onClick={() => dfsClicked()}
          disabled={isSearchRunning}
          className="button"
        >
          Depth First search
        </button>
        <button
          onClick={() => resetClicked()}
          disabled={isSearchRunning}
          className="button"
        >
          Reset
        </button>
      </div>
      <Grid {...gridProps} />
      <p className="textSearch">Click on the cells to add walls!</p>
    </div>
  );
}
