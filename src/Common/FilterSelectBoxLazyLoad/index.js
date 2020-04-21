import { filter, times } from "lodash";
import React, { useState } from "react";
import FilterSelectBox from "../FilterSelectBox";

const faker = require("faker");

const fakeList = times(20, (i) => {
    return {
        output: `(${i + 1}) ${faker.company.companyName()}`,
        data: {
            id: faker.random.uuid(),
            name: faker.company.companyName()
        }
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
        }, 1000);
    };

    return (
        <div>
            <FilterSelectBox
                filters={filtersState}
                onSave={() => {
                    changeFilters();
                    onSave();
                }}
                onLazy={changeFilters}
                loading={loadingState}
                hasMore={hasMore}
                inputDelay={1000}
                saveLabel="Save"
                clearLabel="Clear Selection"
            />
        </div>
    );
}
