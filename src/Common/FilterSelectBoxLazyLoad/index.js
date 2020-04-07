import React, { useState, useEffect } from "react";
import { filter, includes, toLower, times, random } from "lodash";
import FilterSelectBox from "../FilterSelectBox";

const faker = require("faker");

export default function FilterSelectBoxLazyLoad({ filters, onSave }) {
    const [filterState, setFilterState] = useState(filters);
    const [loadingState, setLoadingState] = useState(false);
    const [hasMore, setHasMore] = useState(true);

    const changeFilters = (value) => {
        setLoadingState(true);
        setTimeout(() => {
            setFilterState((prev) => {
                const total = 20;
                const newFilterss = [
                    ...prev,
                    ...times(3, () => ({
                        output: faker.company.companyName(),
                        data: faker.company.catchPhrase()
                    }))
                ];
                const res = value
                    ? filter(newFilterss, (filter) => {
                          return includes(toLower(filter.output), toLower(value));
                      })
                    : newFilterss;

                setHasMore(res.length < total);
                // console.log(res);
                return res;
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
                hasMore={hasMore}
                saveLabel="Save"
                clearLabel="Clear Selection"
            />
            <button onClick={changeFilters}>Add filters</button>
        </div>
    );
}
