import React from "react";
import { storiesOf } from "@storybook/react";
import { text, withKnobs } from "@storybook/addon-knobs";
import { action } from "@storybook/addon-actions";
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

const onClick = action("OnClick");

storiesOf("Menu Content Item", module)
    .addDecorator(withKnobs)
    .add("Default", () => (
        <Router>
            <div className="app">
                <MenuContentItem list={list} onClickItem={onClick} active updateActiveItem={() => action("updateActiveItem")} />
            </div>
        </Router>
    ));
