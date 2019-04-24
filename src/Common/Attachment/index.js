import React from "react";
import styled from "styled-components";

import AppTooltip from "../Tooltip";

import attachment from "../../assets/icons/attachment-link.svg";
import pending from "../../assets/icons/Pending.svg";
import more from "../../assets/icons/More.svg";

const Attachment = ({ className, children, type, attachments, dates, pendingTooltip }) => (
  <div className={className}>
    <div className="leaveWrapper">
      <div className="leaveBorder" />
      <span className="leaveType">{type === "sick" ? "Sick Leave(s)" : "Vacations"}</span>
    </div>
    <div className="dateWrapper">
      <span className="date">{dates}</span>
    </div>
    <div className="attachments">
      {attachments.length > 1 && <span className="attachmentCount">{attachments.length}</span>}
      <img src={attachment} alt="Attachment Icon" className="icon" />
    </div>
    <div className="timeWrapper">
      <AppTooltip position="top" message={pendingTooltip}>
        <img src={pending} alt="Pending Icon" className="icon" />
      </AppTooltip>
    </div>
    <div className="moreWrapper">
      <img src={more} alt="More Icon" className="icon" />
    </div>
  </div>
);

const AppAttachment = styled(Attachment)`
  display: flex;
  flex: 1;
  flex-direction: row;
  height: 44px;
  justify-content: flex-start;
  align-items: center;
  background-color: #f7f8fb;
  padding: 0 15px;
  border-radius: 4px;

  & :hover {
    cursor: pointer;
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
    flex: 2;
    flex-direction: row;
  }
  span.leaveType {
    color: #797c87;
    margin-left: 10px;
    line-height: 1;
  }
  .dateWrapper {
    flex: 5;
  }
  .date {
    color: #343949;
    font-weight: 600;
  }
  .attachments {
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 0 15px;
    background: rgba(25, 117, 240, 0.05);
    height: 34px;
    border-radius: 17px;
    padding: 9px;
  }
  .attachmentCount {
    padding: 0 5px;
    color: #1975f0;
    margin-right: 5px;
  }
  .timeWrapper {
    margin: 0 15px;
  }
  .moreWrapper {
    margin: 0 15px;
  }
  .icon {
    height: 16px;
  }
`;

export default AppAttachment;
