import React from "react";
import { storiesOf } from "@storybook/react";
import { withKnobs } from "@storybook/addon-knobs";
import { action } from "@storybook/addon-actions";

import Switch from "../Common/Switch";

import "./stories.css";

export const actions = {
    onChange: action("onChange")
};

storiesOf("Switch", module)
    .addDecorator(withKnobs)
    .add("Default", () => (
        <div className='app'>
            <Switch {...actions} />
        </div>
    ))
    .add("Enabled by default", () => (
        <div className='app'>
            <Switch {...actions} checked />
        </div>
    ));
