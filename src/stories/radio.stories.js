import React from "react";
import { storiesOf } from "@storybook/react";
import { withKnobs, text, boolean, object } from "@storybook/addon-knobs";
import { action } from "@storybook/addon-actions";

import RadioButton from "../Common/Radio";

import "./stories.css";

export const actions = {
  onClick: action("onClick")
};

storiesOf("Radio", module)
  .addDecorator(withKnobs)
  .add("Default", () => (
    <div className="app">
      <RadioButton {...actions} />
    </div>
  ));
