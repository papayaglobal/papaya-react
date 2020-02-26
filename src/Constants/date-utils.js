import moment from "moment";
import _ from "lodash";

export const fullDateResponsive = window.matchMedia("(max-width: 767px)").matches ? "MMM D, YYYY" : "MMMM D, YYYY";
export const dayMonthResponsive = window.matchMedia("(max-width: 767px)").matches ? "MMM D" : "MMMM D";
export const monYear = "MMMM YYYY";
export const shortFullDate = "MMM D, YYYY";

export const formatDateRange = (props) => {
    const {startedAt, endedAt, format = fullDateResponsive, compact = true} = props || {};
    if (!startedAt || !endedAt) {
        return "–";
    }

    const endString = moment(endedAt).format(format);

    if (compact) {
        if (moment(startedAt).isSame(endedAt, "day")) {
            return endString;
        }

        if (moment(startedAt).isSame(endedAt, "month")) {
            switch (format) {
                case monYear:
                    return endString;
                case dayMonthResponsive:
                    const dayMonthPart1 = moment(startedAt).format(format);
                    const dayMonthPart2 = moment(endedAt).format(_(format).replace(/M/g, "").trim());
                    return `${dayMonthPart1}–${dayMonthPart2}`;
                case fullDateResponsive:
                    const fullDatePart1 = moment(startedAt).format(_(format).replace(/Y/g, "").replace(/,/g, "").trim());
                    const fullDatePart2 = moment(endedAt).format(_(format).replace(/M/g, "").trim());
                    return `${fullDatePart1}–${fullDatePart2}`;
                default:
                    return `${moment(startedAt).format(_(format).replace(/Y/g, "").replace(/M/g, "").trim())}–${endString}`;
            }
        }

        if (moment(startedAt).isSame(endedAt, "year")) {
            if (format === fullDateResponsive) {
                return `${moment(startedAt).format(_(format).replace(/Y/g, "").replace(/,/g, "").trim())}–${endString}`;
            } else {
                return `${moment(startedAt).format(_(format).replace(/Y/g, "").trim())} – ${endString}`;
            }
        }
    }

    return `${moment(startedAt).format(format)} – ${endString}`;
};
