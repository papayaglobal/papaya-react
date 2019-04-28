import React from "react";
import { storiesOf } from "@storybook/react";
import { withKnobs, text, boolean } from "@storybook/addon-knobs";
import { action } from "@storybook/addon-actions";

import PopOver from "../Common/PopOver";
import Button from "../Common/Button";

import "./stories.css";

storiesOf("PopOvers", module)
  .addDecorator(withKnobs)
  .add("Default", () => (
    <div className="app" style={{ margin: 50 }}>
      <PopOver
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
      <div className="app popover">
        <PopOver
          position="right"
          message="Sed posuere consectetur est at lobortis. Aenean eu leo quam. Pellentesque ornare sem lacinia quam venenatis vestibulum."
        >
          <Button type="primary">
            <span>Display Right popover</span>
          </Button>
        </PopOver>
      </div>
      <br />
      <div className="app popover">
        <PopOver
          position="left"
          message="Sed posuere consectetur est at lobortis. Aenean eu leo quam. Pellentesque ornare sem lacinia quam venenatis vestibulum."
        >
          <Button type="primary">
            <span>Display Left popover</span>
          </Button>
        </PopOver>
      </div>
      <div className="app popover">
        <PopOver
          position="top"
          message="Sed posuere consectetur est at lobortis. Aenean eu leo quam. Pellentesque ornare sem lacinia quam venenatis vestibulum."
        >
          <Button type="primary">
            <span>Display Top popover</span>
          </Button>
        </PopOver>
      </div>
      <div className="app popover">
        <PopOver
          position="bottom"
          message="Sed posuere consectetur est at lobortis. Aenean eu leo quam. Pellentesque ornare sem lacinia quam venenatis vestibulum."
        >
          <Button type="primary">
            <span>Display Bottom popover</span>
          </Button>
        </PopOver>
      </div>
    </div>
  ));
