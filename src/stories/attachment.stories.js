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
  .add("Multiple Attahments", () => (
    <div className="app attachment">
      <Attachment attachments={array("attachments", ["file1.pdf", "file2.pdf", "file3.pdf"])} />
    </div>
  ));
