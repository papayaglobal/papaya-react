import React from "react";
import { storiesOf } from "@storybook/react";
import { withKnobs, text, number } from "@storybook/addon-knobs";

import AppMessage from "../Common/Message";

import bill from "../assets/icons/bill.svg";

import "./stories.css";

storiesOf("Message", module)
  .addDecorator(withKnobs)
  .add("Default", () => (
    <div className="App message">
      <AppMessage icon={bill}>
        <p>You didn’t get Payments yet…</p>
        <p>Any new payment and a payslip will appear here</p>
      </AppMessage>
    </div>
  ));
