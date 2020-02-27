import React from "react";
import { storiesOf } from "@storybook/react";
import { text, withKnobs } from "@storybook/addon-knobs";

import { BrowserRouter as Router } from "react-router-dom";
import { ReactComponent as Dashboard } from "../assets/icons/Dashboard.svg";
import MenuContent from "../Common/MenuContent";

import "./stories.css";

const lists = [
  {
    listName: { output: "User Managment", link: "/rolesAndPermissions" },
    icon: <Dashboard />,
    links: [
      { output: "Roles & Permissions", link: "/rolesAndPermissions" },
      { output: "Platform Users", link: "/platformUsers" }
    ]
  },
  {
    listName: { output: "Data Tables", link: "" },
    icon: <Dashboard />,
    links: [
      { output: "Roles & Permissions", link: "/rolesAndPermissions" },
      { output: "Platform Users", link: "/platformUsers" }
    ]
  },
  {
    listName: { output: "Reports", link: "" },
    icon: <Dashboard />,
    links: [
      { output: "Roles & Permissions", link: "/rolesAndPermissions" },
      { output: "Platform Users", link: "/platformUsers" }
    ]
  },
  {
    listName: { output: "Notifications", link: "" },
    icon: <Dashboard />,
    links: [
      { output: "Roles & Permissions", link: "/rolesAndPermissions" },
      { output: "Platform Users", link: "/platformUsers" }
    ]
  },
  {
    listName: { output: "WorkFlows", link: "" },
    icon: <Dashboard />,
    links: [
      { output: "Roles & Permissions", link: "/rolesAndPermissions" },
      { output: "Platform Users", link: "/platformUsers" }
    ]
  },
  {
    listName: { output: "Integrations", link: "" },
    icon: <Dashboard />,
    links: [
      { output: "Roles & Permissions", link: "/rolesAndPermissions" },
      { output: "Platform Users", link: "/platformUsers" }
    ]
  },
  {
    listName: { output: "Configurations", link: "" },
    icon: <Dashboard />,
    links: [
      { output: "Roles & Permissions", link: "/rolesAndPermissions" },
      { output: "Platform Users", link: "/platformUsers" }
    ]
  }
];

storiesOf("Menu Content", module)
  .addDecorator(withKnobs)
  .add("Default", () => (
    <Router>
      <div className="app">
        <MenuContent lists={lists} />
      </div>
    </Router>
  ));
