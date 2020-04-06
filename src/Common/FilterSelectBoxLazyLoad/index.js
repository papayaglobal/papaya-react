import React, { useState, useEffect } from "react";
import { filter, includes, toLower, times, random } from "lodash";
import FilterSelectBox from "../FilterSelectBox";

const faker = require("faker");

const fakeList = times(20, () => {
    return {
        output: faker.company.companyName(),
        data: faker.company.catchPhrase()
    };
});

const pageSize = 5;

const lazyLoad = (value, prevList, prevSearchTerm) => {
    const filters = value ? filter(fakeList, (item) => RegExp(value, "gi").test(item.output)) : fakeList;
    if (prevSearchTerm !== value) {
        return { filters: filters.slice(0, pageSize), hasMore: filters.slice(0, pageSize).length < filters.length };
    }
    const newFilters = [...prevList, ...filters.slice(prevList.length, prevList.length + pageSize)];

    return { filters: newFilters, hasMore: newFilters.length < filters.length };
};

export default function FilterSelectBoxLazyLoad({ onSave }) {
    const [filtersState, setFiltersState] = useState(fakeList.slice(0, pageSize));
    const [loadingState, setLoadingState] = useState(false);
    const [hasMore, setHasMore] = useState(true);
    const [searchTerm, setSearchtem] = useState("");

    const changeFilters = (value) => {
        setLoadingState(true);
        setTimeout(() => {
            setFiltersState((prev) => {
                const { filters, hasMore } = lazyLoad(value, prev, searchTerm);
                setHasMore(hasMore);
                return filters;
            });
            setLoadingState(false);
            setSearchtem(value);
        }, 2000);
    };

    return (
        <div>
            <FilterSelectBox
                filters={filtersState}
                onSave={onSave}
                onLazy={changeFilters}
                loading={loadingState}
                hasMore={hasMore}
                saveLabel="Save"
                clearLabel="Clear Selection"
            />
        </div>
    );
}
