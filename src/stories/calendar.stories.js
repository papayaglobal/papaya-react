import React from "react";
import { storiesOf } from "@storybook/react";
import { withKnobs, text, number, array, boolean, object } from "@storybook/addon-knobs";

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
          weekStartsOn={text("weekStartsOn", "sunday")}
          currentPeriod={object("currentPeriod", {
              start: "2019/11/01",
              end: "2019/11/30"
          })}
        vacationLeaves={array("vacationLeaves", [
          "2019/10/03",
          "2019/11/04",
          "2019/11/10",
          "2019/11/26",
          "2019/11/27",
          "2019/11/28",
          "2019/11/29",
          "2019/11/30",
          "2019/12/05",
          "2019/12/06",
          "2019/12/07",
          "2019/12/10",
        ])}
        sickLeaves={array("sickLeaves", [
          "2019/10/12",
          "2019/10/13",
          "2019/10/14",
          "2019/11/05",
          "2019/11/06",
          "2019/11/07",
          "2019/12/02",
          "2019/12/13",
          "2019/12/14",
          "2019/12/15",
        ])}
      />
    </div>
  ));
