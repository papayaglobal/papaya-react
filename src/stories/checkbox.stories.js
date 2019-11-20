import React from "react";
import {storiesOf} from "@storybook/react";
import {withKnobs} from "@storybook/addon-knobs";
import {action} from "@storybook/addon-actions";


import "./stories.css";
import {CheckBox} from "Common/Checkbox";

export const actions = {
    onClick: action("onClick")
};

storiesOf("CheckBox", module)
    .addDecorator(withKnobs)
    .add("Default", () => (
        <div className="app">
            <CheckBox {...actions} />
        </div>
    ));
