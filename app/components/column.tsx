import React from "react";

type ColumnProps = {
  height: number;
};

const Column = ({ height }: ColumnProps) => (
  <div className="column" style={{ height: `${height}px`}}></div>
);

export default Column;
