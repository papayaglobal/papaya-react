import React, { useState, useEffect } from "react";
import FilterSelectBox from "../FilterSelectBox";

export default function FilterSelectBoxLazyLoad({ filters, onSave }) {
  const [filterState, setFilterState] = useState(filters);
  const [loadingState, setLoadingState] = useState(false);

  const changeFilters = () => {
    setLoadingState(true);
    setTimeout(() => {
      setFilterState(prev => {
        return [
          ...prev,
          { output: "Blue Bird", data: ["Blue Bird Data"] },
          { output: "CyberArk", data: ["CyberArk Data"], isSelected: true },
          { output: "Dropbox", data: ["Dropbox Data"] }
        ];
      });
      setLoadingState(false);
    }, 2000);
  };

  return (
    <div>
      <FilterSelectBox
        filters={filterState}
        onSave={onSave}
        onLazy={changeFilters}
        loading={loadingState}
        hasMore={true}
        saveLabel="Save"
        clearLabel="Clear Selection"
      />
      <button onClick={changeFilters}>Add filters</button>
    </div>
  );
}
