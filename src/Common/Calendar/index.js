import React from "react";
import PropTypes from 'prop-types';
import styled from "styled-components";
import {find, get} from "lodash";
import moment from "moment";
import {
    addDays,
    addMonths,
    endOfMonth,
    endOfWeek,
    format,
    startOfMonth,
    startOfWeek,
    subMonths,
    toDate
} from "date-fns";
import {LeftArrow, RightArrow} from "./../../papaya-styled-components";

class CalendarComponent extends React.Component {
    state = {
        currentMonth: new Date(),
        previousMonth: null,
        nextMonth: null,
        selectedDate: new Date(),
        direction: ""
    };

    componentDidMount() {
        this.changeMonth();
    }

    changeMonth = () => {
        const {currentMonth} = this.state;
        const previousMonth = subMonths(currentMonth, 1);
        const nextMonth = addMonths(currentMonth, 1);

        this.setState({previousMonth, nextMonth});
        setTimeout(() => {
            this.setState({
                direction: ""
            });
        }, 300);
    };

    renderHeading = () => {
        const {currentMonth} = this.state;
        const dateFormat = "MMMM, yyyy";
        return (
            <div className="calendar-header">
                <div className="header-date">
                    <span className="current-month">{format(currentMonth, dateFormat)}</span>
                </div>
                <div className="prev-next-icon">
                    <LeftArrow alt="Previous" margin={"0 10px 0 0"} onClick={() => this.previousMonth()}/>
                    <RightArrow alt="Next" onClick={() => this.nextMonth()}/>
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
        const startDate = startOfWeek(monthStart, {weekStartsOn});
        const endDate = endOfWeek(monthEnd, {weekStartsOn});
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
                        <div className={`days ${this.isCurrentMonth({
                            day,
                            monthStart,
                            monthEnd
                        })}`}>{formattedDate}</div>
                    </div>
                );
                day = addDays(day, 1);
            }
            rows.push(<div className="row-wrapper" key={day}> {days} </div>);
            days = [];
        }
        return rows;
    };

    isCurrentMonth = ({day, monthStart, monthEnd}) => {
        if (moment(day).isBetween(moment(monthStart), moment(monthEnd), undefined, "[]")) {
            return "dayCurrentMonth";
        }
        return "dayNotCurrentMonth";
    };

    getDayStatus = ({day}) => {
        const {ptoItems = []} = this.props;
        const cleanDate = moment(day).format("YYYY-MM-DD");

        const ptoItem = find(ptoItems, (pto) => {
            if (pto.dateDisplayType === "SINGLE_DAY") {
                return cleanDate === get(pto, "start");
            } else {
                return moment(cleanDate).isBetween(moment(get(pto, "start")), moment(get(pto, "end")), undefined, "[]");
            }
        });

        switch (get(ptoItem, "type")) {
            case "sick":
                return this.getSickLeaveClasses({ptoItem, day});
            case "leave":
                return this.getVacationLeaveClasses({ptoItem, day});
            case "unpaid":
                return this.getUnpaidLeaveClasses({ptoItem, day});
            default:
                return ""
        }
    };

    getSickLeaveClasses = ({day, ptoItem}) => {
        const {currentPeriod, nextPeriod} = this.props;
        const currentPeriodId = +get(currentPeriod, "id");
        const nextPeriodId = +get(nextPeriod, "id");
        const periodEnd = moment(get(currentPeriod, "endedAt"));
        const ptoPeriod = +get(ptoItem, "workerReport.paymentPeriodId");

        if (currentPeriodId === ptoPeriod) {
            return "sick currentPeriod";
        } else if (ptoPeriod === nextPeriodId) {
            return "sick futurePeriod";
        } else if (moment(day).isBefore(periodEnd)) {
            return "sick oldPeriod";
        } else if (moment(day).isAfter(periodEnd)) {
            return "sick futurePeriod";
        } else {
            return "";
        }
    };

    getVacationLeaveClasses = ({day, ptoItem}) => {
        const {currentPeriod, nextPeriod} = this.props;
        const currentPeriodId = +get(currentPeriod, "id");
        const periodEnd = moment(get(currentPeriod, "endedAt"));
        const nextPeriodId = +get(nextPeriod, "id");
        const ptoPeriod = +get(ptoItem, "workerReport.paymentPeriodId");

        if (currentPeriodId === ptoPeriod) {
            return "vacation currentPeriod";
        } else if (ptoPeriod === nextPeriodId) {
            return "vacation futurePeriod";
        } else if (moment(day).isBefore(periodEnd)) {
            return "vacation oldPeriod";
        } else if (moment(day).isAfter(periodEnd)) {
            return "vacation futurePeriod";
        } else {
            return "";
        }

    };

    getUnpaidLeaveClasses = ({day, ptoItem}) => {
        const {currentPeriod, nextPeriod} = this.props;
        const currentPeriodId = +get(currentPeriod, "id");
        const nextPeriodId = +get(nextPeriod, "id");
        const periodEnd = moment(get(currentPeriod, "endedAt"));
        const ptoPeriod = +get(ptoItem, "workerReport.paymentPeriodId");

        if (currentPeriodId === ptoPeriod) {
            return "unpaid currentPeriod";
        } else if (ptoPeriod === nextPeriodId) {
            return "unpaid futurePeriod";
        } else if (moment(day).isBefore(periodEnd)) {
            return "unpaid oldPeriod";
        } else if (moment(day).isAfter(periodEnd)) {
            return "unpaid futurePeriod";
        } else {
            return "";
        }
    };

    nextMonth = () => {
        this.setState({
            currentMonth: addMonths(this.state.currentMonth, 1),
            direction: "ltr"
        });
        this.changeMonth();
    };

    previousMonth = () => {
        this.setState({
            currentMonth: subMonths(this.state.currentMonth, 1),
            direction: "rtl"
        });
        this.changeMonth();
    };

    render() {
        const {direction, previousMonth, currentMonth, nextMonth} = this.state;
        const {className, flat} = this.props;
        return (
            <div
                className={className}
                style={{boxShadow: flat ? "none" : "0 2px 10px 0 rgba(0, 0, 0, 0.1)"}}
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
    ptoItems: PropTypes.array,
    weekStartsOn: PropTypes.string,
    currentPeriod: PropTypes.any,
    nextPeriod: PropTypes.any,
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
  .number .days.dayNotCurrentMonth, 
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
    color: #343949;
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
  }
  
  .number.vacation.currentPeriod {
    background-color: #976fed;
    border-radius: 24px;
    position: relative;
  }

  .number.unpaid.oldPeriod {
    border: 1px solid #48C4D3;
    border-radius: 24px;
    position: relative;
  }
      
  .number.unpaid.currentPeriod {
    background-color: #48C4D3;
    border-radius: 24px;
    position: relative;
  }
  .number.vacation.currentPeriod .days {
    color: #ffffff;
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
    color: #343949;
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
  
  .number.unpaid.currentPeriod .days {
    color: #ffffff;
  }
  .number.unpaid.currentPeriod + .number.unpaid.currentPeriod:before {
    content: "";
    position: absolute;
    z-index: -1;
    background: inherit;
    top: 0;
    bottom: 0;
    left: -95%;
    right: 50%;
  }
  
  .number.unpaid.futurePeriod {
    background-color: #7EECF1;
    border-radius: 24px;
    position: relative;
  }
  .number.unpaid.futurePeriod .days {
    color: #343949;
  }
  .number.unpaid.futurePeriod + .number.unpaid.futurePeriod:before {
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
