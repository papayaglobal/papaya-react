import React from "react";
import { storiesOf } from "@storybook/react";
import { withKnobs, text, number } from "@storybook/addon-knobs";

import Dropdown from "../Common/Dropdown";
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
    <div className="app spinner">
      <Dropdown list={colours} />
    </div>
  ))
  .add("Icon Only", () => (
    <div className="app spinner">
      <Dropdown list={colours} icon={bars} />
    </div>
  ));
