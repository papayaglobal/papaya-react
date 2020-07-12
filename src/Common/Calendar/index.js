import React from "react";
import PropTypes from "prop-types";
import { find, get } from "lodash";
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
import { LeftArrow, RightArrow } from "./../../papaya-styled-components";
import {
    CalendarBody,
    CalendarHeader,
    CalendarWrapper,
    CurrentMonth,
    Day,
    DaysWrapper,
    HeaderDate,
    MonthsWrapper,
    PrevNextIcon,
    RowsWrapper,
    RowWrapper
} from "./CalendarHelpers";

class Calendar extends React.Component {
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
        const { currentMonth } = this.state;
        const dateFormat = "MMMM, yyyy";
        return (
            <CalendarHeader className="calendar-header">
                <HeaderDate className="header-date">
                    <CurrentMonth className="current-month">{format(currentMonth, dateFormat)}</CurrentMonth>
                </HeaderDate>
                <PrevNextIcon className="prev-next-icon">
                    <LeftArrow alt="Previous" margin={"0 10px 0 0"} onClick={() => this.previousMonth()} />
                    <RightArrow alt="Next" onClick={() => this.nextMonth()} />
                </PrevNextIcon>
            </CalendarHeader>
        );
    };

    renderBody = () => {
        const { weekStartsOn } = this.props;
        const days =
            weekStartsOn === "sunday" ? ["S", "M", "T", "W", "T", "F", "S"] : ["M", "T", "W", "T", "F", "S", "S"];
        const d = [];
        for (let i in days) {
            d.push(
                <Day className="number" key={i}>
                    <div className="days">{days[i]}</div>
                </Day>
            );
        }
        return <DaysWrapper className="days-wrapper">{d}</DaysWrapper>;
    };

    renderCells = ({ month }) => {
        const { weekStartsOn: startWeekConfig } = this.props;
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
                    <Day
                        className={`number ${this.getDayType({ day, monthStart })} ${this.getDayStatus({
                            day,
                            monthStart
                        })}`}
                        type={this.getDayType({ day, monthStart })}
                        key={day}
                        onClick={() => this.props.onDateClick(toDate(cloneDay))}
                    >
                        <div
                            className={`days ${this.isCurrentMonth({
                                day,
                                monthStart,
                                monthEnd
                            })}`}
                        >
                            {formattedDate}
                        </div>
                    </Day>
                );
                day = addDays(day, 1);
            }
            rows.push(
                <RowWrapper className="row-wrapper" key={day}>
                    {" "}
                    {days}{" "}
                </RowWrapper>
            );
            days = [];
        }
        return rows;
    };

    isCurrentMonth = ({ day, monthStart, monthEnd }) => {
        if (moment(day).isBetween(moment(monthStart), moment(monthEnd), undefined, "[]")) {
            return "dayCurrentMonth";
        }
        return "dayNotCurrentMonth";
    };

    getDayStatus = ({ day }) => {
        const { ptoItems = [] } = this.props;
        const cleanDate = moment(day).format("YYYY-MM-DD");

        const ptoItem = find(ptoItems, (pto) => {
            if (pto.dateDisplayType === "SINGLE_DAY") {
                return cleanDate === get(pto, "start");
            } else {
                return moment(cleanDate).isBetween(moment(get(pto, "start")), moment(get(pto, "end")), undefined, "[]");
            }
        });

        if (!ptoItem) {
            return "";
        }

        return this.getPeriodClasses({ ptoItem, day });
    };

    getDayType = ({ day }) => {
        const { ptoItems = [] } = this.props;
        const cleanDate = moment(day).format("YYYY-MM-DD");

        const ptoItem = find(ptoItems, (pto) => {
            if (pto.dateDisplayType === "SINGLE_DAY") {
                return cleanDate === get(pto, "start");
            } else {
                return moment(cleanDate).isBetween(moment(get(pto, "start")), moment(get(pto, "end")), undefined, "[]");
            }
        });

        return get(ptoItem, "type");
    };

    getPeriodClasses = ({ day, ptoItem }) => {
        const { currentPeriod, nextPeriod } = this.props;
        const currentPeriodId = +get(currentPeriod, "id");
        const nextPeriodId = +get(nextPeriod, "id");
        const periodEnd = moment(get(currentPeriod, "endedAt"));
        const ptoPeriod = +get(ptoItem, "workerReport.paymentPeriodId");

        if (currentPeriodId === ptoPeriod) {
            return "currentPeriod";
        } else if (ptoPeriod === nextPeriodId) {
            return "futurePeriod";
        } else if (moment(day).isBefore(periodEnd)) {
            return "oldPeriod";
        } else if (moment(day).isAfter(periodEnd)) {
            return "futurePeriod";
        } else {
            return "";
        }
    };
    //
    // getVacationLeaveClasses = ({day, ptoItem}) => {
    //     const {currentPeriod, nextPeriod} = this.props;
    //     const currentPeriodId = +get(currentPeriod, "id");
    //     const periodEnd = moment(get(currentPeriod, "endedAt"));
    //     const nextPeriodId = +get(nextPeriod, "id");
    //     const ptoPeriod = +get(ptoItem, "workerReport.paymentPeriodId");
    //
    //     if (currentPeriodId === ptoPeriod) {
    //         return "vacation currentPeriod";
    //     } else if (ptoPeriod === nextPeriodId) {
    //         return "vacation futurePeriod";
    //     } else if (moment(day).isBefore(periodEnd)) {
    //         return "vacation oldPeriod";
    //     } else if (moment(day).isAfter(periodEnd)) {
    //         return "vacation futurePeriod";
    //     } else {
    //         return "";
    //     }
    //
    // };

    // getUnpaidLeaveClasses = ({day, ptoItem}) => {
    //     const {currentPeriod, nextPeriod} = this.props;
    //     const currentPeriodId = +get(currentPeriod, "id");
    //     const nextPeriodId = +get(nextPeriod, "id");
    //     const periodEnd = moment(get(currentPeriod, "endedAt"));
    //     const ptoPeriod = +get(ptoItem, "workerReport.paymentPeriodId");
    //
    //     if (currentPeriodId === ptoPeriod) {
    //         return "unpaid currentPeriod";
    //     } else if (ptoPeriod === nextPeriodId) {
    //         return "unpaid futurePeriod";
    //     } else if (moment(day).isBefore(periodEnd)) {
    //         return "unpaid oldPeriod";
    //     } else if (moment(day).isAfter(periodEnd)) {
    //         return "unpaid futurePeriod";
    //     } else {
    //         return "";
    //     }
    // };

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
        const { direction, previousMonth, currentMonth, nextMonth } = this.state;
        const { className, flat } = this.props;
        return (
            <CalendarWrapper flat={flat} className={className}>
                {this.renderHeading()}

                <CalendarBody className="calendar-body">
                    {this.renderBody()}
                    <MonthsWrapper
                        className={
                            direction === "ltr"
                                ? "monthsWrapper nxt"
                                : direction === "rtl"
                                ? "monthsWrapper prev"
                                : "monthsWrapper"
                        }
                    >
                        <RowsWrapper className="previous">{this.renderCells({ month: previousMonth })}</RowsWrapper>
                        <RowsWrapper className="py-active-period">
                            {this.renderCells({ month: currentMonth })}
                        </RowsWrapper>
                        <RowsWrapper className="next">{this.renderCells({ month: nextMonth })}</RowsWrapper>
                    </MonthsWrapper>
                </CalendarBody>
            </CalendarWrapper>
        );
    }
}

Calendar.propTypes = {
    ptoItems: PropTypes.array,
    weekStartsOn: PropTypes.string,
    currentPeriod: PropTypes.any,
    nextPeriod: PropTypes.any
};
Calendar.defaultProps = {
    weekStartsOn: "sunday"
};

export default Calendar;
