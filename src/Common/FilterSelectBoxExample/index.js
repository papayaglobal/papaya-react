import React, { useState, useEffect } from "react";
import FilterSelectBox from "../FilterSelectBox";

export default function FilterSelectBoxExample({ filters, onSave }) {
  const [filterState, setFilterState] = useState(filters);

  const changeFilters = () => {
    setFilterState([
      { output: "momo", data: ["Blue Bird Data"] },
      { output: "popo", data: ["CyberArk Data"] },
      { output: "dodo", data: ["Dropbox Data"] }
    ]);
  };

  return (
    <div>
      <FilterSelectBox filters={filterState} onSave={onSave} />
      <button onClick={changeFilters}>Change FIlters</button>
    </div>
  );
}
