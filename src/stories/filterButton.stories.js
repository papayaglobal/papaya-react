import React from "react";
import { storiesOf } from "@storybook/react";
import { text, withKnobs } from "@storybook/addon-knobs";
import { action } from "@storybook/addon-actions";
import FilterButton from "../Common/FilterButton";

import "./stories.css";

const OnFilterButtonClick = () => {
  alert("Clicked!");
};

storiesOf("Filter Button", module)
  .addDecorator(withKnobs)
  .add("Default", () => (
    <div className="app">
      <FilterButton
        text="Projects"
        onClick={OnFilterButtonClick}
        selected={false}
      />
    </div>
  ))
  .add("Active", () => (
    <div className="app">
      <FilterButton
        text="Projects"
        onClick={OnFilterButtonClick}
        selected={false}
        active={true}
      />
    </div>
  ))

  .add("Selected", () => (
    <div className="app">
      <FilterButton
        text="Projects"
        onClick={OnFilterButtonClick}
        selected={true}
      />
    </div>
  ));
