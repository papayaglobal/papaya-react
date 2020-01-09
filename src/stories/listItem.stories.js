import React from "react";
import {storiesOf} from "@storybook/react";
import {INITIAL_VIEWPORTS} from "@storybook/addon-viewport";
import {withKnobs} from "@storybook/addon-knobs";
import ListItem from "../Common/ListItem";

storiesOf("List item", module)
    .addParameters({viewport: {viewports: INITIAL_VIEWPORTS}})
    .addDecorator(withKnobs)
    .add("iphone6", () => (
        <div className="app attachment">
            <ListItem
                onClick={() => alert("onListItem click")}
                name={"myItemName"}
                onCloseClick={() => alert("onClose ListItem")}
            />
        </div>
    ), {viewport: {defaultViewport: "iphone6"}})
    .add("desktop", () => (
        <div className="app attachment">
            <ListItem
                onClick={() => alert("onListItem click")}
                name={"myItemName"}
                onCloseClick={() => alert("onClose ListItem")}
            />
        </div>
    ), {viewport: {defaultViewport: "responsive"}});
