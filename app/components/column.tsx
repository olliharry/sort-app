import React from "react";

type ColumnProps = {
  height: number;
  className?: string;
};

const Column = ({ height, className }: ColumnProps) => (
  <div
    className={`column ${className}`}
    style={{ height: `${height}px` }}
  ></div>
);

export default Column;
