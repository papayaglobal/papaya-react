import React, {Component} from "react";
import PropTypes from 'prop-types';
import {get, isFunction} from "lodash";
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
import {CheckBox} from "../../Common/Checkbox";
import Dropdown from "../../Common/Dropdown";
import more from "../../assets/icons/More.svg";
import SubmittedProForma from "../../assets/icons/submitted-pro-forma.svg"
import AttachmentIcon from "../../Common/AttachmentIcon";

class ContractorPaymentRowComponent extends Component {
    state = {
        isExpanded: get(this.props, "isExpanded", false)
    };

    toggleCollapse = (e) => {
        e.stopPropagation();
        this.setState({
            isExpanded: !this.state.isExpanded
        });
    };

    onSelectClicked = ({e, payment}) => {
        const {onSelectClick} = this.props;
        e.stopPropagation();

        isFunction(onSelectClick) && onSelectClick({payment});
    };

    onSelectAttachmentClicked = ({e, payment, attachment}) => {
        const {onSelectAttachmentClicked} = this.props;
        e.stopPropagation();

        isFunction(onSelectAttachmentClicked) && onSelectAttachmentClicked({payment, attachment});
    };

    onAttachmentClicked = ({e, payment, contractorPaymentRequestProForma}) => {
        const {onAttachmentClicked} = this.props;
        e.stopPropagation();

        isFunction(onAttachmentClicked) && onAttachmentClicked({payment, contractorPaymentRequestProForma});
    };

    onPaymentClick = (e) => {
        const {onClick} = this.props;
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
            selectable,
            selected,
            selectedAttachments = [],
            payment
        } = this.props;
        const {isExpanded} = this.state;
        const {contractorPaymentRequestProForma, contractorPaymentRequestInvoice, total} = payment || {};

        return <StyledPaymentContainer>
            <StyledPaymentRow className={className} onClick={this.onPaymentClick} isExpanded>
                <StyledLeftWrapper className="leftWrapper">
                    {selectable && <StyledSelectWrapper className="selectWrapper">
                        <CheckBox checked={selected} onClick={(e) => this.onSelectClicked({e, payment})}/>
                    </StyledSelectWrapper>}
                    <StyledRightArrow alt="Next" isExpanded={isExpanded} onClick={this.toggleCollapse}/>
                    <StyledDates isMonthly={isMonthly}>{dates}</StyledDates>
                    {!isExpanded && <>
                        {total && <StyledAmount className="amountWrapper">{total}</StyledAmount>}
                        {contractorPaymentRequestProForma && <StyledAttachment className="attachments">
                            <Attachment attachments={[contractorPaymentRequestProForma]}
                                        onClick={(e) => this.onAttachmentClicked({
                                            e,
                                            payment,
                                            contractorPaymentRequestProForma
                                        })}
                                        displayName
                                        type="proForma"
                            />
                        </StyledAttachment>
                        }
                    </>}
                </StyledLeftWrapper>
                {!isExpanded && <StyledRightWrapper className="rightWrapper">
                    {contractorPaymentRequestProForma && <StyledAttachmentIcon className="attachments">
                        <AttachmentIcon attachments={[contractorPaymentRequestProForma]}
                                        onClick={(e) => this.onAttachmentClicked({
                                            e,
                                            payment,
                                            contractorPaymentRequestProForma
                                        })}
                                        type="proForma"
                        />
                    </StyledAttachmentIcon>
                    }
                    {!!contractorPaymentRequestInvoice && <StyledAttachments className="attachments md">
                        <AttachmentIcon attachments={[contractorPaymentRequestInvoice]}/>
                    </StyledAttachments>}
                    {reportedDate &&
                    <StyledReportedDate className="reportedDateWrapper">{reportedDate}</StyledReportedDate>}
                    {actions && <StyledActions className="moreWrapper">
                        <Dropdown list={actions} icon={more} buttonBackgroundColor={"transparent"}/>
                    </StyledActions>}
                </StyledRightWrapper>}
            </StyledPaymentRow>
            <StyledExpandedContainer isExpanded={isExpanded}>
                <div className="date">{dates}</div>
                <StyledExpandedRight>
                    <img src={SubmittedProForma}/>
                    <div className="right-content">
                        <div>
                            <div>You've submitted a payment request for the January 1 - 31, 2019 payment period</div>
                        </div>
                        <div>
                            <div className="attachment-title">Pro Forma Invoice</div>
                            <Attachment attachments={[contractorPaymentRequestProForma]} displayName type="proForma"
                                        bgColor="rgba(25, 117, 240, 0.05)"></Attachment>
                        </div>
                        <div>
                            <div className="attachment-title">Tax Invoice</div>
                            <Attachment attachments={[contractorPaymentRequestInvoice]} displayName></Attachment>
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
    selectable: PropTypes.bool,
    isExpanded: PropTypes.bool,
    selected: PropTypes.bool,
    onSelectClick: PropTypes.func,
    onSelectAttachmentClicked: PropTypes.func,
    onAttachmentClicked: PropTypes.func,
};

export default ContractorPaymentRowComponent;
