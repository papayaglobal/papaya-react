import React from "react";
import { storiesOf } from "@storybook/react";
import { withKnobs, text, boolean } from "@storybook/addon-knobs";
import { action } from "@storybook/addon-actions";

import Link from "../Common/HyperLink";

import attachment from "../assets/icons/attachment-link.svg";

import "./stories.css";

export const actions = {
  onClick: action("onClick")
};

storiesOf("HyperLinks", module)
  .addDecorator(withKnobs)
  .add("Default", () => (
    <div className="app alert">
      <Link onClick={() => alert("Clicked")}>Normal Link</Link>
    </div>
  ))
  .add("Size", () => (
    <div className="app alert">
      <Link onClick={() => alert("Clicked")} size={text("size", "normal")}>
        Normal Link
      </Link>
    </div>
  ))
  .add("With Icon", () => (
    <div className="app alert">
      <Link onClick={() => alert("Clicked")} size={text("size", "normal")}>
        <img src={attachment} alt="" />
        Normal Link
      </Link>
    </div>
  ));
