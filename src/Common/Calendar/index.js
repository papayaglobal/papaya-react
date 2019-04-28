import React from "react";
import { CSSTransition } from "react-transition-group";
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
    previousMonth: null,
    nextMonth: null,
    selectedDate: new Date(),
    animate: false,
    sickLeave: [
      "2019/04/01",
      "2019/04/07",
      "2019/04/18",
      "2019/04/19",
      "2019/05/02",
      "2019/05/03",
      "2019/05/04",
      "2019/05/20"
    ],
    vacations: ["2019/04/03", "2019/04/12", "2019/04/26", "2019/04/27", "2019/04/28"],
    direction: ""
  };
  componentDidMount() {
    this.changeMonth();
  }
  changeMonth = () => {
    const { currentMonth } = this.state;
    const previousMonth = subMonths(currentMonth, 1);
    const nextMonth = addMonths(currentMonth, 1);

    this.setState({
      previousMonth,
      nextMonth
    });
    setTimeout(() => {
      this.setState({
        direction: ""
      });
    }, 300);
  };
  renderHeading = () => {
    const { currentMonth, animate, direction } = this.state;
    const dateFormat = "MMMM, yyyy";
    return (
      <div className="calendar-header">
        <CSSTransition
          in={animate}
          timeout={200}
          classNames={{
            enter: `${direction === "ltr" ? "slideinltr-enter" : "slideinrtl-enter"}`,
            enterActive: `${
              direction === "ltr" ? "slideinltr-enter-active" : "slideinrtl-enter-active"
            }`
          }}
          onEntered={() => this.setState({ animate: false })}
        >
          <div className="header-date">
            <span className="current-month">{format(currentMonth, dateFormat)}</span>
          </div>
        </CSSTransition>
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
        <div className="number" key={i}>
          <div className="days">{days[i]}</div>
        </div>
      );
    }
    return <div className="days-wrapper">{d}</div>;
  };
  renderCells = () => {
    const { currentMonth } = this.state;
    const monthStart = startOfMonth(currentMonth, { weekStartsOn: 1 });
    const monthEnd = endOfMonth(monthStart, { weekStartsOn: 1 });
    const startDate = startOfWeek(monthStart, { weekStartsOn: 1 });
    const endDate = endOfWeek(monthEnd, { weekStartsOn: 1 });
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
      days = [];
    }
    return rows;
  };
  renderNextMonth = () => {
    const { nextMonth } = this.state;
    const monthStart = startOfMonth(nextMonth, { weekStartsOn: 1 });
    const monthEnd = endOfMonth(monthStart, { weekStartsOn: 1 });
    const startDate = startOfWeek(monthStart, { weekStartsOn: 1 });
    const endDate = endOfWeek(monthEnd, { weekStartsOn: 1 });
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
  renderPreviousMonth = () => {
    const { previousMonth } = this.state;
    const monthStart = startOfMonth(previousMonth, { weekStartsOn: 1 });
    const monthEnd = endOfMonth(monthStart, { weekStartsOn: 1 });
    const startDate = startOfWeek(monthStart, { weekStartsOn: 1 });
    const endDate = endOfWeek(monthEnd, { weekStartsOn: 1 });
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
    const { sickLeaves } = this.props;
    // console.log("Day: ", format(new Date(sickLeaves[0]), ));
    for (let i in sickLeaves) {
      if (isSameDay(new Date(day), new Date(sickLeaves[i]))) {
        if (isSameDay(new Date(sickLeaves[i]), new Date())) {
          return "sick planned";
        } else if (isAfter(new Date(sickLeaves[i]), new Date())) {
          return "sick pending";
        } else if (isBefore(new Date(sickLeaves[i]), new Date())) {
          return "sick passed";
        } else {
          return "";
        }
      }
    }
  };
  isVacationLeave = day => {
    const { vacationLeaves } = this.props;
    for (let i in vacationLeaves) {
      if (isSameDay(new Date(day), new Date(vacationLeaves[i]))) {
        if (isSameDay(new Date(vacationLeaves[i]), new Date())) {
          return "vacation planned";
        } else if (isAfter(new Date(vacationLeaves[i]), new Date())) {
          return "vacation pending";
        } else if (isBefore(new Date(vacationLeaves[i]), new Date())) {
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
      currentMonth: addMonths(this.state.currentMonth, 1),
      animate: true,
      direction: "ltr"
    });
    this.changeMonth();
  };
  previousMonth = () => {
    this.setState({
      currentMonth: subMonths(this.state.currentMonth, 1),
      animate: true,
      direction: "rtl"
    });
    this.changeMonth();
  };
  render() {
    const { direction } = this.state;
    return (
      <div className="calendar-wrapper">
        {this.renderHeading()}

        <div className="calendar-body">
          {this.renderBody()}
          <div
            className={
              direction === "ltr"
                ? "monthsWrapper nxt"
                : direction === "rtl"
                ? "monthsWrapper prev"
                : "monthsWrapper"
            }
          >
            <div className="rows-wrapper previous">{this.renderPreviousMonth()}</div>
            <div className="rows-wrapper">{this.renderCells()}</div>
            <div className="rows-wrapper next">{this.renderNextMonth()}</div>
          </div>
        </div>
      </div>
    );
  }
}
