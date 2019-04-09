import React from "react";
import { storiesOf } from "@storybook/react";
import { withKnobs, text, boolean, object } from "@storybook/addon-knobs";
import { action } from "@storybook/addon-actions";

import AppTextInput from "../Common/TextInput";

import "../assets/css/normalize.css";
import "./stories.css";

export const actions = {
  onChange: action("onChange")
};

storiesOf("InputText", module)
  .addDecorator(withKnobs)
  .add("Default", () => (
    <div className="App">
      <AppTextInput placeholder="Placeholder" {...actions} />
    </div>
  ))
  .add("Disabled", () => (
    <div className="App">
      <AppTextInput placeholder="Disabled Input" disabled />
    </div>
  ))
  .add("Validations", () => (
    <div className="App">
      <AppTextInput
        placeholder="Valid Input"
        value={text("value", "Valid Input")}
        validationType="valid"
        {...actions}
      />
      <AppTextInput
        placeholder="Warning Input"
        value="Warning Input"
        validationType="warning"
        {...actions}
      />
      <AppTextInput
        placeholder="Error Input"
        value="Error Input"
        validationType="error"
        {...actions}
      />
    </div>
  ))
  .add("Props", () => (
    <div className="App">
      <AppTextInput
        placeholder="Placeholder"
        validationType={text("validationType", "valid")}
        {...actions}
      />
    </div>
  ));
