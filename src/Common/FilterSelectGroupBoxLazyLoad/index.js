import { filter, times, flatMap, flatten, map, groupBy } from "lodash";
import React, { useState } from "react";
import FilterSelectBox from "../FilterSelectBox";

const faker = require("faker");

const fakeList = flatten(
    times(5, (customerId) => {
        const customerName = faker.company.companyName();

        return flatMap(
            times(3, () => {
                return {
                    id: faker.random.uuid(),
                    name: `${faker.name.jobArea()}`,
                    customerId: customerId + 1,
                    customerName
                };
            })
        );
    })
);

const pageSize = 5;

const lazyLoad = (value, prevList, prevSearchTerm) => {
    const filters = value ? filter(fakeList, (item) => RegExp(value, "gi").test(item.output)) : fakeList;
    if (prevSearchTerm !== value) {
        return { filters: filters.slice(0, pageSize), hasMore: filters.slice(0, pageSize).length < filters.length };
    }
    const newFilters = [...prevList, ...filters.slice(prevList.length, prevList.length + pageSize)];

    return { filters: newFilters, hasMore: newFilters.length < filters.length };
};

const groupByCustomer = (filters) => {
    return map(groupBy(filters, "customerId"), (customerFilters) => {
        return {
            listName: customerFilters[0].customerName,
            filtersList: map(customerFilters, (filter) => {
                return {
                    output: filter.name,
                    data: filter
                };
            })
        };
    });
};

export default function FilterSelectGroupBoxLazyLoad({ onSave }) {
    const [filtersState, setFiltersState] = useState(fakeList.slice(0, pageSize));
    const [loadingState, setLoadingState] = useState(false);
    const [hasMore, setHasMore] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");

    const changeFilters = (value) => {
        setLoadingState(true);
        setTimeout(() => {
            setFiltersState((prev) => {
                const { filters, hasMore } = lazyLoad(value, prev, searchTerm);
                setHasMore(hasMore);

                return filters;
            });
            setLoadingState(false);
            setSearchTerm(value);
        }, 1000);
    };

    const groupedFilters = groupByCustomer(filtersState);

    return (
        <div>
            <FilterSelectBox
                filters={groupedFilters}
                onSave={(filters) => {
                    changeFilters("");
                    onSave(filters);
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
