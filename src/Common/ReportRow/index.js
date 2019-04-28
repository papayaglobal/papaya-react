import React from "react";
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
  const leaveDate = new Date(reportedDate);
  const reportStatus = compareAsc(leaveDate, today) > 0 ? "planned" : "history";
  return (
    <div className={`${reportedDate ? `${className} ${reportStatus}` : `${className}`}`}>
      <div className="leftWrapper">
        <div className="leaveWrapper">
          <div className="leaveBorder" />
          <span className="leaveType">{type === "sick" ? "Sick Leave(s)" : "Vacations"}</span>
        </div>
        <div className="dateWrapper">
          <span className="date">{dates}</span>
        </div>
        {daysReported && (
          <div className="daysReported">
            <span className="date">{daysReported}</span>
          </div>
        )}
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
        <div className="moreWrapper">
          <Dropdown list={actions} icon={more} />
        </div>
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
  padding: 0 15px;
  border-radius: 4px;
  margin: 0 50px;
  background-color: rgb(247, 248, 251);

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
  }

  .rightWrapper {
    justify-content: flex-end;
  }

  .leaveBorder {
    width: 3px;
    height: 14px;
    border-width: 2px;
    border-style: solid;
    border-color: ${props => (props.type === "sick" ? "#E24C84" : "#976FED")};
    border-radius: 2.5px;
  }
  .leaveWrapper {
    display: flex;
    flex: 1;
    flex-direction: row;
    align-items: center;
    margin-right: 80px;
  }
  span.leaveType {
    color: #797c87;
    margin-left: 10px;
    line-height: 1;
  }
  .daysReported {
    flex: 1;
    margin: 0 30px;
  }
  .daysReported .date {
    color: #797c87;
    font-weight: normal;
  }
  .dateWrapper {
    flex: 1;
    margin: 0 30px;
  }
  .date {
    font-size: 0.9rem;
    color: #343949;
    font-weight: 600;
  }
  .reportedDateWrapper .date {
    color: #b5b7bd;
    font-weight: normal;
    margin: 0 50px;
  }
  .attachments {
    display: flex;
    flex: 1;
    justify-content: flex-end;
    margin: 0 30px;
  }
  .timeWrapper {
    margin: 0 15px;
  }
  .moreWrapper {
    margin: 0 5px;
  }
  .icon {
    height: 16px;
  }
  .moreWrapper button {
    min-width: auto;
    padding: 0;
    margin: 0;
    background: none !important;
  }
  .moreWrapper .dropdown-menu {
    left: -130px !important;
    top: 0 !important;
  }

  ${media.sm`
    margin: 0 10px;
    .leaveWrapper {
      margin-right: 20px;
    }
    .timeWrapper {
      display: none;
    }
    .timeWrapper, .moreWrapper {
      margin: 0 5px;
    }
    .dateWrapper {
      margin: 0 5px;
    }
    .attachments {
      margin: 0 5px;
    }
  `}
  ${media.md`
  margin: 0 10px;
  .leaveWrapper {
    margin-right: 5px;
  }
    .timeWrapper, .moreWrapper {
      margin: 0 5px;
    }
    .dateWrapper {
      margin: 0 5px;
    }
    .daysReported, .reportedDateWrapper, .timeWrapper {
      display: none;
    }
    .attachments {
      flex: 0;
      margin: 0 5px;
    }
    .rightWrapper {
      flex: 0;
    }
  `}
`;

export default ReportRow;
