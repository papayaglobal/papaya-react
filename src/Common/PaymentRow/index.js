import React from "react";
import PropTypes from 'prop-types';
import {isFunction} from "lodash";
import Attachment from "../Attachment";
import Dropdown from "../Dropdown";
import Label from "../Label";
import styled from "styled-components";
import more from "../../assets/icons/More.svg";
import expand from "../../assets/icons/Expand.svg";
import comment from "../../assets/icons/Comment.svg";
import {CheckBox} from "../../Common/Checkbox";
import media from "../../Constants/mediaQueries";

class PaymentRowComponent extends React.Component {
    state = {
        isExpanded: false
    };

    toggleCollapse = (e) => {
        e.stopPropagation();
        this.setState({
            isExpanded: !this.state.isExpanded
        });
    };

    onSelectClicked = ({e, payment}) => {
        const {onSelectClick} = this.props;
        console.log("onSelectClicked =>");
        e.stopPropagation();

        isFunction(onSelectClick) && onSelectClick({payment});
    };

    onSelectAttachmentClicked = ({e, payment, attachment}) => {
        const {onSelectAttachmentClicked} = this.props;
        e.stopPropagation();

        isFunction(onSelectAttachmentClicked) && onSelectAttachmentClicked({payment, attachment});
    };

    onAttachmentClicked = ({e, payment, attachment}) => {
        const {onAttachmentClicked} = this.props;
        e.stopPropagation();

        isFunction(onAttachmentClicked) && onAttachmentClicked({payment, attachment});
    };

