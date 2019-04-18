import React from "react";
import { storiesOf } from "@storybook/react";
import { withKnobs, text, boolean } from "@storybook/addon-knobs";
import { action } from "@storybook/addon-actions";

import AppPopOver from "../Common/PopOver";
import AppButton from "../Common/Button";

import "./stories.css";

storiesOf("PopOvers", module)
  .addDecorator(withKnobs)
  .add("Default", () => (
    <div className="App" style={{ margin: 50 }}>
      <AppPopOver
        position="right"
        message="Sed posuere consectetur est at lobortis. Aenean eu leo quam. Pellentesque ornare sem lacinia quam venenatis vestibulum."
        displayPopOver
      />
    </div>
  ))
  .add("Positions", () => (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: 80
      }}
    >
      <div className="App popover">
        <AppPopOver
          position="right"
          message="Sed posuere consectetur est at lobortis. Aenean eu leo quam. Pellentesque ornare sem lacinia quam venenatis vestibulum."
        >
          <AppButton type="primary">
            <span>Display Right popover</span>
          </AppButton>
        </AppPopOver>
      </div>
      <br />
      <div className="App popover">
        <AppPopOver
          position="left"
          message="Sed posuere consectetur est at lobortis. Aenean eu leo quam. Pellentesque ornare sem lacinia quam venenatis vestibulum."
        >
          <AppButton type="primary">
            <span>Display Left popover</span>
          </AppButton>
        </AppPopOver>
      </div>
      <div className="App popover">
        <AppPopOver
          position="top"
          message="Sed posuere consectetur est at lobortis. Aenean eu leo quam. Pellentesque ornare sem lacinia quam venenatis vestibulum."
        >
          <AppButton type="primary">
            <span>Display Top popover</span>
          </AppButton>
        </AppPopOver>
      </div>
      <div className="App popover">
        <AppPopOver
          position="bottom"
          message="Sed posuere consectetur est at lobortis. Aenean eu leo quam. Pellentesque ornare sem lacinia quam venenatis vestibulum."
        >
          <AppButton type="primary">
            <span>Display Bottom popover</span>
          </AppButton>
        </AppPopOver>
      </div>
    </div>
  ));
