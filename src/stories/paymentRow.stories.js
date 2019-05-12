import React from "react";
import { storiesOf } from "@storybook/react";
import { withKnobs, text, array, boolean } from "@storybook/addon-knobs";

import PaymentRow from "../Common/PaymentRow";

import "./stories.css";

const actions = [
  {
    name: "View Payslip",
    action: () => alert("Clicked View Payslip")
  },
  {
    name: "Download Payslip",
    action: () => alert("Clicked Download Payslip")
  },
  {
    name: "Report an Issue",
    action: () => alert("Clicked Report an Issue")
  }
];

storiesOf("Payment Row", module)
  .addDecorator(withKnobs)
  .add("Default", () => (
    <div className="app attachment">
      <PaymentRow
        attachments={["Payslip-April-1.pdf"]}
        dates={text("dates", "April 2019")}
        amount={text("amount", "7,705.58")}
        reportedDate={text("reportedDate", "18 Apr 2019")}
        actions={actions}
        isNew={boolean("isNew", false)}
        isMonthly
      />
    </div>
  ))
  .add("With Pay Period", () => (
    <div className="app attachment">
      <PaymentRow
        attachments={["Payslip-May-1.pdf"]}
        dates={text("dates", "01 - 15 May")}
        amount={text("amount", "7,705.58")}
        reportedDate={text("reportedDate", "10 May 2019")}
        actions={actions}
        isNew={boolean("isNew", false)}
        isMonthly={false}
      />
    </div>
  ))
  .add("Selectable", () => (
    <div className="app attachment">
      <PaymentRow
        attachments={["Payslip-May-1.pdf"]}
        dates={text("dates", "01 - 15 May")}
        amount={text("amount", "7,705.58")}
        reportedDate={text("reportedDate", "10 May 2019")}
        actions={actions}
        isNew={boolean("isNew", false)}
        isMonthly={false}
        selectable={true}
      />
    </div>
  ))
  .add("New Payment", () => (
    <div className="app attachment">
      <PaymentRow
        attachments={["Payslip-April-1.pdf"]}
        dates={text("dates", "15-20 April 2019")}
        amount={text("amount", "7,705.58")}
        reportedDate={text("reportedDate", "18 Apr 2019")}
        actions={actions}
        isNew={boolean("isNew", true)}
        selectable={boolean("selectable", false)}
      />
    </div>
  ))
  .add("Multiple Props", () => (
    <div className="app attachment">
      <PaymentRow
        attachments={array("attachments", ["file1.pdf", "file2.pdf", "file3.pdf"])}
        pendingTooltip="Report Row with multiple attachment"
        dates={text("dates", "10 May 2019")}
        reportedDate={text("reportedDate", "11 May 2019")}
        actions={actions}
        daysReported={text("daysReported", "1 Day")}
        selectable={boolean("selectable", false)}
      />
    </div>
  ));
