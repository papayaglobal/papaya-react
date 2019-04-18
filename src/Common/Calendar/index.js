import React from "react";
import {
  format,
  startOfWeek,
  startOfMonth,
  endOfMonth,
  endOfWeek,
  isSameMonth,
  isSameDay,
  addDays,
  addMonths,
  subMonths,
  toDate,
  isBefore,
  isAfter
} from "date-fns";

import prevIcon from "../../assets/icons/prev-circle.svg";
import nextIcon from "../../assets/icons/next-circle.svg";

import "./index.css";

export default class Calendar extends React.Component {
  state = {
    currentMonth: new Date(),
    selectedDate: new Date(),
    sickLeave: [
      "2019/04/01",
      "2019/04/07",
      "2019/04/15",
      "2019/04/16",
      "2019/04/17",
      "2019/04/18",
      "2019/04/19",
      "2019/05/20"
    ],
    vacationLeave: ["2019/04/03", "2019/04/12", "2019/04/26", "2019/04/27", "2019/04/28"]
  };
  componentDidMount() {}
  renderHeading = () => {
    const { currentMonth } = this.state;
    const dateFormat = "MMMM, yyyy";
    return (
      <div className="calendar-header">
        <div className="header-date">
          <span className="current-month">{format(currentMonth, dateFormat)}</span>
        </div>
        <div className="prev-next-icon">
          <img src={prevIcon} alt="Previous" onClick={() => this.previousMonth()} />
          <img src={nextIcon} alt="Next" onClick={() => this.nextMonth()} />
        </div>
      </div>
    );
  };
  renderBody = () => {
    const days = ["M", "T", "W", "T", "F", "S", "S"];
    const d = [];
    for (let i in days) {
      d.push(
        <div className="number">
          <div className="days" key={i}>
            {days[i]}
          </div>
        </div>
      );
    }
    return <div className="days-wrapper">{d}</div>;
  };
  renderCells = () => {
    const { currentMonth, selectedDate } = this.state;
    const monthStart = startOfMonth(currentMonth);
    const monthEnd = endOfMonth(monthStart);
    const startDate = startOfWeek(monthStart, { weekStartsOn: 1 });
    const endDate = endOfWeek(monthEnd);
    const dateFormat = "d";
    const rows = [];

    let days = [];
    let day = startDate;
    let formattedDate = "";

    while (day <= endDate) {
      for (let i = 0; i < 7; i++) {
        formattedDate = format(day, dateFormat);
        const cloneDay = day;
        days.push(
          <div
            className={`number ${
              !isSameMonth(day, monthStart)
                ? "disabled"
                : this.isSickLeave(day)
                ? this.isSickLeave(day)
                : this.isVacationLeave(day)
                ? this.isVacationLeave(day)
                : ""
            }`}
            key={day}
            onClick={() => this.onDateClick(toDate(cloneDay))}
          >
            <div className="days">{formattedDate}</div>
          </div>
        );
        day = addDays(day, 1);
      }
      rows.push(
        <div className="row-wrapper" key={day}>
          {days}
        </div>
      );
      // console.log("Days: ", rows);
      days = [];
    }
    return rows;
  };
  isSickLeave = day => {
    const { sickLeave } = this.state;
    // console.log("Day: ", format(new Date(sickLeave[0]), ));
    for (let i in sickLeave) {
      if (isSameDay(new Date(day), new Date(sickLeave[i]))) {
        if (isSameDay(new Date(sickLeave[i]), new Date())) {
          return "sick planned";
        } else if (isAfter(new Date(sickLeave[i]), new Date())) {
          return "sick pending";
        } else if (isBefore(new Date(sickLeave[i]), new Date())) {
          return "sick passed";
        } else {
          return "";
        }
      }
    }
  };
  isVacationLeave = day => {
    const { vacationLeave } = this.state;
    // console.log("Day: ", format(new Date(vacationLeave[0]), ));
    for (let i in vacationLeave) {
      if (isSameDay(new Date(day), new Date(vacationLeave[i]))) {
        if (isSameDay(new Date(vacationLeave[i]), new Date())) {
          return "vacation planned";
        } else if (isAfter(new Date(vacationLeave[i]), new Date())) {
          return "vacation pending";
        } else if (isBefore(new Date(vacationLeave[i]), new Date())) {
          return "vacation passed";
        } else {
          return "";
        }
      }
    }
  };
  onDateClick = day => {
    console.log("Clicked: ", day);
  };
  nextMonth = () => {
    this.setState({
      currentMonth: addMonths(this.state.currentMonth, 1)
    });
  };
  previousMonth = () => {
    this.setState({
      currentMonth: subMonths(this.state.currentMonth, 1)
    });
  };
  render() {
    return (
      <div className="calendar-wrapper">
        {this.renderHeading()}
        <div className="calendar-body">
          {this.renderBody()}
          <div className="rows-wrapper">{this.renderCells()}</div>
        </div>
      </div>
    );
  }
}
