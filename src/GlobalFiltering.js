import React from "react";

export const GlobalFiltering = ({ filter, setFilter }) => {
  return (
    <span className="d-flex justify-content-center mb-2 fw-bold">
      Search: <input value={filter || ""} onChange={(e) => setFilter(e.target.value)} className="ms-2" />
    </span>
  );
};
