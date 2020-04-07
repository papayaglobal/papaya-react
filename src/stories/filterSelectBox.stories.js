import React, { useRef } from "react";
import { storiesOf } from "@storybook/react";
import { number, withKnobs } from "@storybook/addon-knobs";
import FilterSelectBox from "../Common/FilterSelectBox";
import UserTypeFilter from "../Common/FilterSelectBox/UserTypeFilter";
import FilterSelectBoxLazyLoad from "../Common/FilterSelectBoxLazyLoad";

import "./stories.css";

let filters = [
    { output: "Blue Bird", data: ["Blue Bird Data"] },
    { output: "CyberArk", data: ["CyberArk Data"], isSelected: true },
    { output: "Dropbox", data: ["Dropbox Data"] }
];

const filterGroups = [
    {
        listName: "Papaya User Roles",
        filtersList: [
            { output: "Papaya Admin", data: ["Papaya Admin Data"] },
            { output: "Worker", data: ["Worker Data"] },
            { output: "Contractor", data: ["Contractor Data"], isSelected: true }
        ]
    },
    {
        listName: "Customer User Roles",
        filtersList: [
            { output: "Customer Admin", data: ["Customer Admin Data"] },
            { output: "Customer HR Manager", data: ["Customer HR Manager Data"] },
            {
                output: "Customer Finance Manager",
                data: ["Customer Finance Manager Data"]
            }
        ]
    }
];

const userTypeFilters = [
    {
        output: <UserTypeFilter iconTitle="C" color="#00c7d6" text="Customer" />,
        data: {},
        isSelected: false,
        searchTerm: "Customer"
    },
    {
        output: <UserTypeFilter iconTitle="P" color="#00c7d6" text="Papaya" />,
        data: {},
        isSelected: false,
        searchTerm: "Papaya"
    },
    {
        output: <UserTypeFilter iconTitle="S" color="#00c7d6" text="Supplier" />,
        data: {},
        isSelected: false,
        searchTerm: "Supplier"
    }
];

const onSave = (filters) => {
    console.log("Selected filters", filters);
};

storiesOf("Filter Select Box", module)
    .addDecorator(withKnobs)
    .add("Default", () => {
        const selectBoxEl = useRef(null);

        const clearFilters = () => {
            selectBoxEl.current.clearFilters();
        };

        return (
            <div className="app">
                <button onClick={clearFilters}>Clear Filters</button>
                <FilterSelectBox
                    ref={selectBoxEl}
                    filters={filters}
                    onSave={onSave}
                    saveLabel="Save"
                    clearLabel="Clear Selection"
                    inputDelay={number("input delay", 1500)}
                />
            </div>
        );
    })
    .add("With Groups", () => (
        <div className="app">
            <FilterSelectBox filters={filterGroups} onSave={onSave} saveLabel="Save" clearLabel="Clear Selection" />
        </div>
    ))
    .add("With Search Term", () => (
        <div className="app">
            <FilterSelectBox filters={userTypeFilters} onSave={onSave} saveLabel="Save" clearLabel="Clear Selection" />
        </div>
    ))
    .add("With Lazy Load", () => (
        <div className="app">
            <FilterSelectBoxLazyLoad onSave={onSave} />
        </div>
    ));
