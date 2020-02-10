import React from "react";
import { storiesOf } from "@storybook/react";
import { withKnobs, text } from "@storybook/addon-knobs";
import { action } from "@storybook/addon-actions";

import "./stories.css";
import Table from "../Common/Table";

export const actions = {
  onClick: action("onClick")
};

function tablenameInput(name, email) {
  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <div>{name}</div>
      <div>{email}</div>
    </div>
  );
}

const columns = [
  //   { colId: "checkbox", name: <input type="checkbox" />, flex: 0.5 },
  { colId: "type", output: "Type", flex: 1 },
  { colId: "id", output: "ID", flex: 1 },
  { colId: "name", output: "Name", flex: 3 },
  { colId: "org", output: "Org", flex: 3 },
  { colId: "projects", output: "Projects", flex: 2 },
  { colId: "status", output: "Status", flex: 2 }
];

const data = [
  {
    isSelected: true,
    type: "P",
    id: "5531",
    name: tablenameInput("Frank Boehm", "popo@gmail.com"),
    org: "Blue Eagle",
    projects: "3",
    status: "Active"
  },
  {
    isSelected: false,
    type: "S",
    id: "5532",
    name: tablenameInput("Ivan Morais", "popo@gmail.com"),
    org: "Mango",
    projects: "15",
    status: "Active"
  },
  {
    isSelected: false,
    type: "P",
    id: "5533",
    name: tablenameInput("Dominik Doudny", "popo@gmail.com"),
    org: "Facebook",
    projects: "6",
    status: "Active"
  }
];

function log(x) {
  console.log("sleceted", x);
}

storiesOf("Table", module)
  .addDecorator(withKnobs)
  .add("Default", () => (
    <div className="app">
      <Table
        columns={columns}
        data={data}
        selectable
        selectKey="isSelected"
        expandable={<div>Expand Content</div>}
        onSelected={log}
      ></Table>
    </div>
  ));
