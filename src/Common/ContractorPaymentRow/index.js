import React, {Component} from "react";
import PropTypes from 'prop-types';
import styled from "styled-components";
import {find, get, isFunction, map, orderBy} from "lodash";
import moment from "moment";
import {
    CreatedDate,
    CreatedDateTime,
    StyledActions,
    StyledAmount,
    StyledAttachmentIcon,
    StyledAttachments,
    StyledAttachmentTitle,
    StyledDates,
    StyledExpandedContainer,
    StyledLeftWrapper,
    StyledListItem,
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
import {formatDateRange, fullDateResponsive, monYear, shortFullDate} from "../../Constants/date-utils";
import {Flex} from "../../papaya-styled-components/flex-components";
import {ReactComponent as SubmittedProForma} from "../../assets/icons/submitted-pro-forma.svg";
import {DARK1, STATUSCRITICAL, STATUSOK} from "../../Constants";
import {ReactComponent as RejectedProForma} from "../../assets/icons/rejected.svg";
import {ReactComponent as ApprovedProForma} from "../../assets/icons/approved.svg";
import Button from "../../Common/Button";
import {getValueWithCurrency} from "../../utils/currency";
import {sizes} from "../../Constants/mediaQueries";


const PAYMENT_REQUEST_STATUS = {
    NOT_SUBMITTED: "not_submitted",
    DRAFT: "draft",
    APPROVED: "approved",
    REVISIT: "revisit",
    PENDING_AUDIT: "pending_audit",
    REJECTED: "rejected",
    PENDING_APPROVAL: "pending_approval"
};

const RowWrapper = styled(Flex)`
    @media (max-width: ${sizes.md}px) {
        flex-direction: column;
    }
`;

const DateWrapper = styled(Flex)`
    @media (max-width: ${sizes.md}px) {
      display: block;
      margin: 0px 0px 0px 15px;
    }
`;

const FirstCollWrapper = styled(Flex)`
    width: 150px;
    margin: 0 15px 0 0;
    @media (max-width: ${sizes.md}px) {
        flex-direction: row-reverse;
        width: initial;
        margin: 0 0 15px 0;
    }
`;

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
    const {payment, onInvoiceClicked, onProFormaClicked, onReviseClicked, isLastPaymentRequest} = props || {};
    const {contractorPaymentRequestInvoice, contractorPaymentRequestProForma, createdAt, status, updatedAt, updatedBy, paymentPeriod} = payment || {};

    const dateRange = formatDateRange(paymentPeriod);
    const createdAtDate = moment(createdAt).format("DD MMM YYYY");
    const createdAtDateTime = moment(createdAt).format("hh:mm");

    const isRejected = status === PAYMENT_REQUEST_STATUS.REJECTED;
    const isApproved = status === PAYMENT_REQUEST_STATUS.APPROVED;
    const fileItemBackgroundColor = getBackgroundColorByStatus({status});

    const proforma = findProFormaByType({
        proFormaFiles: contractorPaymentRequestProForma,
        type: `pro_forma`
    });
    const approvedProforma = findProFormaByType({
        proFormaFiles: contractorPaymentRequestProForma,
        type: `pro_forma_approved`
    });

    const result = [<RowWrapper key={"payment-expanded-item"} row className={"expanded-container"}
                                margin={"0 0 20px 0"}>
        <FirstCollWrapper>
            <DateWrapper column flex={2} padding={"5px 0"}>
                <CreatedDate>{createdAtDate}</CreatedDate>
                <CreatedDateTime>{createdAtDateTime}</CreatedDateTime>
            </DateWrapper>
            <SubmittedProForma style={{color: DARK1}}/>
        </FirstCollWrapper>

        <Flex column flex={12}>
            <StyledSubmittedText><strong>You</strong>'ve submitted a payment request for the {dateRange} payment period</StyledSubmittedText>
            <StyledAttachmentTitle margin={"25px 0 5px 0 "}>Pro Forma Invoice</StyledAttachmentTitle>

            <ListItem
                hideClose={true}
                onClick={() => onProFormaClicked({
                    payment,
                    contractorPaymentRequestProForma: proforma
                })}
                bgColor={fileItemBackgroundColor}
                name={get(proforma, "file.name")}
            />

            {!!contractorPaymentRequestInvoice && <>
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
            </>}
        </Flex>
    </RowWrapper>];

    if (isRejected) {
        const rejectedAtDate = moment(updatedAt).format("DD MMM YYYY");
        const createdAtDateTime = moment(updatedAt).format("hh:mm");

        result.push(<RowWrapper key={"payment-expanded-item-rejected"} row className={"expanded-container-rejected"}
                                margin={"0 0 20px 0"}>
            <FirstCollWrapper>
                <DateWrapper column flex={2} padding={"5px 0"}>
                    <CreatedDate>{rejectedAtDate}</CreatedDate>
                    <CreatedDateTime>{createdAtDateTime}</CreatedDateTime>
                </DateWrapper>
                <RejectedProForma style={{color: STATUSCRITICAL}}/>
            </FirstCollWrapper>

            <Flex column flex={12}>
                <StyledSubmittedText><strong>{updatedBy}</strong> rejected your payment request.</StyledSubmittedText>

                {isLastPaymentRequest && <Button
                    style={{width: "220px", margin: "15px 0 0 0"}}
                    size="medium"
                    onClick={() => onReviseClicked({payment})}
                >Revise Payment Request</Button>}
            </Flex>
        </RowWrapper>)
    }

    if (isApproved) {
        const listItemBackground = "rgba(46,214,188,0.10)";
        const approvedAtDate = moment(updatedAt).format("DD MMM YYYY");
        const approvedAtDateTime = moment(updatedAt).format("hh:mm");
        result.push(<RowWrapper key={"payment-expanded-item-approved"} row className={"expanded-container-approved"}
                                margin={"0 0 20px 0"}>
            <FirstCollWrapper>
                <DateWrapper column flex={2} padding={"5px 0"}>
                    <CreatedDate>{approvedAtDate}</CreatedDate>
                    <CreatedDateTime>{approvedAtDateTime}</CreatedDateTime>
                </DateWrapper>

                <ApprovedProForma style={{color: STATUSOK}}/>
            </FirstCollWrapper>

            <Flex column flex={12}>
                <StyledSubmittedText><strong>{updatedBy}</strong> approved the payment request.</StyledSubmittedText>

                <StyledAttachmentTitle margin={"25px 0 5px 0 "}>Pro Forma Invoice</StyledAttachmentTitle>
                <ListItem
                    hideClose={true}
                    onClick={() => onProFormaClicked({
                        payment,
                        contractorPaymentRequestProForma: approvedProforma
                    })}
                    bgColor={listItemBackground}
                    name={get(approvedProforma, "file.name")}
                />

                {!!contractorPaymentRequestInvoice && <>
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
                </>}
            </Flex>
        </RowWrapper>)
    }

    return result;
};

