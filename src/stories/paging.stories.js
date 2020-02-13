import React from "react";
import { storiesOf } from "@storybook/react";
import { withKnobs, text } from "@storybook/addon-knobs";
import { action } from "@storybook/addon-actions";

import "./stories.css";
import Paging from "../Common/Paging";

export const actions = {
  onClick: action("onClick")
};

storiesOf("Paging", module)
  .addDecorator(withKnobs)
  .add("Default", () => (
    <div className="app">
      <Paging pageCount={6} onNumClick={num => console.log(num)}></Paging>
    </div>
  ));
