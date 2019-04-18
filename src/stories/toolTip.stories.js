import React from "react";
import { storiesOf } from "@storybook/react";
import { withKnobs, text, boolean } from "@storybook/addon-knobs";
import { action } from "@storybook/addon-actions";

import AppToolTip from "../Common/Tooltip";
import AppButton from "../Common/Button";

import "./stories.css";

storiesOf("Tooltips", module)
  .addDecorator(withKnobs)
  .add("Default", () => (
    <div className="App">
      <AppToolTip position="right" message="This is a right tooltip" displayTooltip />
    </div>
  ))
  .add("Positions", () => (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: 50
      }}
    >
      <div className="App tooltip">
        <AppToolTip position="right" message="This is a right tooltip">
          <AppButton type="primary">
            <span>Display Right Tooltip</span>
          </AppButton>
        </AppToolTip>
      </div>
      <br />
      <div className="App tooltip">
        <AppToolTip position="left" message="This is a left tooltip">
          <AppButton type="primary">
            <span>Display Left Tooltip</span>
          </AppButton>
        </AppToolTip>
      </div>
      <div className="App tooltip">
        <AppToolTip position="top" message="This is a top tooltip">
          <AppButton type="primary">
            <span>Display Top Tooltip</span>
          </AppButton>
        </AppToolTip>
      </div>
      <div className="App tooltip">
        <AppToolTip position="bottom" message="This is a bottom tooltip">
          <AppButton type="primary">
            <span>Display Bottom Tooltip</span>
          </AppButton>
        </AppToolTip>
      </div>
    </div>
  ));
