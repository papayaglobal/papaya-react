import React, { Component } from "react";
import PropTypes from 'prop-types';
import { get, isFunction } from "lodash";
import {
    StyledActions,
    StyledAmount,
    StyledAttachment,
    StyledAttachmentIcon,
    StyledAttachments,
    StyledDates,
    StyledExpandedContainer,
    StyledExpandedRight,
    StyledLeftWrapper,
    StyledPaymentContainer,
    StyledPaymentRow,
    StyledReportedDate,
    StyledRightArrow,
    StyledRightWrapper,
    StyledSelectWrapper
} from "../ContractorPaymentRow/contractorPaymentRowHelpers";
import Attachment from "../../Common/Attachment";
import { CheckBox } from "../../Common/Checkbox";
import Dropdown from "../../Common/Dropdown";
import more from "../../assets/icons/More.svg";
import SubmittedProForma from "../../assets/icons/submitted-pro-forma.svg"
import AttachmentIcon from "../../Common/AttachmentIcon";
class ContractorPaymentRowComponent extends Component {
    state = {
        isExpanded: false
    };

    toggleCollapse = (e) => {
        e.stopPropagation();
        this.setState({
            isExpanded: !this.state.isExpanded
        });
    };

    onSelectClicked = ({ e, payment }) => {
        const { onSelectClick } = this.props;
        e.stopPropagation();

        isFunction(onSelectClick) && onSelectClick({ payment });
    };

    onSelectAttachmentClicked = ({ e, payment, attachment }) => {
        const { onSelectAttachmentClicked } = this.props;
        e.stopPropagation();

        isFunction(onSelectAttachmentClicked) && onSelectAttachmentClicked({ payment, attachment });
    };

    onAttachmentClicked = ({ e, payment, proForma }) => {
        const { onAttachmentClicked } = this.props;
        e.stopPropagation();

        isFunction(onAttachmentClicked) && onAttachmentClicked({ payment, proForma });
    };

    onPaymentClick = (e) => {
        const { onClick } = this.props;
        e.stopPropagation();
        isFunction(onClick) && onClick();
    };

    render() {
        const {
            className,
            dates,
            actions,
            reportedDate,
            isMonthly,
            amount,
            selectable,
            selected,
            selectedAttachments = [],
            payment
        } = this.props;
        const { isExpanded } = this.state;
        const { proForma, invoice } = payment || {};

        return <StyledPaymentContainer>
            <StyledPaymentRow className={className} onClick={this.onPaymentClick} isExpanded>
                <StyledLeftWrapper className="leftWrapper">
                    {selectable && <StyledSelectWrapper className="selectWrapper">
                        <CheckBox checked={selected} onClick={(e) => this.onSelectClicked({ e, payment })} />
                    </StyledSelectWrapper>}
                    <StyledRightArrow alt="Next" isExpanded={isExpanded} onClick={this.toggleCollapse} />
                    <StyledDates isMonthly={isMonthly}>{dates}</StyledDates>
                    {!isExpanded && <>
                        {amount && <StyledAmount className="amountWrapper">{amount}</StyledAmount>}
                        {proForma && <StyledAttachment className="attachments">
                            <Attachment attachments={[proForma]}
                                onClick={(e) => this.onAttachmentClicked({
                                    e,
                                    payment,
                                    proForma
                                })}
                                displayName
                                type="proForma"
                            />
                        </StyledAttachment>
                        }
                    </>}
                </StyledLeftWrapper>
                {!isExpanded && <StyledRightWrapper className="rightWrapper">
                    {proForma && <StyledAttachmentIcon className="attachments">
                        <AttachmentIcon attachments={[proForma]}
                            onClick={(e) => this.onAttachmentClicked({
                                e,
                                payment,
                                proForma
                            })}
                            type="proForma"
                        />
                    </StyledAttachmentIcon>
                    }
                    {!!get(payment, "invoice") &&
                        <StyledAttachments className="attachments md">
                            <AttachmentIcon attachments={[get(payment, "invoice"), get(payment, "invoice")]} />
                        </StyledAttachments>}
                    {reportedDate &&
                        <StyledReportedDate className="reportedDateWrapper">{reportedDate}</StyledReportedDate>}
                    {actions && <StyledActions className="moreWrapper">
                        <Dropdown list={actions} icon={more} buttonBackgroundColor={"transparent"} />
                    </StyledActions>}
                </StyledRightWrapper>}
            </StyledPaymentRow>
            <StyledExpandedContainer isExpanded={isExpanded}>
                <div className="date">{dates}</div>
                <StyledExpandedRight>
                    <img src={SubmittedProForma} />
                    <div className="right-content">
                        <div>
                            <div>You've submitted a payment request for the January 1 - 31, 2019 payment period</div>
                        </div>
                        <div>
                            <div className="attachment-title">Pro Forma Invoice</div>
                            <Attachment attachments={[proForma]} displayName type = "proForma" bgColor="rgba(25, 117, 240, 0.05)"></Attachment>
                        </div>
                        <div>
                            <div className="attachment-title">Tax Invoice</div>
                            <Attachment attachments={[invoice]} displayName></Attachment>
                        </div>
                    </div>
                </StyledExpandedRight>
            </StyledExpandedContainer>
        </StyledPaymentContainer>;
    }
}

ContractorPaymentRowComponent.propTypes = {
    className: PropTypes.string,
    children: PropTypes.any,
    attachments: PropTypes.array,
    dates: PropTypes.string,
    actions: PropTypes.array,
    reportedDate: PropTypes.string,
    hasComment: PropTypes.bool,
    isMonthly: PropTypes.bool,
    amount: PropTypes.string,
    selectable: PropTypes.bool,
    selected: PropTypes.bool,
    onSelectClick: PropTypes.func,
    onSelectAttachmentClicked: PropTypes.func,
    onAttachmentClicked: PropTypes.func,
};

export default ContractorPaymentRowComponent;
