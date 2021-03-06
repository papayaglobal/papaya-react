import React from "react";
import { storiesOf } from "@storybook/react";
import { withKnobs, text, boolean } from "@storybook/addon-knobs";
import { action } from "@storybook/addon-actions";

import SelectBox from "../Common/Select";

import "./stories.css";

const options = [
  { value: "1", label: "Option 1" },
  { value: "2", label: "Option 2" },
  { value: "3", label: "Option 3" },
  { value: "4", label: "Option 4" },
  { value: "5", label: "Option 5" }
];

storiesOf("Select", module)
    .addDecorator(withKnobs)
    .add("Default", () => (
        <div className="app">
          <SelectBox options={options} placeholder="Placeholder" isMulti={false} />
        </div>
      ))
    .add("Multiple Values", () => (
        <div className="app">
        <SelectBox options={options} placeholder="Placeholder" isMulti={boolean("isMulti", true)} />
        </div>
        ))
    .add("Single Value Already selected", () => (
        <div className="app">
            <SelectBox options={options} placeholder="Placeholder" isMulti={false} value={options[3]} />
        </div>
    ));
