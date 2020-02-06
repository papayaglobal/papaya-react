import React, {Component} from "react";
import PropTypes from 'prop-types';
import {get, isFunction, orderBy} from "lodash";
import {
    StyledActions,
    StyledAmount,
    StyledAttachment,
    StyledAttachmentIcon,
    StyledAttachments,
    StyledDates,
    StyledLeftWrapper,
    StyledPaymentContainer,
    StyledPaymentRow,
    StyledReportedDate,
    StyledRightArrow,
    StyledRightWrapper,
    StyledSelectWrapper
} from "../ContractorPaymentRow/contractorPaymentRowHelpers";
import ListItem from "../../Common/ListItem"
import {CheckBox} from "../../Common/Checkbox";
import Dropdown from "../../Common/Dropdown";
import more from "../../assets/icons/More.svg";
import AttachmentIcon from "../../Common/AttachmentIcon";
import {ContractorPaymentRowExpandedContainer} from "./contractorPaymentRowExpanded";
import {formatDateRange, monYear} from "../../Constants/date-utils";

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

    onProFormaClicked = ({e, payment, contractorPaymentRequestProForma}) => {
        const {onProFormaClicked} = this.props;
        e.stopPropagation();

        isFunction(onProFormaClicked) && onProFormaClicked({payment, contractorPaymentRequestProForma});
    };

    onInvoiceClicked = ({e, payment, contractorPaymentRequestInvoice}) => {
        const {onInvoiceClicked} = this.props;
        e.stopPropagation();

        isFunction(onInvoiceClicked) && onInvoiceClicked({payment, contractorPaymentRequestInvoice});
    };

    onPaymentClick = (e) => {
        const {onClick} = this.props;
        e.stopPropagation();
        isFunction(onClick) && onClick();
    };

    render() {
        const {
            className,
            actions,
            reportedDate,
            selectable,
            selected,
            selectedAttachments = [],
            payments
        } = this.props;
        const {isExpanded} = this.state;
        const orderedPayments = orderBy(payments, ["createdAt"], ["asc"]);
        const payment = get(orderedPayments, `[${orderedPayments.length - 1}]`);
        const {contractorPaymentRequestProForma, contractorPaymentRequestInvoice, total} = payment || {};

        const {startedAt, endedAt} = get(payment, "paymentPeriod") || {};
        const dateRange = formatDateRange({startedAt, endedAt, format: monYear});

        return <StyledPaymentContainer>
            <StyledPaymentRow className={className} onClick={this.onPaymentClick} isExpanded>
                <StyledLeftWrapper className="leftWrapper">
                    {selectable && <StyledSelectWrapper className="selectWrapper">
                        <CheckBox checked={selected} onClick={(e) => this.onSelectClicked({e, payment})}/>
                    </StyledSelectWrapper>}
                    <StyledRightArrow alt="Next" isExpanded={isExpanded} onClick={this.toggleCollapse}/>
                    <StyledDates isMonthly={true}>{dateRange}</StyledDates>
                    {!isExpanded && <>
                        {total && <StyledAmount className="amountWrapper">{total}</StyledAmount>}
                        {contractorPaymentRequestProForma && <StyledAttachment className="attachments">
                            <ListItem
                                hideClose={true}
                                onClick={(e) => this.onProFormaClicked({
                                    e,
                                    payment,
                                    contractorPaymentRequestProForma
                                })}
                                name={get(contractorPaymentRequestProForma, "file.name")}
                            />
                        </StyledAttachment>
                        }
                    </>}
                </StyledLeftWrapper>
                {!isExpanded && <StyledRightWrapper className="rightWrapper">
                    {contractorPaymentRequestProForma && <StyledAttachmentIcon className="attachments">
                        <AttachmentIcon attachments={[contractorPaymentRequestProForma]}
                                        onClick={(e) => this.onProFormaClicked({
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


            <ContractorPaymentRowExpandedContainer payments={orderedPayments} isExpanded={isExpanded}/>

        </StyledPaymentContainer>;
    }
}

ContractorPaymentRowComponent.propTypes = {
    className: PropTypes.string,
    children: PropTypes.any,
    attachments: PropTypes.array,
    actions: PropTypes.array,
    reportedDate: PropTypes.string,
    hasComment: PropTypes.bool,
    isMonthly: PropTypes.bool,
    selectable: PropTypes.bool,
    isExpanded: PropTypes.bool,
    selected: PropTypes.bool,
    onSelectClick: PropTypes.func,
    onSelectAttachmentClicked: PropTypes.func,
    onProFormaClicked: PropTypes.func,
    onInvoiceClicked: PropTypes.func,
    payments: PropTypes.array
};

export default ContractorPaymentRowComponent;
