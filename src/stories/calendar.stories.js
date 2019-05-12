import React from "react";
import { storiesOf } from "@storybook/react";
import { withKnobs, text, number, array, boolean } from "@storybook/addon-knobs";

import Calendar from "../Common/Calendar";

import "./stories.css";

storiesOf("Calendar", module)
  .addDecorator(withKnobs)
  .add("Default", () => (
    <div className="app calendar">
      <Calendar flat={boolean("flat", true)} />
    </div>
  ))
  .add("With Vacation Leaves", () => (
    <div className="app calendar">
      <Calendar
        vacationLeaves={array("vacationLeaves", [
          "2019/04/03",
          "2019/04/12",
          "2019/04/26",
          "2019/04/27",
          "2019/04/28"
        ])}
      />
    </div>
  ))
  .add("With Sick Leaves", () => (
    <div className="app calendar">
      <Calendar
        sickLeaves={array("sickLeaves", [
          "2019/04/03",
          "2019/04/12",
          "2019/04/26",
          "2019/04/27",
          "2019/04/28"
        ])}
      />
    </div>
  ))
  .add("With Sick and Vacation Leaves", () => (
    <div className="app calendar">
      <Calendar
        vacationLeaves={array("vacationLeaves", [
          "2019/04/03",
          "2019/04/04",
          "2019/04/26",
          "2019/04/29",
          "2019/04/30",
          "2019/05/04",
          "2019/05/05",
          "2019/05/06"
        ])}
        sickLeaves={array("sickLeaves", [
          "2019/04/12",
          "2019/04/26",
          "2019/04/27",
          "2019/04/28",
          "2019/05/09",
          "2019/05/10",
          "2019/05/11",
          "2019/05/12"
        ])}
      />
    </div>
  ));
