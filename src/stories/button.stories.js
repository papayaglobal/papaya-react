import React from "react";
import { storiesOf } from "@storybook/react";
import { withKnobs, text, boolean, object } from "@storybook/addon-knobs";
import { action } from "@storybook/addon-actions";

import AppButton from "../Common/Button";
import attachment from "../assets/icons/attachment-white.svg";

import "../index.css";
import "../App.css";

export const actions = {
  onClick: action("onClick")
};

storiesOf("Button", module)
  .addDecorator(withKnobs)
  .add("default", () => (
    <div className="App">
      <AppButton type="primary" {...actions}>
        <span>{text("label", "With Text")}</span>
      </AppButton>
    </div>
  ))
  .add("with icon", () => (
    <div className="App">
      <AppButton {...actions}>
        <img className="btnIcon" src={attachment} alt="icon" />
        <span className="btnText">{text("label", "With Icon")}</span>
      </AppButton>
    </div>
  ))
  .add("with props", () => (
    <div className="App">
      <AppButton
        type={text("type", "primary")}
        size={text("size", "large")}
        outline={boolean("outline", true)}
        disabled={boolean("disabled", false)}
        {...actions}
      >
        <span className="btnText">{text("label", "With Props")}</span>
      </AppButton>
    </div>
  ))
  .add("custom style", () => (
    <div className="App">
      <AppButton
        {...actions}
        style={object("style", {
          backgroundColor: "#ff1b1b",
          border: "1px solid black"
        })}
      >
        <span className="btnText">{text("label", "Custom Style")}</span>
      </AppButton>
    </div>
  ));
