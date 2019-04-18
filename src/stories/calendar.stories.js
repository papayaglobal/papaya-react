import React from "react";
import { storiesOf } from "@storybook/react";
import { withKnobs, text, number } from "@storybook/addon-knobs";

import Calendar from "../Common/Calendar";

import "./stories.css";

storiesOf("Calendar", module)
  .addDecorator(withKnobs)
  .add("Default", () => (
    <div className="App calendar">
      <Calendar />
    </div>
  ));
