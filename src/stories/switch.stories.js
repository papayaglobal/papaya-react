import React from "react";
import { storiesOf } from "@storybook/react";
import { withKnobs, text, boolean, object } from "@storybook/addon-knobs";
import { action } from "@storybook/addon-actions";

import Switch from "../Common/Switch";

import "./stories.css";

export const actions = {
  onClick: action("onClick")
};

storiesOf("Switch", module)
  .addDecorator(withKnobs)
  .add("Default", () => (
    <div className="app">
      <Switch {...actions} />
    </div>
  ));
