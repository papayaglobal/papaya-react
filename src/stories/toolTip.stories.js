import React from "react";
import { storiesOf } from "@storybook/react";
import { withKnobs, text, boolean } from "@storybook/addon-knobs";
import { action } from "@storybook/addon-actions";

import ToolTip from "../Common/Tooltip";
import Button from "../Common/Button";

import "./stories.css";

storiesOf("Tooltips", module)
  .addDecorator(withKnobs)
  .add("Default", () => (
    <div className="app">
      <ToolTip
        position="right"
        message="This is a right tooltip"
        displayTooltip
      />
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
      <div className="app tooltip">
        <ToolTip position="right" message="This is a right tooltip">
          <Button type="primary">
            <span>Display Right Tooltip</span>
          </Button>
        </ToolTip>
      </div>
      <br />
      <div className="app tooltip">
        <ToolTip position="left" message="This is a left tooltip">
          <Button type="primary">
            <span>Display Left Tooltip</span>
          </Button>
        </ToolTip>
      </div>
      <div className="app tooltip">
        <ToolTip position="top" message="This is a top tooltip">
          <Button type="primary">
            <span>Display Top Tooltip</span>
          </Button>
        </ToolTip>
      </div>
      <div className="app tooltip">
        <ToolTip position="bottom" message="This is a bottom tooltip">
          <Button type="primary">
            <span>Display Bottom Tooltip</span>
          </Button>
        </ToolTip>
      </div>
    </div>
  ));
