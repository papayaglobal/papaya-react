import React, {useEffect, useRef, useState} from "react";
import PropTypes from 'prop-types';
import styled from "styled-components";
import {isFunction} from "lodash";

import ToolTip from "../Tooltip";
import Attachment from "../Attachment";
import Dropdown from "../Dropdown";

import media from "../../Constants/mediaQueries";

import pending from "../../assets/icons/Pending.svg";
import more from "../../assets/icons/More.svg";
import commentIcon from "../../assets/icons/Comment.svg";
import PopOver from "../PopOver";

const ptoTypes = {
    sick: {label: "Sick Leave(s)", color: "#E24C84"},
    leave: {label: "Vacations", color: "#976FED"},
    unpaid: {label: "Unpaid", color: "#48C4D3"},
    child_care_leave: {label: "Child Care", color: "#F58614"},
    maternity_leave: {label: "Maternity", color: "#F58614"},
    paternity_leave: {label: "Paternity", color: "#F58614"},
    parental_leave: {label: "Parental", color: "#F58614"},
    marriage_leave: {label: "Marriage", color: "#F58614"},
    birthday_leave: {label: "Birthday", color: "#72CF26"},
    bereavement_leave: {label: "Bereavement", color: "#635F5B"},
    military_leave: {label: "Military", color: "#4E9FC9"},
    other: {label: "Other", color: "#4E9FC9"},
};

const ReportRowComponent = (props) => {
    const {
        className,
        children,
        reportStatus = "planned",
        payPeriod,
        paddingPayPeriod,
        type,
        attachments = [],
        dates,
        pendingTooltip,
        actions,
        reportedDate,
        daysReported,
        comment,
        onClick
    } = props;
    const [size, setSize] = useState("normal-size");
    const reportRef = useRef(null);
    useEffect(() => {
        handleResize();
        window.addEventListener("resize", handleResize);
        return () => {
            window.removeEventListener("resize", handleResize);
        };
    });
    const handleResize = () => {
        const width = reportRef.current.getBoundingClientRect().width;
        if (width < 600) {
            setSize("small-size");
        } else {
            setSize("normal-size");
        }
    };

    const onAttachmentsClicked = ({e, attachments}) => {
        const {onAttachmentsClicked} = props;
        e.stopPropagation();
        isFunction(onAttachmentsClicked) && onAttachmentsClicked({attachments});
    };

    return (
        <div
            ref={reportRef}
            className={`${className} ${reportStatus} ${size}`}
            onClick={onClick}
        >
            <div className="leftWrapper">
                <div className="leaveWrapper">
                    {payPeriod && (<span className="date payPeriod">{payPeriod}</span>)}
                    <div className={`leaveBorder ${paddingPayPeriod ? "paddingPayPeriod" : ""}`}/>
                    <span className="leaveType">{ptoTypes[type].label}</span>
                </div>
                <div className="dateWrapper">
                    <span className="date">{dates}</span>
                    {daysReported && (
                        <div className="daysReported">
                            <span className="date">{daysReported}</span>
                        </div>
                    )}
                </div>
            </div>
            <div className="rightWrapper">
                {!!comment && (
                    <PopOver
                        position="top"
                        message={comment}
                    >
                        <div className="labelWrapper">
                            <img src={commentIcon} alt="comment"/>
                        </div>
                    </PopOver>
                )}

                {attachments &&
                (attachments.length > 0 && (
                    <div className="attachments">
                        <Attachment attachments={attachments} onClick={(e) => onAttachmentsClicked({
                            e,
                            attachments
                        })}/>
                    </div>
                ))}
                {reportedDate && (
                    <div className="reportedDateWrapper">
                        <span className="date">{reportedDate}</span>
                    </div>
                )}
                {reportStatus === "planned" && (
                    <div className="timeWrapper">
                        {pendingTooltip ? (
                            <ToolTip position="top" message={pendingTooltip}>
                                <img src={pending} alt="Pending Icon" className="icon"/>
                            </ToolTip>
                        ) : (
                            <img src={pending} alt="Pending Icon" className="icon"/>
                        )}
                    </div>
                )}
                {actions && (
                    <div className="moreWrapper">
                        <Dropdown list={actions} icon={more}/>
                    </div>
                )}
            </div>
        </div>
    );
};
ReportRowComponent.propTypes = {
    reportStatus: PropTypes.string,
    type: PropTypes.string,
    attachments: PropTypes.array,
    dates: PropTypes.string,
    pendingTooltip: PropTypes.bool,
    actions: PropTypes.array,
    reportedDate: PropTypes.string,
    daysReported: PropTypes.string,
    onClick: PropTypes.func,
    onAttachmentsClicked: PropTypes.func,
};

