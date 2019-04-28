import React from "react";
import { storiesOf } from "@storybook/react";
import { withKnobs, text, boolean, object } from "@storybook/addon-knobs";
import { action } from "@storybook/addon-actions";

import CheckBox from "../Common/Checkbox";

import "./stories.css";

export const actions = {
  onClick: action("onClick")
};

storiesOf("CheckBox", module)
  .addDecorator(withKnobs)
  .add("Default", () => (
    <div className="app">
      <CheckBox {...actions} />
    </div>
  ));
