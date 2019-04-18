import React from "react";
import { storiesOf } from "@storybook/react";
import { withKnobs, text, boolean } from "@storybook/addon-knobs";
import { action } from "@storybook/addon-actions";

import AppAlert from "../Common/Alert";

import "./stories.css";

export const actions = {
  onClick: action("onClick")
};

storiesOf("Alert", module)
  .addDecorator(withKnobs)
  .add("Default", () => (
    <div className="App alert">
      <AppAlert
        message={text("message", "Well done! You successfully read this important alert message")}
        type={text("type", "primary")}
      />
    </div>
  ))
  .add("Types", () => (
    <div className="App alert">
      <AppAlert
        message="Well done! You successfully read this important alert message"
        type="success"
      />
      <AppAlert
        message="Heads up! This alert needs your attention, but it's not super important."
        type="primary"
      />
      <AppAlert
        message="Warning! Better check yourself, you're not looking too good"
        type="warning"
        dismissable
      />
      <AppAlert message="Oh snap! Change a few things up and try submitting again." type="error" />
    </div>
  ))
  .add("Dismissable", () => (
    <div className="App alert">
      <AppAlert
        message="Warning! Better check yourself, you're not looking too good"
        type="warning"
        dismissable={boolean("dismissable", true)}
        {...actions}
      />
    </div>
  ));
