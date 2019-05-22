import React, { useRef, useEffect, useState } from "react";
import styled from "styled-components";
import { compareAsc } from "date-fns";

import ToolTip from "../Tooltip";
import Attachment from "../Attachment";
import Dropdown from "../Dropdown";

import media from "../../Constants/mediaQueries";

import pending from "../../assets/icons/Pending.svg";
import more from "../../assets/icons/More.svg";

const today = new Date();

const ReportRowComponent = ({
  className,
  children,
  type,
  attachments,
  dates,
  pendingTooltip,
  actions,
  reportedDate,
  daysReported
}) => {
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
  const leaveDate = new Date(reportedDate);
  const reportStatus = compareAsc(leaveDate, today) > 0 ? "planned" : "history";
  return (
    <div
      ref={reportRef}
      className={`${
        reportedDate ? `${className} ${reportStatus} ${size}` : `${className} ${size}`
      }`}
    >
      <div className="leftWrapper">
        <div className="leaveWrapper">
          <div className="leaveBorder" />
          <span className="leaveType">{type === "sick" ? "Sick Leave(s)" : "Vacations"}</span>
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
        {attachments &&
          (attachments.length > 0 && (
            <div className="attachments">
              <Attachment attachments={attachments} />
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
                <img src={pending} alt="Pending Icon" className="icon" />
              </ToolTip>
            ) : (
              <img src={pending} alt="Pending Icon" className="icon" />
            )}
          </div>
        )}
        {actions && (
          <div className="moreWrapper">
            <Dropdown list={actions} icon={more} />
          </div>
        )}
      </div>
    </div>
  );
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
  box-shadow: 0 1px 1px rgba(0,0,0,0.07);

  &.planned {
    background-color: rgb(247, 248, 251);
  }
  &.history {
    background-color: rgb(247, 248, 251, 0);
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
    background-color: ${props => (props.type === "sick" ? "#E24C84" : "#976FED")};
    border-radius: 2.5px;
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
      flex: 1 1 25%;
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
      flex: 1;
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
  `}
  ${media.sm`
    .leaveWrapper {
      flex: 1;
      margin-right: 20px;
    }
    .timeWrapper {
      display: none;
    }
    .timeWrapper, .moreWrapper {
      margin: 0 5px;
    }
    .dateWrapper {
      flex: 1;
      margin: 0 5px;
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
