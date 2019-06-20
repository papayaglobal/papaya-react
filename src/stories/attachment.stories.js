import React from "react";
import { storiesOf } from "@storybook/react";
import { withKnobs, object } from "@storybook/addon-knobs";

import Attachment from "../Common/Attachment";

import "./stories.css";

storiesOf("Attachment", module)
  .addDecorator(withKnobs)
  .add("Default", () => (
    <div className="app attachment">
      <Attachment attachments={[{ fileName: "file1.pdf" }]} />
    </div>
  ))
  .add("With Filename", () => (
    <div className="app attachment">
      <Attachment attachments={[{ fileName: "file1.pdf" }]} displayName type="link" />
    </div>
  ))
  .add("Multiple Attachments", () => (
    <div className="app attachment">
      <Attachment
        attachments={object("attachments", [
          { fileName: "file1.pdf" },
          { fileName: "file2.pdf" },
          { fileName: "file3.pdf" }
        ])}
      />
    </div>
  ))
  .add("Multiple Attachments with FileName", () => (
    <div className="app attachment">
      <Attachment
        attachments={object("attachments", [
          { fileName: "file1.pdf" },
          { fileName: "file2.pdf" },
          { fileName: "file3.pdf" }
        ])}
        displayName
        type="link"
      />
    </div>
  ));
