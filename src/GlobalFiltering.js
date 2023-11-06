import React from "react";

export const GlobalFiltering = ({ filter, setFilter }) => {
  return (
    <span className="d-flex align-items-center justify-content-center fw-bold">
     <div> Search:</div> <input value={filter || ""} onChange={(e) => setFilter(e.target.value)} className="ms-2" />
    </span>
  );
};
