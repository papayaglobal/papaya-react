import React from "react";
import { storiesOf } from "@storybook/react";
import { text, withKnobs } from "@storybook/addon-knobs";

import Label from "../Common/Label";

import "./stories.css";
import styled from "styled-components";

storiesOf("Label", module)
  .addDecorator(withKnobs)
  .add("Default", () => (
    <div className="app label">
      <Label title={text("title", "New")} color={text("color", null)} />
    </div>
  ))
  .add("Squared", () => (
    <div className="app">
      <Label
        title={text("title", "P")}
        color={text("color", null)}
        squared
      ></Label>
    </div>
  ))
  .add("Sample", () => (
    <div className="app">
      <div style={{ position: "relative" }}>
        <Label
          title={text("title", "P")}
          color={text("color", "#00C7D6")}
          squared
        ></Label>
        <LabelContainer>
          <Label
            title={text("title", "W")}
            color={text("small color", "#976FED")}
            squared
            small
          ></Label>
        </LabelContainer>
      </div>
    </div>
  ));

const LabelContainer = styled.div`
  position: absolute;
  bottom: -5px;
  left: 14px;
`;
