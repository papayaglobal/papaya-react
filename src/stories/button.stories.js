import React from "react";
import { storiesOf } from "@storybook/react";
import { withKnobs, text, boolean, object } from "@storybook/addon-knobs";
import { action } from "@storybook/addon-actions";

import AppButton from "../Common/Button";
import attachment from "../assets/icons/attachment-white.svg";

import "../assets/css/normalize.css";
import "../index.css";
import "../App.css";
import "./stories.css";

export const actions = {
  onClick: action("onClick")
};

storiesOf("Button", module)
  .addDecorator(withKnobs)
  .add("Default", () => (
    <div className="App">
      <AppButton type="primary" {...actions}>
        <span>{text("label", "With Text")}</span>
      </AppButton>
    </div>
  ))
  .add("Icon with Text", () => (
    <div className="App">
      <AppButton {...actions}>
        <img className="btnIcon" src={attachment} alt="icon" />
        <span className="btnText">{text("label", "With Icon and Text")}</span>
      </AppButton>
    </div>
  ))
  .add("Icon Only", () => (
    <div className="App">
      <AppButton {...actions}>
        <img className="btnIcon" src={attachment} alt="icon" />
      </AppButton>
    </div>
  ))
  .add("Sizes", () => (
    <div className="App">
      <AppButton size="large" {...actions}>
        <img className="btnIcon" src={attachment} alt="icon" />
        <span className="btnText">{text("label", "Large")}</span>
      </AppButton>
      <AppButton size="medium" {...actions}>
        <img className="btnIcon" src={attachment} alt="icon" />
        <span className="btnText">{text("label", "Medium")}</span>
      </AppButton>
      <AppButton size="small" {...actions}>
        <img className="btnIcon" src={attachment} alt="icon" />
        <span className="btnText">{text("label", "Small")}</span>
      </AppButton>
    </div>
  ))
  .add("Types", () => (
    <div>
      <div className="App">
        <AppButton size="large" type="primary" {...actions}>
          <span className="btnText">{text("label", "Primary")}</span>
        </AppButton>
        <AppButton size="large" type="secondary" {...actions}>
          <span className="btnText">{text("label", "Secondary")}</span>
        </AppButton>
      </div>
      <div className="App">
        <AppButton size="medium" type="primary" {...actions}>
          <span className="btnText">{text("label", "Primary")}</span>
        </AppButton>
        <AppButton size="medium" type="secondary" {...actions}>
          <span className="btnText">{text("label", "Secondary")}</span>
        </AppButton>
      </div>
      <div className="App">
        <AppButton size="small" type="primary" {...actions}>
          <span className="btnText">{text("label", "Primary")}</span>
        </AppButton>
        <AppButton size="small" type="secondary" {...actions}>
          <span className="btnText">{text("label", "Secondary")}</span>
        </AppButton>
      </div>
    </div>
  ))
  .add("Outline", () => (
    <div>
      <div className="App">
        <AppButton size="large" type="primary" outline {...actions}>
          <span className="btnText">{text("label", "Primary")}</span>
        </AppButton>
        <AppButton size="large" type="secondary" outline {...actions}>
          <span className="btnText">{text("label", "Secondary")}</span>
        </AppButton>
      </div>
      <div className="App">
        <AppButton size="medium" type="primary" outline {...actions}>
          <span className="btnText">{text("label", "Primary")}</span>
        </AppButton>
        <AppButton size="medium" type="secondary" outline {...actions}>
          <span className="btnText">{text("label", "Secondary")}</span>
        </AppButton>
      </div>
      <div className="App">
        <AppButton size="small" type="primary" outline {...actions}>
          <span className="btnText">{text("label", "Primary")}</span>
        </AppButton>
        <AppButton size="small" type="secondary" outline {...actions}>
          <span className="btnText">{text("label", "Secondary")}</span>
        </AppButton>
      </div>
    </div>
  ))
  .add("Disabled", () => (
    <div>
      <div className="App">
        <AppButton size="large" type="primary" disabled {...actions}>
          <span className="btnText">{text("label", "Primary")}</span>
        </AppButton>
        <AppButton size="large" type="secondary" disabled {...actions}>
          <span className="btnText">{text("label", "Secondary")}</span>
        </AppButton>
      </div>
      <div className="App">
        <AppButton size="large" type="primary" outline disabled {...actions}>
          <span className="btnText">{text("label", "Primary")}</span>
        </AppButton>
        <AppButton size="large" type="secondary" outline disabled {...actions}>
          <span className="btnText">{text("label", "Secondary")}</span>
        </AppButton>
      </div>
    </div>
  ))
  .add("Props", () => (
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
  .add("Custom Style", () => (
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
