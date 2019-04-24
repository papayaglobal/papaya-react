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
  componentDidMount() {}
  renderHeading = () => {
    const { currentMonth, animate, direction } = this.state;
    const dateFormat = "MMMM, yyyy";
    return (
      <div className="calendar-header">
        <CSSTransition
          in={animate}
          timeout={200}
          classNames={{ enter: `${direction === "ltr" ? "slideinltr-enter" : "slideinrtl-enter"}`, enterActive: `${direction === "ltr" ? "slideinltr-enter-active" : "slideinrtl-enter-active"}` }}
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
    // console.log("Day: ", format(new Date(vacationLeaves[0]), ));
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
  };
  previousMonth = () => {
    this.setState({
      currentMonth: subMonths(this.state.currentMonth, 1),
      animate: true,
      direction: "rtl"
    });
  };
  render() {
    const { animate, direction } = this.state;
    return (
      <div className="calendar-wrapper">
        {this.renderHeading()}
        <CSSTransition
          in={animate}
          timeout={200}
          classNames={{ enter: `${direction === "ltr" ? "slideinltr-enter" : "slideinrtl-enter"}`, enterActive: `${direction === "ltr" ? "slideinltr-enter-active" : "slideinrtl-enter-active"}` }}
          onEntered={() => this.setState({ animate: false })}
        >
          <div className="calendar-body">
            {this.renderBody()}
            <div className="rows-wrapper">{this.renderCells()}</div>
          </div>
        </CSSTransition>
      </div>
    );
  }
}
