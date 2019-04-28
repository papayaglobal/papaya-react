import React from "react";
import { storiesOf } from "@storybook/react";
import { withKnobs, text, number } from "@storybook/addon-knobs";

import Message from "../Common/Message";

import bill from "../assets/icons/bill.svg";

import "./stories.css";

storiesOf("Message", module)
  .addDecorator(withKnobs)
  .add("Default", () => (
    <div className="app message">
      <Message icon={bill}>
        <p>You didn’t get Payments yet…</p>
        <p>Any new payment and a payslip will appear here</p>
      </Message>
    </div>
  ));
