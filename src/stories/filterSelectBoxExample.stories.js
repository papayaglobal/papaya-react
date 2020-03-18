import React from "react";
import { storiesOf } from "@storybook/react";
import { text, withKnobs } from "@storybook/addon-knobs";
import { action } from "@storybook/addon-actions";
import { ReactComponent as Dashboard } from "../assets/icons/Dashboard.svg";
import FilterSelectBoxExample from "../Common/FilterSelectBoxExample";

import "./stories.css";

let filters = [
  { output: "Blue Bird", data: ["Blue Bird Data"] },
  { output: "CyberArk", data: ["CyberArk Data"] },
  { output: "Dropbox", data: ["Dropbox Data"] }
];

const onSave = filters => {
  console.log("Selected filters", filters);
};

storiesOf("Filter Select Box Example", module)
  .addDecorator(withKnobs)
  .add("Default", () => (
    <div className="app">
      <FilterSelectBoxExample filters={filters} onSave={onSave} />
    </div>
  ));
