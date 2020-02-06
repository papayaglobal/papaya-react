import React, {Component} from "react";
import PropTypes from 'prop-types';
import {get, isFunction, map, orderBy} from "lodash";
import moment from "moment";
import {
    CreatedDate,
    CreatedDateTime,
    StyledActions,
    StyledAmount,
    StyledAttachment,
    StyledAttachmentIcon,
    StyledAttachments,
    StyledAttachmentTitle,
    StyledDates,
    StyledExpandedContainer,
    StyledLeftWrapper,
    StyledPaymentContainer,
    StyledPaymentRow,
    StyledReportedDate,
    StyledRightArrow,
    StyledRightWrapper,
    StyledSelectWrapper,
    StyledSubmittedText
} from "../../papaya-styled-components/contractorPaymentRowHelpers";
import ListItem from "../../Common/ListItem"
import {CheckBox} from "../../Common/Checkbox";
import Dropdown from "../../Common/Dropdown";
import more from "../../assets/icons/More.svg";
import AttachmentIcon from "../../Common/AttachmentIcon";
import {formatDateRange, monYear, shortFullDate} from "../../Constants/date-utils";
import {Flex} from "../../papaya-styled-components/flex-components";
import {ReactComponent as SubmittedProForma} from "../../assets/icons/submitted-pro-forma.svg";
import {DARK1, STATUSCRITICAL, STATUSOK} from "../../Constants";
import {ReactComponent as RejectedProForma} from "../../assets/icons/rejected.svg";
import {ReactComponent as ApprovedProForma} from "../../assets/icons/approved.svg";


const PAYMENT_REQUEST_STATUS = {
    NOT_SUBMITTED: "not_submitted",
    DRAFT: "draft",
    APPROVED: "approved",
    REVISIT: "revisit",
    PENDING_AUDIT: "pending_audit",
    REJECTED: "rejected",
    PENDING_APPROVAL: "pending_approval"
};

const getBackgroundColorByStatus = ({status}) => {
    switch (status) {
        case PAYMENT_REQUEST_STATUS.REJECTED:
            return "rgba(248,83,89,0.10)";
        case PAYMENT_REQUEST_STATUS.APPROVED:
        default:
            return null;
    }
};

const ContractorExpandedPaymentRow = (props) => {
    const {payment, onInvoiceClicked, onProFormaClicked} = props || {};
    const {contractorPaymentRequestInvoice, contractorPaymentRequestProForma, createdAt, status, updatedAt, updatedBy, paymentPeriod} = payment || {};

    const dateRange = formatDateRange(paymentPeriod);
    const createdAtDate = moment(createdAt).format("DD MMM YYYY");
    const createdAtDateTime = moment(createdAt).format("hh:mm");

    const isRejected = status === PAYMENT_REQUEST_STATUS.REJECTED;
    const isApproved = status === PAYMENT_REQUEST_STATUS.APPROVED;
    const fileItemBackgroundColor = getBackgroundColorByStatus({status});

    const result = [<Flex key={"payment-expanded-item"} row className={"expanded-container"} margin={"0 0 20px 0"}>
        <Flex column flex={2} padding={"5px 0"}>
            <CreatedDate>{createdAtDate}</CreatedDate>
            <CreatedDateTime>{createdAtDateTime}</CreatedDateTime>
        </Flex>
        <Flex column flex={0.5}>
            <SubmittedProForma style={{color: DARK1}}/>
        </Flex>
        <Flex column flex={12}>
            <StyledSubmittedText><strong>You</strong>'ve submitted a payment request for the {dateRange} payment period</StyledSubmittedText>
            <StyledAttachmentTitle margin={"25px 0 5px 0 "}>Pro Forma Invoice</StyledAttachmentTitle>

            <ListItem
                hideClose={true}
                onClick={() => onProFormaClicked({
                    payment,
                    contractorPaymentRequestProForma
                })}
                bgColor={fileItemBackgroundColor}
                name={get(contractorPaymentRequestProForma, "file.name")}
            />

            <StyledAttachmentTitle margin={"25px 0 5px 0 "}>Tax Invoice</StyledAttachmentTitle>
            <ListItem
                hideClose={true}
                onClick={() => onInvoiceClicked({
                    payment,
                    contractorPaymentRequestInvoice
                })}
                bgColor={fileItemBackgroundColor}
                name={get(contractorPaymentRequestInvoice, "file.name")}
            />
        </Flex>
    </Flex>];

    if (isRejected) {
        const rejectedAtDate = moment(updatedAt).format("DD MMM YYYY");
        const createdAtDateTime = moment(updatedAt).format("hh:mm");

        result.push(<Flex key={"payment-expanded-item-rejected"} row className={"expanded-container-rejected"}
                          margin={"0 0 20px 0"}>
            <Flex column flex={2} padding={"5px 0"}>
                <CreatedDate>{rejectedAtDate}</CreatedDate>
                <CreatedDateTime>{createdAtDateTime}</CreatedDateTime>
            </Flex>
            <Flex column flex={0.5}>
                <RejectedProForma style={{color: STATUSCRITICAL}}/>
            </Flex>
            <Flex column flex={12}>
                <StyledSubmittedText><strong>{updatedBy}</strong> rejected your payment request.</StyledSubmittedText>
            </Flex>
        </Flex>)
    }

    if (isApproved) {
        const listItemBackground = "rgba(46,214,188,0.10)";
        result.push(<Flex key={"payment-expanded-item-approved"} row className={"expanded-container-approved"}
                          margin={"0 0 20px 0"}>
            <Flex column flex={2} padding={"5px 0"}>
                <CreatedDate>{createdAtDate}</CreatedDate>
                <CreatedDateTime>{createdAtDateTime}</CreatedDateTime>
            </Flex>
            <Flex column flex={0.5}>
                <ApprovedProForma style={{color: STATUSOK}}/>
            </Flex>
            <Flex column flex={12}>
                <StyledSubmittedText><strong>{updatedBy}</strong> approved the payment request.</StyledSubmittedText>

                <StyledAttachmentTitle margin={"25px 0 5px 0 "}>Pro Forma Invoice</StyledAttachmentTitle>
                <ListItem
                    hideClose={true}
                    onClick={() => onProFormaClicked({
                        payment,
                        contractorPaymentRequestProForma
                    })}
                    bgColor={listItemBackground}
                    name={get(contractorPaymentRequestProForma, "file.name")}
                />

                <StyledAttachmentTitle margin={"25px 0 5px 0 "}>Tax Invoice</StyledAttachmentTitle>
                <ListItem
                    hideClose={true}
                    onClick={() => onInvoiceClicked({
                        payment,
                        contractorPaymentRequestInvoice
                    })}
                    bgColor={listItemBackground}
                    name={get(contractorPaymentRequestInvoice, "file.name")}
                />
            </Flex>
        </Flex>)
    }

    return result;
};

