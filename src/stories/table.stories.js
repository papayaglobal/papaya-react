import React from "react";
import { storiesOf } from "@storybook/react";
import { withKnobs } from "@storybook/addon-knobs";
import { action } from "@storybook/addon-actions";
import { orderBy } from "lodash";

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
  { colId: "type", output: "Type", flex: 1 },
  { colId: "id", output: "ID", flex: 1 },
  {
    colId: "nameAndEmailOutput",
    output: "Name",
    flex: 2,
    sortMethod: (data, sortOrder) => sortNameColumnBy(data, sortOrder)
  },
  { colId: "org", output: "Org", flex: 2 },
  { colId: "projects", output: "Projects", flex: 1 },
  { colId: "status", output: "Status", flex: 0.5 }
];

const data = [
  {
    isSelected: true,
    expandContent: <div>Expand Content 1</div>,
    sideMenuContent: [
      {
        name: "View Profile",
        action: () => {
          console.log("Viewing profile...");
        }
      },
      {
        name: "Edit",
        action: () => {
          console.log("Editing...");
        }
      },
      { name: "Re-Invite", action: () => console.log("Re-inviting...") },
      { name: "Suspend User", action: () => console.log("Suspending...") },
      { name: "Block User", action: () => console.log("Blocking...") },
      {
        name: "Send Change Pasword",
        action: () => console.log("Change pass...")
      }
    ],
    type: "P",
    id: 5532,
    name: "Frank Boehm",
    nameAndEmailOutput: tablenameInput("Frank Boehm", "popo@gmail.com"),
    org: "Blue Eagle",
    projects: 3,
    status: "Active"
  },
  {
    isSelected: false,
    expandContent: (
      <div>
        Expand Content 2
        <div>
          hello
          <div>
            popo
            <div>
              momo
              <div>
                lolo
                <div>
                  dodo
                  <div>
                    gogo<div>soso</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    ),
    sideMenuContent: [
      {
        name: "View Profile",
        action: () => {
          console.log("Viewing profile 2...");
        }
      },
      {
        name: "Edit",
        action: () => {
          console.log("Editing 2...");
        }
      },
      { name: "Re-Invite", action: () => console.log("Re-inviting 2...") },
      { name: "Suspend User", action: () => console.log("Suspending 2...") },
      { name: "Block User", action: () => console.log("Blocking 2...") },
      {
        name: "Send Change Pasword",
        action: () => console.log("Change pass 3...")
      }
    ],
    type: "S",
    id: 5531,
    name: "Ivan Morais",
    nameAndEmailOutput: tablenameInput("Ivan Morais", "popo@gmail.com"),
    org: "Mango",
    projects: 15,
    status: "Active"
  },
  {
    isSelected: false,
    expandContent: <div>Expand Content 3</div>,
    sideMenuContent: [
      {
        name: "View Profile",
        action: () => {
          console.log("Viewing profile 3...");
        }
      },
      {
        name: "Edit",
        action: () => {
          console.log("Editing 3...");
        }
      },
      { name: "Re-Invite", action: () => console.log("Re-inviting 3...") },
      { name: "Suspend User", action: () => console.log("Suspending 3...") },
      { name: "Block User", action: () => console.log("Blocking 3...") },
      {
        name: "Send Change Pasword",
        action: () => console.log("Change pass 3...")
      }
    ],
    type: "P",
    id: 5533,
    name: "Dominik Doudny",
    nameAndEmailOutput: tablenameInput("Dominik Doudny", "popo@gmail.com"),
    org: "Facebook",
    projects: 6,
    status: "Active"
  },
  {
    isSelected: false,
    expandContent: <div>Expand Content 4</div>,
    sideMenuContent: [
      {
        name: "View Profile",
        action: () => {
          console.log("Viewing profile 4...");
        }
      },
      {
        name: "Edit",
        action: () => {
          console.log("Editing 4...");
        }
      },
      { name: "Re-Invite", action: () => console.log("Re-inviting 4...") },
      { name: "Suspend User", action: () => console.log("Suspending 4...") },
      { name: "Block User", action: () => console.log("Blocking 4...") },
      {
        name: "Send Change Pasword",
        action: () => console.log("Change pass 4...")
      }
    ],
    type: "P",
    id: 5534,
    name: "Mike Adams",
    nameAndEmailOutput: tablenameInput("Mike Adams", "popo@gmail.com"),
    org: "CyberArk",
    projects: 6,
    status: "Active"
  }
];

const rowCountOptions = [
  { value: 2, label: "2" },
  { value: 3, label: "3" },
  { value: 4, label: "4" }
];

function log(x) {
  console.log("sleceted", x);
}

function sortNameColumnBy(data, sortOrder) {
  return orderBy(data, "name", sortOrder);
}

storiesOf("Table", module)
  .addDecorator(withKnobs)
  .add("Default", () => (
    <div className="app">
      <Table
        columns={columns}
        data={data}
        selectKey="isSelected"
        onSelected={log}
        expandKey="expandContent"
        sideMenuKey="sideMenuContent"
        rowCountDefault={2}
        rowCountOptions={rowCountOptions}
      ></Table>
    </div>
  ));
