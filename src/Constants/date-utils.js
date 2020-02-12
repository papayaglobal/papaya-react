import moment from "moment";
import _ from "lodash";

export const fullDateResponsive = window.matchMedia("(max-width: 767px)").matches ? "MMM D, YYYY" : "MMMM D, YYYY";
export const monYear = "MMMM YYYY"; // December 2018
export const shortFullDate = "MMM D, YYYY";

export const formatDateRange = (props) => {
    const {startedAt, endedAt, format = fullDateResponsive, compact = true} = props || {};
    if (!startedAt || !endedAt) {
        return "–";
    }

    const endString = moment(endedAt).format(format);
    const startString = moment(startedAt).format(format);

    if (compact) {
        if (moment(startString).isSame(endedAt, "day")) {
            return endString;
        }

        if (moment(startString).isSame(endedAt, "month")) {
            if (format === monYear) {
                return endString;
            }
            if (format === fullDateResponsive) {
                const fullDatePart1 = moment(startString).format(_(format).replace(/Y/g, "").replace(/,/g, "").trim());
                const fullDatePart2 = moment(endString).format(_(format).replace(/M/g, "").trim());
                return `${fullDatePart1}–${fullDatePart2}`;
            } else {
                return `${moment(startedAt).format(_(format).replace(/Y/g, "").replace(/M/g, "").trim())}–${endString}`;
            }
        }

        if (moment(startString).isSame(endedAt, "year")) {
            if (format === fullDateResponsive) {
                return `${moment(startString).format(_(format).replace(/Y/g, "").replace(/,/g, "").trim())}–${endString}`;
            } else {
                return `${moment(startString).format(_(format).replace(/Y/g, "").trim())} – ${endString}`;
            }
        }
    }

    return `${moment(startString).format(format)} – ${endString}`;
};