const ContractorPaymentRowExpandedContainer = (props) => {
    const {payments, isExpanded, ...otherProps} = props;

    return <StyledExpandedContainer column isExpanded={isExpanded}>
        {map(payments, (payment, key) => <ContractorExpandedPaymentRow key={key} payment={payment}
                                                                       isLastPaymentRequest={payments.length === (key + 1)} {...otherProps}/>)}
    </StyledExpandedContainer>
};

const findProFormaByType = ({proFormaFiles, type}) => find(proFormaFiles, proForma => get(proForma, "file.type") === type);

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

    onReviseClicked = ({e, payment}) => {
        const {onReviseClicked} = this.props;
        e && e.stopPropagation();

        isFunction(onReviseClicked) && onReviseClicked({payment});
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
            payments,
            isMonthly
        } = this.props;
        const {isExpanded} = this.state;
        const orderedPayments = orderBy(payments, ["createdAt"], ["asc"]);
        const payment = get(orderedPayments, `[${orderedPayments.length - 1}]`);
        const {contractorPaymentRequestProForma, contractorPaymentRequestInvoice, total: value, currency, createdAt, status} = payment || {};

        const proforma = findProFormaByType({
            proFormaFiles: contractorPaymentRequestProForma,
            type: `pro_forma${status === "approved" ? "_approved" : ""}`
        });

        const {startedAt, endedAt} = get(payment, "paymentPeriod") || {};
        const dateRange = formatDateRange({startedAt, endedAt, format: isMonthly ? monYear : fullDateResponsive});
        const createdAtAsText = moment(createdAt).format(shortFullDate);

        return <StyledPaymentContainer className={className}>
            <StyledPaymentRow onClick={this.onPaymentClick} isExpanded>
                <StyledLeftWrapper className="leftWrapper">
                    {selectable && <StyledSelectWrapper className="selectWrapper">
                        <CheckBox checked={selected} onClick={(e) => this.onSelectClicked({e, payment: payments})}/>
                    </StyledSelectWrapper>}
                    <StyledRightArrow alt="Next" isExpanded={isExpanded} onClick={this.toggleCollapse}/>
                    <StyledDates className={"date-range"} isMonthly={isMonthly}>{dateRange}</StyledDates>
                    {!isExpanded && <>
                        {value && <StyledAmount justifyStart className="amountWrapper">{getValueWithCurrency({
                            currency,
                            value
                        })}</StyledAmount>}
                        {proforma && <StyledListItem
                            hideClose={true}
                            onClick={() => this.onProFormaClicked({
                                payment,
                                contractorPaymentRequestProForma: proforma
                            })}
                            name={get(proforma, "file.name")}
                        />
                        }
                    </>}
                </StyledLeftWrapper>
                {!isExpanded && <StyledRightWrapper className="rightWrapper">
                    {proforma && <StyledAttachmentIcon className="attachments">
                        <AttachmentIcon attachments={[proforma]}
                                        onClick={(e) => this.onProFormaClicked({
                                            e,
                                            payment,
                                            contractorPaymentRequestProForma: proforma
                                        })}
                                        type="proForma"
                        />
                    </StyledAttachmentIcon>
                    }
                    {!!contractorPaymentRequestInvoice && <StyledAttachments className="attachments md">
                        <AttachmentIcon attachments={[contractorPaymentRequestInvoice]}
                                        onClick={(e) => this.onInvoiceClicked({
                                            e,
                                            payment,
                                            contractorPaymentRequestInvoice
                                        })}
                        />
                    </StyledAttachments>}
                    {!!createdAtAsText &&
                    <StyledReportedDate className="reportedDateWrapper">{createdAtAsText}</StyledReportedDate>}
                    {actions && <StyledActions className="moreWrapper">
                        <Dropdown list={actions} icon={more} buttonBackgroundColor={"transparent"}/>
                    </StyledActions>}
                </StyledRightWrapper>}
            </StyledPaymentRow>


            <ContractorPaymentRowExpandedContainer payments={orderedPayments} isExpanded={isExpanded}
                                                   onReviseClicked={this.onReviseClicked}
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
    isMonthly: PropTypes.bool,
    selected: PropTypes.bool,
    onSelectClick: PropTypes.func,
    onProFormaClicked: PropTypes.func,
    onInvoiceClicked: PropTypes.func,
    onReviseClicked: PropTypes.func,
    payments: PropTypes.array
};

export default ContractorPaymentRow;
