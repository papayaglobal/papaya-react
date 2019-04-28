import React from "react";
import { storiesOf } from "@storybook/react";
import { withKnobs, text, boolean, object } from "@storybook/addon-knobs";
import { action } from "@storybook/addon-actions";

import Button from "../Common/Button";
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
    <div className="app">
      <Button type="primary" {...actions}>
        <span className="btnText">{text("label", "With Text")}</span>
      </Button>
    </div>
  ))
  .add("Icon with Text", () => (
    <div className="app">
      <Button {...actions}>
        <img className="btnIcon" src={attachment} alt="icon" />
        <span className="btnText">{text("label", "With Icon and Text")}</span>
      </Button>
    </div>
  ))
  .add("Icon Only", () => (
    <div className="app">
      <Button {...actions}>
        <img className="btnIcon" src={attachment} alt="icon" />
      </Button>
    </div>
  ))
  .add("Sizes", () => (
    <div className="app">
      <Button size="large" {...actions}>
        <img className="btnIcon" src={attachment} alt="icon" />
        <span className="btnText">{text("label", "Large")}</span>
      </Button>
      <Button size="medium" {...actions}>
        <img className="btnIcon" src={attachment} alt="icon" />
        <span className="btnText">{text("label", "Medium")}</span>
      </Button>
      <Button size="small" {...actions}>
        <img className="btnIcon" src={attachment} alt="icon" />
        <span className="btnText">{text("label", "Small")}</span>
      </Button>
    </div>
  ))
  .add("Types", () => (
    <div>
      <div className="app">
        <Button size="large" type="primary" {...actions}>
          <span className="btnText">{text("label", "Primary")}</span>
        </Button>
        <Button size="large" type="secondary" {...actions}>
          <span className="btnText">{text("label", "Secondary")}</span>
        </Button>
      </div>
      <div className="app">
        <Button size="medium" type="primary" {...actions}>
          <span className="btnText">{text("label", "Primary")}</span>
        </Button>
        <Button size="medium" type="secondary" {...actions}>
          <span className="btnText">{text("label", "Secondary")}</span>
        </Button>
      </div>
      <div className="app">
        <Button size="small" type="primary" {...actions}>
          <span className="btnText">{text("label", "Primary")}</span>
        </Button>
        <Button size="small" type="secondary" {...actions}>
          <span className="btnText">{text("label", "Secondary")}</span>
        </Button>
      </div>
    </div>
  ))
  .add("Outline", () => (
    <div>
      <div className="app">
        <Button size="large" type="primary" outline {...actions}>
          <span className="btnText">{text("label", "Primary")}</span>
        </Button>
        <Button size="large" type="secondary" outline {...actions}>
          <span className="btnText">{text("label", "Secondary")}</span>
        </Button>
      </div>
      <div className="app">
        <Button size="medium" type="primary" outline {...actions}>
          <span className="btnText">{text("label", "Primary")}</span>
        </Button>
        <Button size="medium" type="secondary" outline {...actions}>
          <span className="btnText">{text("label", "Secondary")}</span>
        </Button>
      </div>
      <div className="app">
        <Button size="small" type="primary" outline {...actions}>
          <span className="btnText">{text("label", "Primary")}</span>
        </Button>
        <Button size="small" type="secondary" outline {...actions}>
          <span className="btnText">{text("label", "Secondary")}</span>
        </Button>
      </div>
    </div>
  ))
  .add("Disabled", () => (
    <div>
      <div className="app">
        <Button size="large" type="primary" disabled {...actions}>
          <span className="btnText">{text("label", "Primary")}</span>
        </Button>
        <Button size="large" type="secondary" disabled {...actions}>
          <span className="btnText">{text("label", "Secondary")}</span>
        </Button>
      </div>
      <div className="app">
        <Button size="large" type="primary" outline disabled {...actions}>
          <span className="btnText">{text("label", "Primary")}</span>
        </Button>
        <Button size="large" type="secondary" outline disabled {...actions}>
          <span className="btnText">{text("label", "Secondary")}</span>
        </Button>
      </div>
    </div>
  ))
  .add("Props", () => (
    <div className="app">
      <Button
        type={text("type", "primary")}
        size={text("size", "large")}
        outline={boolean("outline", true)}
        disabled={boolean("disabled", false)}
        {...actions}
      >
        <span className="btnText">{text("label", "With Props")}</span>
      </Button>
    </div>
  ))
  .add("Custom Style", () => (
    <div className="app">
      <Button
        {...actions}
        style={object("style", {
          backgroundColor: "#ff1b1b",
          border: "1px solid black"
        })}
      >
        <span className="btnText">{text("label", "Custom Style")}</span>
      </Button>
    </div>
  ));
