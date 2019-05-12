import React from "react";
import styled from "styled-components";
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

class CalendarComponent extends React.Component {
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
    const { className, flat } = this.props;
    return (
      <div
        className={className}
        style={{ boxShadow: flat ? "none" : "0 2px 10px 0 rgba(0, 0, 0, 0.1)" }}
      >
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

const Calendar = styled(CalendarComponent)`
  max-width: 337px;
  min-height: 271px;
  background: #ffffff;
  border-radius: 4px;
  padding: 5px;
  overflow: hidden;
  .current-month {
    font-size: 1rem;
    font-weight: bold;
  }
  .calendar-header {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  }
  .header-date {
    flex: 3;
  }
  .prev-next-icon {
    display: flex;
    flex: 1;
    flex-direction: row;
    justify-content: flex-end;
  }
  .prev-next-icon img {
    margin: 0 5px;
    width: 24px;
    height: 24px;
  }
  .calendar-body {
    margin-top: 25px;
    display: flex;
    flex-direction: column;
    align-items: center;
    overflow-x: hidden;
  }
  .monthsWrapper {
    display: flex;
    flex-direction: row;
    transition: transform 0s linear;
    will-change: transform;
    transform: translateX(0px);
  }
  .monthsWrapper.nxt {
    transition: transform 0.3s linear;
    transform: translateX(336px);
  }
  .monthsWrapper.prev {
    transition: transform 0.3s linear;
    transform: translateX(-336px);
  }
  .row {
    padding: 8px 0;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    width: 100%;
  }
  .col {
    flex-grow: 1;
    flex-basis: 0;
    max-width: 100%;
  }
  .rows-wrapper {
    flex-shrink: 0;
    overflow: auto;
  }
  .days-wrapper,
  .row-wrapper {
    display: flex;
    flex-direction: row;
    align-items: center;
  }
  .row-wrapper {
    padding: 8px 0;
    position: relative;
    z-index: 0;
  }
  .days-wrapper .number .days,
  .cell {
    /* margin: 8px 15px; */
    font-size: 0.9rem;
    color: #c2c3c8;
  }
  .days:first-child {
    margin-left: 0;
  }
  .days:last-child {
    margin-right: 0;
  }
  .number {
    width: 32px;
    height: 32px;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 0 8px;
    cursor: pointer;
  }
  .number .days {
    display: block;
    font-size: 0.9rem;
    color: #343949;
    line-height: 1;
    cursor: pointer;
  }
  .disabled .days {
    color: #d4d5d8;
    cursor: default;
  }
  .number.sick.pending {
    background-color: #e24381;
    border-radius: 24px;
    position: relative;
    /* z-index: 10; */
  }
  .number.sick.passed {
    border: 1px solid #e24381;
    border-radius: 24px;
    position: relative;
    /* z-index: 10; */
  }
  .number.sick.pending .days {
    color: #ffffff;
    /* margin-right: 15px; */
  }
  .number.sick.pending + .number.sick.pending:before {
    content: "";
    position: absolute;
    z-index: -1;
    background: inherit;
    top: 0;
    bottom: 0;
    left: -95%;
    right: 50%;
  }
  .number.vacation.pending {
    background-color: #976fed;
    border-radius: 24px;
    position: relative;
    /* z-index: 10; */
  }
  .number.vacation.passed {
    border: 1px solid #976fed;
    border-radius: 24px;
    position: relative;
    /* z-index: 10; */
  }
  .number.vacation.pending .days {
    color: #ffffff;
    /* margin-right: 15px; */
  }
  .number.vacation.pending + .number.vacation.pending:before {
    content: "";
    position: absolute;
    z-index: -1;
    background: inherit;
    top: 0;
    bottom: 0;
    left: -95%;
    right: 50%;
  }
  .slideinltr-enter {
    opacity: 0;
    transform: translateX(-336px);
  }
  .slideinltr-enter-active {
    opacity: 1;
    transition: transform 1s linear;
    transform: translate(0, 0);
    transform: translate3d(0, 0, 0);
    transition-property: transform, opacity;
    transition-duration: 300ms;
    transition-timing-function: cubic-bezier(0.175, 0.665, 0.32, 1), linear;
  }
  .slideinrtl-enter {
    opacity: 0;
    transform: translateX(336px);
  }
  .slideinrtl-enter-active {
    opacity: 1;
    transition: transform 1s linear;
    transform: translate(0, 0);
    transform: translate3d(0, 0, 0);
    transition-property: transform, opacity;
    transition-duration: 300ms;
    transition-timing-function: cubic-bezier(0.175, 0.665, 0.32, 1), linear;
  }
`;

export default Calendar;
