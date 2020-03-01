import React from "react";
import { storiesOf } from "@storybook/react";
import { text, withKnobs } from "@storybook/addon-knobs";
import { BrowserRouter as Router } from "react-router-dom";

import { ReactComponent as Dashboard } from "../assets/icons/Dashboard.svg";
import MenuContentItem from "../Common/MenuContentItem";

import "./stories.css";

const list = {
  listName: { output: "User Managment", link: "" },
  icon: <Dashboard />,
  links: [
    { output: "Roles & Permissions", link: "/rolesAndPermissions" },
    { output: "Platform Users", link: "/platformUsers" }
  ]
};

storiesOf("Menu Content Item", module)
  .addDecorator(withKnobs)
  .add("Default", () => (
    <Router>
      <div className="app">
        <MenuContentItem list={list} />
      </div>
    </Router>
  ));
