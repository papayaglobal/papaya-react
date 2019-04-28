import React from "react";
import { storiesOf } from "@storybook/react";
import { withKnobs, text, boolean } from "@storybook/addon-knobs";

import Label from "../Common/Label";

import "./stories.css";

storiesOf("Label", module)
  .addDecorator(withKnobs)
  .add("Default", () => (
    <div className="app label">
      <Label title={text("title", "New")} />
    </div>
  ));
