import React from "react";
import { storiesOf } from "@storybook/react";
import { withKnobs, text, object, array } from "@storybook/addon-knobs";

import ReportRow from "../Common/ReportRow";

import "./stories.css";

const actions = [
  {
    name: "Edit",
    action: () => alert("Clicked Edit")
  },
  {
    name: "Delete",
    action: () => alert("Clicked Delete")
  }
];

storiesOf("Report Row", module)
  .addDecorator(withKnobs)
  .add("Default", () => (
    <div className="app attachment">
      <ReportRow
        attachments={[{ fileName: "file1.pdf" }]}
        pendingTooltip="Report Row with single attachment"
        dates={text("dates", "15-20 April 2019")}
        actions={actions}
      />
    </div>
  ))
  .add("Multiple Props", () => (
    <div className="app attachment" style={{ flexDirection: "column", alignItems: "stretch" }}>
      <ReportRow
        type={text("type", "vacation")}
        attachments={array("attachments", [
          { fileName: "file1.pdf" },
          { fileName: "file2.pdf" },
          { fileName: "file3.pdf" }
        ])}
        reportStatus={text("reportStatus", "planned")}
        pendingTooltip={text("pendingTooltip", "Report Row with multiple attachment")}
        dates={text("dates", "10 May 2019")}
        reportedDate={text("reportedDate", "11 May 2019")}
        actions={array("actions", actions)}
        daysReported={text("daysReported", "1 Day")}
      />
      <br />

        <ReportRow
            type={text("type", "vacation")}
            attachments={array("attachments", [
                { fileName: "file1.pdf" },
                { fileName: "file2.pdf" },
                { fileName: "file3.pdf" }
            ])}
            reportStatus={"history"}
            pendingTooltip={text("pendingTooltip", "Report Row with multiple attachment")}
            dates={text("dates", "10 May 2019")}
            reportedDate={text("reportedDate", "11 May 2019")}
            actions={array("actions", actions)}
            daysReported={text("daysReported", "1 Day")}
        />
    </div>
  ));
