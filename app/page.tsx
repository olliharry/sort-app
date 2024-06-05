"use client";
import React, { useEffect, useState } from "react";
/*import SortingVisualiser from "./sortingVisualiser";
import SearchVisualiser from "./searchVisualiser";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

const Page: React.FC = () => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return null;
  }
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

export default Page;*/

import { HashRouter, Route, Routes } from "react-router-dom";
import SortingVisualiser from "./sortingVisualiser";
import SearchVisualiser from "./searchVisualiser";

const Page: React.FC = () => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return null;
  }

  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<SortingVisualiser />} />
        <Route path="/SearchVisualiser" element={<SearchVisualiser />} />
        <Route path="*" element={<div>404 Not Found</div>} />
      </Routes>
    </HashRouter>
  );
};

export default Page;
