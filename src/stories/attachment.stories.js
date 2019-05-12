import React from "react";
import { storiesOf } from "@storybook/react";
import { withKnobs, array } from "@storybook/addon-knobs";

import Attachment from "../Common/Attachment";

import "./stories.css";

storiesOf("Attachment", module)
  .addDecorator(withKnobs)
  .add("Default", () => (
    <div className="app attachment">
      <Attachment attachments={["file1.pdf"]} />
    </div>
  ))
  .add("With Filename", () => (
    <div className="app attachment">
      <Attachment attachments={["file1.pdf"]} displayName type="link" />
    </div>
  ))
  .add("Multiple Attachments", () => (
    <div className="app attachment">
      <Attachment attachments={array("attachments", ["file1.pdf", "file2.pdf", "file3.pdf"])} />
    </div>
  ))
  .add("Multiple Attachments with FileName", () => (
    <div className="app attachment">
      <Attachment
        attachments={array("attachments", ["file1.pdf", "file2.pdf", "file3.pdf"])}
        displayName
        type="link"
      />
    </div>
  ));
