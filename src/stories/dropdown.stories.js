import React from "react";
import { storiesOf } from "@storybook/react";
import { withKnobs } from "@storybook/addon-knobs";

import Dropdown from "../Common/Dropdown";
import bars from "../assets/icons/bars.svg";

import "./stories.css";

let colors = [
  {
    name: "By Month",
    selected: true
  },
  {
    name: "By Year",
    selected: false
  },
  {
    name: "By Day",
    selected: false
  }
];

storiesOf("Dropdown", module)
  .addDecorator(withKnobs)
  .add("Default", () => (
    <div className="app spinner">
      <Dropdown list={colors} onSelect={() => {}} />
    </div>
  ))
  .add("Icon Only", () => (
    <div className="app spinner">
      <Dropdown list={colors} icon={bars} onSelect={() => {}} />
    </div>
  ))
  .add("With Selected Item", () => (
    <div className="app spinner">
      <Dropdown
        list={colors}
        onSelect={item => {
          colors = colors.map(c => {
            if (c.name === item.name) {
              c.selected = true;
              return c;
            } else {
              c.selected = false;
              return c;
            }
          });
        }}
      />
    </div>
  ));
