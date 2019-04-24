import React from "react";
import { storiesOf } from "@storybook/react";
import { withKnobs, text, array } from "@storybook/addon-knobs";

import AppAttachment from "../Common/Attachment";

import "./stories.css";

storiesOf("Attachment", module)
  .addDecorator(withKnobs)
  .add("Default", () => (
    <div className="App attachment">
      <AppAttachment
        type={text("type", "vacation")}
        attachments={["file1.pdf"]}
        dates={text("dates", "15-20 April 2019")}
        pendingTooltip={text("pendingTooltip", "Tooltip text TBD")}
      />
    </div>
  ))
  .add("Multiple Attahments", () => (
    <div className="App attachment">
      <AppAttachment
        type={text("type", "sick")}
        dates={text("dates", "10 May 2019")}
        attachments={array("attachments", ["file1.pdf", "file2.pdf", "file3.pdf"])}
        pendingTooltip={text("pendingTooltip", "Tooltip text TBD")}
      />
    </div>
  ));
