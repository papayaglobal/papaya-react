import React from "react";
import styled from "styled-components";

import Attachment from "../Attachment";
import Dropdown from "../Dropdown";
import Label from "../Label";
import CheckBox from "../Checkbox";

import media from "../../Constants/mediaQueries";

import more from "../../assets/icons/More.svg";

const PaymentRowComponent = ({
  className,
  children,
  attachments,
  dates,
  actions,
  reportedDate,
  isNew,
  isMonthly,
  amount,
  selectable
}) => {
  return (
    <div className={className} style={{ border: isNew ? "1px solid #2ED6BC" : "none" }}>
      <div className="leftWrapper">
        {selectable && (
          <div className="selectWrapper">
            <CheckBox />
          </div>
        )}
        <div className={`${isMonthly ? "dateWrapper isMonthly" : "dateWrapper"}`}>
          <span className="date">{dates}</span>
        </div>
        {amount && (
          <div className="amountWrapper">
            <span className="amount">{`$${amount}`}</span>
          </div>
        )}
        {attachments &&
          (attachments.length > 0 && (
            <div className="attachments">
              <Attachment attachments={attachments} displayName type="link" />
            </div>
          ))}
      </div>
      <div className="rightWrapper">
        {isNew && (
          <div className="labelWrapper">
            <Label title="New" />
          </div>
        )}
        {attachments &&
          (attachments.length > 0 && (
            <div className="attachments md">
              <Attachment attachments={attachments} />
            </div>
          ))}
        {reportedDate && (
          <div className="reportedDateWrapper">
            <span className="date">{reportedDate}</span>
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

const PaymentRow = styled(PaymentRowComponent)`
  display: flex;
  flex: 1;
  flex-direction: row;
  height: 46px;
  justify-content: space-between;
  align-items: center;
  padding: 0 15px;
  border-radius: 4px;
  background-color: #ffffff;
  box-shadow: 0 1px 4px 0 rgba(0, 0, 0, 0.1);

  .leftWrapper,
  .rightWrapper {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
  }
  .leftWrapper {
    flex: 2;
  }
  .rightWrapper {
    flex: 1;
    justify-content: flex-end;
  }
  .dateWrapper {
    flex: 1;
  }
  .dateWrapper:hover,
  .attachments:hover {
    cursor: pointer;
  }
  .date {
    font-size: 0.9rem;
    color: #484d5b;
    font-weight: 400;
  }
  .dateWrapper.isMonthly .date {
    font-weight: 600;
    color: #343949;
  }
  .amountWrapper {
    display: flex;
    flex: 1;
    justify-content: flex-end;
  }
  .amount {
    color: #343949;
    font-weight: 600;
    font-size: 0.9rem;
  }
  .reportedDateWrapper .date {
    color: #b5b7bd;
    font-weight: normal;
    font-style: italic;
    margin: 0 20px;
  }
  .labelWrapper {
    margin: 0 15px;
  }
  .attachments {
    display: flex;
    flex: 2;
    justify-content: flex-end;
    font-size: 0.9rem;
  }
  .attachments.md {
    display: none;
  }
  .timeWrapper {
    margin: 0 15px;
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

  ${media.md`
    .moreWrapper {
      margin: 0 5px;
    }
    .dateWrapper {
      margin: 0 5px;
      flex: 1.5;
    }
    .amountWrapper {
      flex: 2;
      justify-content: flex-start;
    }
    .reportedDateWrapper{
      display: none;
    }
    .attachments, .selectWrapper {
      display: none;
    }
    .attachments.md {
      display: flex;
      flex: 0;
    }
    .leftWrapper{
      flex: 3;
    }
    .rightWrapper {
      flex: 1;
      justify-content: flex-end;
    }
  `}
  ${media.sm`
    padding: 0 5px;
    .amountWrapper {
      flex: 1;
    }
    .date, .amount {
      font-size: 0.8rem;
    }
    .moreWrapper {
      margin: 0 5px;
    }
    .dateWrapper {
      margin: 0 5px;
    }
    .attachments {
      margin: 0 5px;
    }
    .reportedDateWrapper{
      display: none;
    }
    .labelWrapper {
      display: none;
    }
  `}
`;

export default PaymentRow;