const ContractorPaymentRowExpandedContainer = (props) => {
    const {payments, isExpanded, ...otherProps} = props;

    return <StyledExpandedContainer column isExpanded={isExpanded}>
        {map(payments, (payment, key) => <ContractorExpandedPaymentRow key={key} payment={payment} {...otherProps}/>)}
    </StyledExpandedContainer>
};


class ContractorPaymentRow extends Component {
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

    onProFormaClicked = ({e, payment, contractorPaymentRequestProForma}) => {
        const {onProFormaClicked} = this.props;
        e && e.stopPropagation();

        isFunction(onProFormaClicked) && onProFormaClicked({payment, contractorPaymentRequestProForma});
    };

    onInvoiceClicked = ({e, payment, contractorPaymentRequestInvoice}) => {
        const {onInvoiceClicked} = this.props;
        e && e.stopPropagation();

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
            selectable,
            selected,
            selectedAttachments = [],
            payments
        } = this.props;
        const {isExpanded} = this.state;
        const orderedPayments = orderBy(payments, ["createdAt"], ["asc"]);
        const payment = get(orderedPayments, `[${orderedPayments.length - 1}]`);
        const {contractorPaymentRequestProForma, contractorPaymentRequestInvoice, total, createdAt} = payment || {};

        const {startedAt, endedAt} = get(payment, "paymentPeriod") || {};
        const dateRange = formatDateRange({startedAt, endedAt, format: monYear});
        const createdAtAsText = moment(createdAt).format(shortFullDate);

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
                                onClick={() => this.onProFormaClicked({
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
                    {!!createdAtAsText &&
                    <StyledReportedDate className="reportedDateWrapper">{createdAtAsText}</StyledReportedDate>}
                    {actions && <StyledActions className="moreWrapper">
                        <Dropdown list={actions} icon={more} buttonBackgroundColor={"transparent"}/>
                    </StyledActions>}
                </StyledRightWrapper>}
            </StyledPaymentRow>


            <ContractorPaymentRowExpandedContainer payments={orderedPayments} isExpanded={isExpanded}
                                                   onInvoiceClicked={this.onInvoiceClicked}
                                                   onProFormaClicked={this.onProFormaClicked}/>

        </StyledPaymentContainer>;
    }
}

ContractorPaymentRow.propTypes = {
    className: PropTypes.string,
    children: PropTypes.any,
    actions: PropTypes.array,
    selectable: PropTypes.bool,
    isExpanded: PropTypes.bool,
    selected: PropTypes.bool,
    onSelectClick: PropTypes.func,
    onProFormaClicked: PropTypes.func,
    onInvoiceClicked: PropTypes.func,
    payments: PropTypes.array
};

export default ContractorPaymentRow;