const ReportRow = styled(ReportRowComponent)`
  display: flex;
  flex: 1;
  flex-direction: row;
  height: 44px;
  justify-content: space-between;
  align-items: center;
  padding: 0 0 0 15px;
  border-radius: 4px;
  background-color: rgb(247, 248, 251);
  box-shadow: none;
  :hover {
    cursor: pointer;
    box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1);
  }
  &.planned {
    box-shadow: none;
    background-color: rgb(247, 248, 251);
  }
  &.planned:hover {
    cursor: pointer;
    box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1);
  }
  &.history {
    box-shadow: none;
    background-color: rgb(247, 248, 251, 0);
  }
  &.history:hover {
    cursor: pointer;
    box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1);
  }

  & :hover {
    cursor: pointer;
  }

  .leftWrapper,
  .rightWrapper {
    display: flex;
    flex: 1;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
  }
  .labelWrapper {
    margin: 0 15px;
  }
  .rightWrapper {
    flex: 1;
    justify-content: flex-end;
    min-width: 45px;
  }
  &.small-size .leftWrapper {
    flex: 4;
  }
  .leaveBorder {
    width: 3px;
    height: 14px;
    background-color: ${props => ptoTypes[props.type].color};
    border-radius: 2.5px;
    &.paddingPayPeriod {
      margin-left: 122px;
    }
  }
  .leaveWrapper {
    display: flex;
    flex: 1 1 25%;
    flex-direction: row;
    align-items: center;
  }
  &.small-size .leaveWrapper {
    margin-right: 5px;
    flex: 1;
  }
  &.small-size .dateWrapper {
    flex: 1;
  }
  span.leaveType {
    color: #797c87;
    margin-left: 10px;
    line-height: 1;
    font-size: 0.9rem;
  }
  .daysReported {
    flex: 1;
  }
  .daysReported .date {
    color: #797c87;
    font-weight: normal;
  }
  .dateWrapper {
    display: flex;
    flex: 1 1 25%;
    flex-direction: row;
    justify-content: center;
    align-items: center;
  }
  .dateWrapper .date {
    flex: 1;
    font-size: 0.9rem;
  }
  .date {
    font-size: 0.9rem;
    color: #343949;
    font-weight: 600;
    &.payPeriod {
      font-weight: normal;
      padding-right: 50px;
      color: #797c87;
    }
  }
  &.small-size .reportedDateWrapper, &.small-size .daysReported, &.small-size .timeWrapper, &.small-size .attachments .attachmentCount {
    display: none;
  }
  .reportedDateWrapper .date {
    color: #b5b7bd;
    font-weight: normal;
    margin: 0 10px;
  }
  .attachments {
    display: flex;
    justify-content: flex-end;
    margin: 0 10px;
  }
  .timeWrapper {
    margin: 0 10px;
  }
  &.small-size .timeWrapper {
    margin: 0 5px;
  }
  &.small-size .attachments {
    margin: 0 10px;
  }
  .moreWrapper {
    margin: 0 5px;
  }
  .icon {
    height: 15px;
  }
  .moreWrapper button {
    min-width: 1.2rem;
    padding: 0;
    margin: 0;
    background: none !important;
  }
  .moreWrapper .dropdown-menu {
    left: -130px !important;
    top: -2px !important;
  }
  ${media.lg`
    .leftWrapper {
      flex: 2;
    }
    .leaveWrapper {
      margin-right: 5px;
      flex: 1;
    }
    .daysReported, .reportedDateWrapper {
      display: none;
    }
    .timeWrapper {
      margin: 0 5px;
    }
    .attachments {
      margin: 0 10px;
    }
  `}
  ${media.md`
    .timeWrapper, .moreWrapper {
      margin: 0 5px;
    }
    .dateWrapper {
      flex: 2;
      margin: 0 5px;
    }
    .daysReported, .reportedDateWrapper, .timeWrapper {
      display: none;
    }
    .attachments {
      flex: 1;
      margin: 0 5px;
    }
    .rightWrapper {
      flex: 1;
      justify-content: flex-end;
    }
    .labelWrapper {
      display: none;
    }
  `}
  ${media.sm`
    padding: 0 10px;
    .leaveWrapper {
      flex: 1;
      margin-right: 20px;
    }
    .timeWrapper {
      display: none;
    }
    .timeWrapper, .moreWrapper {
      margin: 0;
    }
    .dateWrapper {
      flex: 1;
      margin: 0 0px;
    }
    .attachments {
      margin: 0 5px;
    }
    .leftWrapper{
      flex: 4;
    }
    .rightWrapper {
      flex: 1;
    }
  `}
`;

export default ReportRow;
