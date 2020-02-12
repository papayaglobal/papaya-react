import React from "react";
import { storiesOf } from "@storybook/react";
import { text, withKnobs } from "@storybook/addon-knobs";

import Label from "../Common/Label";

import "./stories.css";

storiesOf("Label", module)
  .addDecorator(withKnobs)
  .add("Default", () => (
    <div className="app label">
      <Label title={text("title", "New")} color={text("color", null)} />
    </div>
  ));
