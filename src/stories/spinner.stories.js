import React from "react";
import { storiesOf } from "@storybook/react";
import { withKnobs, text, number } from "@storybook/addon-knobs";

import Spinner from "../Common/Spinner";

import "./stories.css";

storiesOf("Spinner", module)
  .addDecorator(withKnobs)
  .add("Default", () => (
    <div className="App spinner">
      <Spinner />
    </div>
  ))
  .add("Color", () => (
    <div className="App spinner">
      <Spinner color={text("color", "#ff0000")} />
    </div>
  ))
  .add("Size", () => (
    <div className="App spinner">
      <Spinner width={text("width", "64px")} height={text("height", "64px")} />
    </div>
  ))
  .add("Stroke Width", () => (
    <div className="App spinner">
      <Spinner strokeWidth={number("strokeWidth", 6)} />
    </div>
  ));
