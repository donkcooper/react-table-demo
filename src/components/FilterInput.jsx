import React from "react";

export const FilterInput = ({ column }) => {
  const { filterValue, setFilter } = column;
  return (
    <div>
      <input
        value={filterValue || ""}
        onChange={(e) => setFilter(e.target.value)}
        placeholder="Search..."
      ></input>
    </div>
  );
};
