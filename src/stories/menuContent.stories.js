import React from "react";
import { storiesOf } from "@storybook/react";
import { withKnobs } from "@storybook/addon-knobs";
import { action } from "@storybook/addon-actions";
import { BrowserRouter as Router } from "react-router-dom";
import { ReactComponent as Dashboard } from "../assets/icons/Dashboard.svg";
import MenuContent from "../Common/MenuContent";

import "./stories.css";

const lists = [
    {
        listName: { output: "User Managment", link: "/rolesAndPermissions" },
        icon: <Dashboard />
    },
    {
        listName: { output: "Data Tables", link: "" },
        icon: <Dashboard />,
        links: [
            { output: "Popo", link: "/popo" },
            { output: "Momo", link: "/momo" }
        ]
    },
    {
        listName: { output: "Reports", link: "" },
        icon: <Dashboard />,
        links: [
            { output: "Toto", link: "/toto" },
            { output: "Dodo", link: "/dodo" }
        ]
    },
    {
        listName: { output: "Notifications", link: "" },
        icon: <Dashboard />,
        links: [
            { output: "Koko", link: "/koko" },
            { output: "Lolo", link: "/lolo" }
        ]
    },
    {
        listName: { output: "WorkFlows", link: "" },
        icon: <Dashboard />,
        links: [
            { output: "Soso", link: "/soso" },
            { output: "Coco", link: "/coco" }
        ]
    },
    {
        listName: { output: "Integrations", link: "" },
        icon: <Dashboard />,
        links: [
            { output: "Jojo", link: "/jojo" },
            { output: "Yoyo", link: "/yoyo" }
        ]
    },
    {
        listName: { output: "Configurations", link: "" },
        icon: <Dashboard />,
        links: [
            { output: "Roro", link: "/roro" },
            { output: "Wowo", link: "/wowo" }
        ]
    }
];

const onClick = action("OnClick");

storiesOf("Menu Content", module)
    .addDecorator(withKnobs)
    .add("Default", () => (
        <Router>
            <div className="app">
                <MenuContent lists={lists} onClickItem={onClick} />
            </div>
        </Router>
    ));
