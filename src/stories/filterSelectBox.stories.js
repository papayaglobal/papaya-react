import React from "react";
import { storiesOf } from "@storybook/react";
import { number, withKnobs } from "@storybook/addon-knobs";
import { action } from "@storybook/addon-actions";
import { ReactComponent as Dashboard } from "../assets/icons/Dashboard.svg";
import FilterSelectBox from "../Common/FilterSelectBox";
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

const onSave = filters => {
  console.log("Selected filters", filters);
};

storiesOf("Filter Select Box", module)
  .addDecorator(withKnobs)
  .add("Default", () => (
    <div className="app">
      <FilterSelectBox
        filters={filters}
        onSave={onSave}
        saveLabel="Save"
        clearLabel="Clear Selection"
        inputDelay={number("input delay", 1500)}
      />
    </div>
  ))
  .add("With Groups", () => (
    <div className="app">
      <FilterSelectBox
        filters={filterGroups}
        onSave={onSave}
        saveLabel="Save"
        clearLabel="Clear Selection"
      />
    </div>
  ))
  .add("With Lazy Load", () => (
    <div className="app">
      <FilterSelectBoxLazyLoad filters={filters} onSave={onSave} />
    </div>
  ));