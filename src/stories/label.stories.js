import React from "react";
import { storiesOf } from "@storybook/react";
import { withKnobs, text, boolean } from "@storybook/addon-knobs";

import AppLabel from "../Common/Label";

import "./stories.css";

storiesOf("Label", module)
  .addDecorator(withKnobs)
  .add("Default", () => (
    <div className="App label">
      <AppLabel title={text("title", "New")} />
    </div>
  ));
