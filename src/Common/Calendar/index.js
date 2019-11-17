import React from "react";
import PropTypes from 'prop-types';
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
    sickLeave: [],
    vacations: [],
    direction: ""
  };

  componentDidMount() {
    this.changeMonth();
  }

  changeMonth = () => {
    const { currentMonth } = this.state;
    const previousMonth = subMonths(currentMonth, 1);
    const nextMonth = addMonths(currentMonth, 1);

    this.setState({ previousMonth, nextMonth });
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
    const {weekStartsOn} = this.props;
    const days = weekStartsOn === "sunday" ? ["S", "M", "T", "W", "T", "F", "S"] : ["M", "T", "W", "T", "F", "S", "S"];
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

  renderCells = ({month}) => {
    const {weekStartsOn: startWeekConfig} = this.props;
    const weekStartsOn = startWeekConfig === "sunday" ? 0 : 1;

    const monthStart = startOfMonth(month);
    const monthEnd = endOfMonth(monthStart);
    const startDate = startOfWeek(monthStart, { weekStartsOn });
    const endDate = endOfWeek(monthEnd, { weekStartsOn });
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
            className={`number ${this.getDayStatus({day, monthStart})}`}
            key={day}
            onClick={() => this.props.onDateClick(toDate(cloneDay))}
          >
            <div className="days">{formattedDate}</div>
          </div>
        );
        day = addDays(day, 1);
      }
      rows.push(<div className="row-wrapper" key={day}> {days} </div>);
      days = [];
    }
    return rows;
  };

  getDayStatus = ({day, monthStart}) => {
    const isCurrentPeriod = this.isCurrentPeriod({day});
    const isSickLeave = this.isSickLeave({day});
    const isVacationLeave = this.isVacationLeave({day});

    const isDayBelongsToMonth = isSameMonth(day, monthStart);

    // if ( !isCurrentPeriod) {
    //   return "disabled";
    // }

    if (!!isSickLeave) {
      return `${isDayBelongsToMonth ? "" : "disabled"} ${isSickLeave}`;
    }

    if (!!isVacationLeave) {
      return `${isDayBelongsToMonth ? "" : "disabled"} ${isVacationLeave}`;
    }

    return `${isDayBelongsToMonth ? "" : "disabled"}`;
  };

  isCurrentPeriod = ({day}) => {
    const {currentPeriod: {start, end}} = this.props;
    const startDate = new Date(start);
    const endDate = new Date(end);
    return (isAfter(day, startDate) || isSameDay(day, startDate)) && (isBefore(day, endDate) || isSameDay(day, endDate))
  };

  isSickLeave = ({day}) => {
    const {sickLeaves, currentPeriod: {start, end}} = this.props;

    const periodStartDay = new Date(start);
    const periodEndDay = new Date(end);

    for (let i in sickLeaves) {
      const currentDay = new Date(sickLeaves[i]);

      if (isSameDay(day, currentDay)) {
        // if (isSameDay(currentDay, new Date())) {
        //   return "sick planned";
        // } else
        if ( this.isCurrentPeriod({day})) {
          return "sick currentPeriod";
        } else if (isBefore(currentDay, periodEndDay) || isSameDay(currentDay, periodEndDay)) {
          return "sick oldPeriod";
        } else if (isAfter(currentDay, periodEndDay)) {
          return "sick futurePeriod";
        } else {
          return "";
        }
      }
    }
  };

  isVacationLeave = ({day}) => {
    const {vacationLeaves, currentPeriod: {start, end}} = this.props;

    const periodStartDay = new Date(start);
    const periodEndDay = new Date(end);

    for (let i in vacationLeaves) {
      const currentDay = new Date(vacationLeaves[i]);

      if (isSameDay(day, currentDay)) {
        // if (isSameDay(currentDay, new Date())) {
        //   return "vacation planned";
        // } else
        if ( this.isCurrentPeriod({day})) {
          return "vacation currentPeriod";
        } else if (isBefore(currentDay, periodEndDay) || isSameDay(currentDay, periodEndDay)) {
          return "vacation oldPeriod";
        } else if (isAfter(currentDay, periodEndDay)) {
          return "vacation futurePeriod";
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
    const { direction, previousMonth, currentMonth, nextMonth } = this.state;
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
            <div className="rows-wrapper previous">{this.renderCells({month: previousMonth})}</div>
            <div className="rows-wrapper">{this.renderCells({month: currentMonth})}</div>
            <div className="rows-wrapper next">{this.renderCells({month: nextMonth})}</div>
          </div>
        </div>
      </div>
    );
  }
}

CalendarComponent.propTypes = {
  vacationLeaves: PropTypes.array,
  sickLeaves: PropTypes.array,
  weekStartsOn: PropTypes.string,
  currentPeriod: PropTypes.shape({
    start: PropTypes.string,
    end: PropTypes.string
  }),
};
CalendarComponent.defaultProps = {
  weekStartsOn: 'sunday'
};

const Calendar = styled(CalendarComponent)`
  max-width: 337px;
  min-height: 320px;
  background: #ffffff;
  border-radius: 4px;
  padding: 5px;
  margin: 0 auto;
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
    padding-left: 10px;
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
    cursor: pointer;
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
    transition: transform 0.8s linear;
    transform: translateX(336px);
  }
  .monthsWrapper.prev {
    transition: transform 0.8s linear;
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
    padding: 3px 0;
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
  .number:hover {
    background-color: #f2f3f5;
    border-radius: 16px;
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
  .number.sick.currentPeriod {
    background-color: #e24381;
    border-radius: 24px;
    position: relative;
    /* z-index: 10; */
  }
  .number.sick.oldPeriod {
    border: 1px solid #e24381;
    border-radius: 24px;
    position: relative;
    /* z-index: 10; */
  }
  .number.sick.currentPeriod .days {
    color: #ffffff;
  }
  .number.sick.currentPeriod + .number.sick.currentPeriod:before {
    content: "";
    position: absolute;
    z-index: -1;
    background: inherit;
    top: 0;
    bottom: 0;
    left: -95%;
    right: 50%;
  }
  .number.sick.futurePeriod {
    background-color: #ED93B5;
    border-radius: 24px;
    position: relative;
  }
  .number.sick.futurePeriod .days {
    color: #ffffff;
  }
  .number.sick.futurePeriod + .number.sick.futurePeriod:before {
    content: "";
    position: absolute;
    z-index: -1;
    background: inherit;
    top: 0;
    bottom: 0;
    left: -95%;
    right: 50%;
  }

  .number.vacation.oldPeriod {
    border: 1px solid #976fed;
    border-radius: 24px;
    position: relative;
    /* z-index: 10; */
  }
  
  .number.vacation.currentPeriod {
    background-color: #976fed;
    border-radius: 24px;
    position: relative;
    /* z-index: 10; */
  }
  .number.vacation.currentPeriod .days {
    color: #ffffff;
    /* margin-right: 15px; */
  }
  .number.vacation.currentPeriod + .number.vacation.currentPeriod:before {
    content: "";
    position: absolute;
    z-index: -1;
    background: inherit;
    top: 0;
    bottom: 0;
    left: -95%;
    right: 50%;
  }
  
  .number.vacation.futurePeriod {
    background-color: #D5C5F7;
    border-radius: 24px;
    position: relative;
  }
  .number.vacation.futurePeriod .days {
    color: #ffffff;
  }
  .number.vacation.futurePeriod + .number.vacation.futurePeriod:before {
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
    transition: transform 3s linear;
    transform: translate(0, 0);
    transform: translate3d(0, 0, 0);
    transition-property: transform, opacity;
    transition-duration: 800ms;
    transition-timing-function: cubic-bezier(0.175, 0.665, 0.32, 1), linear;
  }
  .slideinrtl-enter {
    opacity: 0;
    transform: translateX(336px);
  }
  .slideinrtl-enter-active {
    opacity: 1;
    transition: transform 3s linear;
    transform: translate(0, 0);
    transform: translate3d(0, 0, 0);
    transition-property: transform, opacity;
    transition-duration: 800ms;
    transition-timing-function: cubic-bezier(0.175, 0.665, 0.32, 1), linear;
  }
`;

export default Calendar;
