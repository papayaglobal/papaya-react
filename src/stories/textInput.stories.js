import React from "react";
import { storiesOf } from "@storybook/react";
import { withKnobs, text, boolean, object } from "@storybook/addon-knobs";
import { action } from "@storybook/addon-actions";

import TextInput from "../Common/TextInput";

import "../assets/css/normalize.css";
import "./stories.css";

export const actions = {
  onChange: action("onChange")
};

storiesOf("InputText", module)
  .addDecorator(withKnobs)
  .add("Default", () => (
    <div className="app">
      <TextInput placeholder="Placeholder" {...actions} />
    </div>
  ))
  .add("Disabled", () => (
    <div className="app">
      <TextInput placeholder="Disabled Input" disabled />
    </div>
  ))
  .add("Validations", () => (
    <div className="app">
      <TextInput
        placeholder="Valid Input"
        value={text("value", "Valid Input")}
        validationType="valid"
        {...actions}
      />
      <TextInput
        placeholder="Warning Input"
        value="Warning Input"
        validationType="warning"
        {...actions}
      />
      <TextInput
        placeholder="Error Input"
        value="Error Input"
        validationType="error"
        {...actions}
      />
    </div>
  ))
  .add("Props", () => (
    <div className="app">
      <TextInput
        placeholder="Placeholder"
        validationType={text("validationType", "valid")}
        {...actions}
      />
    </div>
  ));
