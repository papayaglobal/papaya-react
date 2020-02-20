import React from "react";
import { storiesOf } from "@storybook/react";
import { withKnobs } from "@storybook/addon-knobs";
import { action } from "@storybook/addon-actions";
import { orderBy, times } from "lodash";

import "./stories.css";
import Table from "../Common/Table";

export const actions = {
  onClick: action("onClick")
};

const getExpandContent = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(<div>Lazy Expand Content</div>);
    }, 2500);
  });
};

const defaultSideMenu = [
  {
    name: "View Profile",
    action: context => {
      console.log(context, "Viewing profile...");
    }
  },
  {
    name: "Edit",
    action: context => {
      console.log(context, "Editing...");
    }
  },
  {
    name: "Re-Invite",
    action: context => console.log(context, "Re-inviting...")
  },
  {
    name: "Suspend User",
    action: context => console.log(context, "Suspending...")
  },
  {
    name: "Block User",
    action: context => console.log(context, "Blocking...")
  },
  {
    name: "Send Change Pasword",
    action: context => console.log(context, "Change pass...")
  }
];

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
    expandContentLazy: getExpandContent,
    type: "P",
    id: 5532,
    name: "Frank Boehm",
    nameAndEmailOutput: tablenameInput("Frank Boehm", "popo@gmail.com"),
    org: "Blue Eagle",
    projects: 3,
    status: "Active",
    sideMenuContent: [
      {
        name: "Avi",
        action: () => console.log("my own action!")
      },
      {
        name: "Itay",
        action: context => console.log("we use the row context!", context)
      }
    ]
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
    type: "P",
    id: 5534,
    name: "Mike Adams",
    nameAndEmailOutput: tablenameInput("Mike Adams", "popo@gmail.com"),
    org: "CyberArk",
    projects: 6,
    status: "Active"
  },
  ...times(101, () => {
    return {
      isSelected: false,
      expandContentLazy: getExpandContent,
      type: "P",
      id: 5534,
      name: "Mike Adams",
      nameAndEmailOutput: tablenameInput("Mike Adams", "popo@gmail.com"),
      org: "CyberArk",
      projects: 6,
      status: "Active"
    };
  })
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
        selectable
        onSelected={log}
        expandable
        lazyExpand={getExpandContent}
        sideMenu
        defaultSideMenu={defaultSideMenu}
        rowCountDefault={2}
        rowCountOptions={rowCountOptions}
      ></Table>
    </div>
  ))
  .add("LazyLoad", () => {
    const loadData = event => {
      console.log(event);
      return data.slice(event.first, event.rowCount + event.first);
    };
    return (
      <div className="app">
        <Table
          columns={columns}
          data={data.slice(0, 2)}
          selectable
          onSelected={log}
          expandable
          lazyExpand={getExpandContent}
          sideMenu
          defaultSideMenu={defaultSideMenu}
          rowCountDefault={2}
          rowCountOptions={rowCountOptions}
          onLazyLoad={loadData}
          totalRows={data.length}
        ></Table>
      </div>
    );
  });
