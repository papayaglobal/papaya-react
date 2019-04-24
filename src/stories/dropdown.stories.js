import React from "react";
import { storiesOf } from "@storybook/react";
import { withKnobs, text, number } from "@storybook/addon-knobs";

import AppDropdown from "../Common/Dropdown";
import bars from "../assets/icons/bars.svg";

import "./stories.css";

const colours = [
  {
    name: "By Month",
    action: () => alert("Selected By Month")
  },
  {
    name: "By Year",
    action: () => alert("Selected By Year")
  },
  {
    name: "By Day",
    action: () => alert("Selected By Day")
  }
];

storiesOf("Dropdown", module)
  .addDecorator(withKnobs)
  .add("Default", () => (
    <div className="App spinner">
      <AppDropdown list={colours} />
    </div>
  ))
  .add("Icon Only", () => (
    <div className="App spinner">
      <AppDropdown list={colours} icon={bars} />
    </div>
  ));
