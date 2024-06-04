"use client";
import React from "react";
import SortingVisualiser from "./sortingVisualiser";
import SearchVisualiser from "./searchVisualiser";
import { ReactDOM } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

const Page: React.FC = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <SortingVisualiser />,
      errorElement: <div>404 Not Found</div>,
    },
    {
      path: "/SearchVisualiser",
      element: <SearchVisualiser />,
      errorElement: <div>404 Not Found</div>,
    },
  ]);

  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
};

export default Page;
