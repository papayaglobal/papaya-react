import React from "react";
import { storiesOf } from "@storybook/react";
import { text, withKnobs } from "@storybook/addon-knobs";
import { action } from "@storybook/addon-actions";
import FilterButtonExample from "../Common/FilterButtonExample";

import "./stories.css";

const OnFilterButtonClick = () => {
  alert("Clicked!");
};

storiesOf("Filter Button Example", module)
  .addDecorator(withKnobs)
  .add("Default", () => (
    <div className="app">
      <FilterButtonExample />
    </div>
  ));
