import React from "react";
import { storiesOf } from "@storybook/react";
import { withKnobs, text, boolean, number } from "@storybook/addon-knobs";
import { action } from "@storybook/addon-actions";

import TextArea from "../Common/TextArea";

import "./stories.css";

storiesOf("TextArea", module)
  .addDecorator(withKnobs)
  .add("Default", () => (
    <div className="app">
      <TextArea placeholder="Text input..." />
    </div>
  ))
  .add("With Cols & Rows", () => (
    <div className="app">
      <TextArea placeholder="Text input..." cols={number("cols", 80)} rows={number("rows", 8)} />
    </div>
  ))
  .add("Disabled", () => (
    <div className="app">
      <TextArea
        placeholder="Text input..."
        cols={number("cols", 50)}
        rows={number("rows", 5)}
        disabled={boolean("disabled", true)}
      />
    </div>
  ));