    render() {
        const {
            className,
            attachments = [],
            dates,
            actions,
            reportedDate,
            isNew,
            hasComment,
            isMonthly,
            amount,
            selectable,
            selected,
            payment,
            onClick
        } = this.props;
        const {isExpanded} = this.state;
        if (attachments.length > 1) {
            return (
                <div className={`${className}`} onClick={onClick}>
                    <div
                        id="parentRow"
                        className={`wrapper multipleAttachments ${isExpanded && "isExpanded"}`}
                        style={{border: isNew ? "1px solid #2ED6BC" : "none"}}
                        onClick={(e) => this.toggleCollapse(e)}
                    >
                        <div className="leftWrapper">
                            {selectable && (
                                <div className="selectWrapper">
                                    <CheckBox checked={selected} onClick={(e) => this.onSelectClicked({e, payment})}/>
                                </div>
                            )}
                            <div className={`${isMonthly ? "dateWrapper isMonthly" : "dateWrapper"}`}>
                                <span className="date">{dates}</span>
                            </div>
                            {amount && (
                                <div className="amountWrapper">
                                    <span className="amount">{`${amount}`}</span>
                                </div>
                            )}
                            {attachments &&
                            (attachments.length > 0 && (
                                <div className="attachments">
                                    <Attachment
                                        attachments={attachments}
                                        displayName type="link"/>
                                    {attachments.length > 1 && <img src={expand} alt="Expand More"/>}
                                </div>
                            ))}
                        </div>
                        <div className="rightWrapper">
                            {isNew && (
                                <div className="labelWrapper">
                                    <Label title="New"/>
                                </div>
                            )}
                            {hasComment && (
                                <div className="labelWrapper">
                                    <img src={comment} alt="comment"/>
                                </div>
                            )}
                            {attachments && (attachments.length > 0 && (
                                <div className="attachments md">
                                    <Attachment attachments={attachments}/>
                                </div>
                            ))}
                            {reportedDate && (
                                <div className="reportedDateWrapper">
                                    <span className="date">{reportedDate}</span>
                                </div>
                            )}
                            {actions && (
                                <div className="moreWrapper">
                                    <Dropdown list={actions} icon={more}/>
                                </div>
                            )}
                        </div>
                    </div>
                    <div
                        className={`subComponent ${isExpanded && "visible"}`}
                        style={{border: isNew ? "1px solid #2ED6BC" : "none"}}
                    >
                        {attachments.map((attachment, i) => (
                            <div key={i} className="subComponentRow" onClick={(evt) => evt.stopPropagation()}>
                                <div className="leftWrapper">
                                    {selectable && (
                                        <div className="selectWrapper">
                                            <CheckBox checked={selected}
                                                      onClick={(e) => this.onSelectAttachmentClicked({
                                                          e,
                                                          payment,
                                                          attachment
                                                      })}/>
                                        </div>
                                    )}
                                    <div className={`${isMonthly ? "dateWrapper isMonthly" : "dateWrapper"}`}/>
                                    <div className="amountWrapper">
                                        <span className="type">{attachment.type}</span>
                                    </div>
                                    <div className="attachments">
                                        <Attachment
                                            onClick={(e) => this.onAttachmentClicked({
                                                e,
                                                payment,
                                                attachment
                                            })}
                                            attachments={[attachment]}
                                            displayName isExpanded type="link"/>
                                    </div>
                                </div>

                                <div className="rightWrapper">
                                    <div className="attachments md">
                                        <Attachment
                                            onClick={(e) => this.onAttachmentClicked({
                                                e,
                                                payment,
                                                attachment
                                            })}
                                            attachments={[attachment]}
                                        />
                                    </div>
                                    {attachment.title && (
                                        <div className="noteWrapper">
                      <span className="note">
                        {attachment.title.length <= 50
                            ? attachment.title
                            : `${attachment.title.substring(0, 50)}...`}
                      </span>
                                        </div>
                                    )}
                                    <div className="moreWrapper" style={{visibility: "hidden"}}>
                                        <Dropdown list={actions} icon={more}/>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            );
        } else {
            return (
                <div
                    className={`${className} singleAttachment`}
                    style={{border: isNew ? "1px solid #2ED6BC" : "none"}}
                    onClick={onClick}
                >
                    <div className="leftWrapper">
                        {selectable && (
                            <div className="selectWrapper">
                                <CheckBox checked={selected} onClick={(e) => this.onSelectClicked({e, payment})}/>
                            </div>
                        )}
                        <div className={`${isMonthly ? "dateWrapper isMonthly" : "dateWrapper"}`}>
                            <span className="date">{dates}</span>
                        </div>
                        {amount && (
                            <div className="amountWrapper">
                                <span className="amount">{`${amount}`}</span>
                            </div>
                        )}
                        {attachments && (attachments.length > 0 && (
                            <div className="attachments">
                                <Attachment attachments={attachments}
                                            onClick={attachments.length === 1 ? (e) => this.onAttachmentClicked({
                                                e,
                                                payment,
                                                attachment: attachments[0]
                                            }) : null}
                                            displayName type="link"/>
                            </div>
                        ))}
                    </div>
                    <div className="rightWrapper">
                        {isNew && (
                            <div className="labelWrapper">
                                <Label title="New"/>
                            </div>
                        )}
                        {hasComment && (
                            <div className="labelWrapper">
                                <img src={comment} alt="comment"/>
                            </div>
                        )}
                        {attachments && (attachments.length > 0 && (
                            <div className="attachments md">
                                <Attachment attachments={attachments}
                                            onClick={attachments.length === 1 ? (e) => this.onAttachmentClicked({
                                                e,
                                                payment,
                                                attachment: attachments[0]
                                            }) : null}/>
                            </div>
                        ))}
                        {reportedDate && (
                            <div className="reportedDateWrapper">
                                <span className="date">{reportedDate}</span>
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
        }
    }
}

PaymentRowComponent.propTypes = {
    className: PropTypes.string,
    children: PropTypes.any,
    attachments: PropTypes.array,
    dates: PropTypes.string,
    actions: PropTypes.array,
    reportedDate: PropTypes.string,
    isNew: PropTypes.bool,
    hasComment: PropTypes.bool,
    isMonthly: PropTypes.bool,
    amount: PropTypes.string,
    selectable: PropTypes.bool,
    selected: PropTypes.bool,
    onSelectClick: PropTypes.func,
    onSelectAttachmentClicked: PropTypes.func,
    onAttachmentClicked: PropTypes.func,
};

const PaymentRow = styled(PaymentRowComponent)`
  display: flex;
  flex: 1;
  flex-direction: column;
  & .wrapper:hover {
    cursor: pointer;
    box-shadow: 0 1px 10px 0 rgba(0, 0, 0, 0.1);
  }
  & .wrapper {
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
  }

  & .multipleAttachments {
    border-left: 3px solid #c2c3c8 !important;
  }
  & .multipleAttachments.isExpanded {
    border-left: 3px solid #1975ef !important;
    border-radius: 4px 4px 0 0;
    border-bottom: 1px solid #eaebec !important;
  }

  &.singleAttachment {
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
  }
  &.singleAttachment:hover {
    cursor: pointer;
    box-shadow: 0 1px 10px 0 rgba(0, 0, 0, 0.1);
  }

  & .subComponent {
    visibility: hidden;
    height: 0;
    max-height: 0;
    flex: 1;
    flex-direction: column;
    border-radius: 0 0 4px 4px;
    box-shadow: 0 1px 4px 0 rgba(0, 0, 0, 0.1);
    opacity: 0;
    -webkit-transition: visibility 0s, opacity 0.4s ease-out;
    transition: visibility 0s, opacity 0.4s ease-out;
    border-top: 0 !important;
  }
  .subComponentRow {
    display: flex;
    flex: 1;
    flex-direction: row;
    min-height: 46px;
    justify-content: space-between;
    align-items: center;
    padding: 0 15px;
    border-radius: 0;
    background-color: #f7f8fb;
    border-left: 3px solid #1975ef !important;
  }

  .subComponent.visible {
    visibility: visible;
    height: auto;
    max-height: 1000px;
    opacity: 1;
    -webkit-transition: visibility 0s, opacity 0.4s ease-out;
    transition: visibility 0s, opacity 0.4s ease-out;
  }

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
    justify-content: flex-start;
  }
  .amount {
    color: #343949;
    font-weight: 600;
    font-size: 0.9rem;
  }
  .type {
    font-weight: normal;
    color: #b5b7bd;
  }
  .reportedDateWrapper .date {
    color: #b5b7bd;
    font-weight: normal;
    font-style: italic;
    margin: 0 20px;
  }
  .noteWrapper .note {
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
    justify-content: flex-start;
    align-items: center;
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
    height: 16px;
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
    .noteWrapper{
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
    &.singleAttachment, & .multipleAttachments {
      padding: 0 10px;
    }
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
    .noteWrapper{
      display: none;
    }
    .labelWrapper {
      display: none;
    }
  `}
`;

export default PaymentRow;
