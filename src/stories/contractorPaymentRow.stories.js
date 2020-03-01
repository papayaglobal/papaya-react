import React from "react";
import {storiesOf} from "@storybook/react";
import {boolean, withKnobs} from "@storybook/addon-knobs";

import ContractorPaymentRow from "../Common/ContractorPaymentRow";

import "./stories.css";
import {INITIAL_VIEWPORTS} from "@storybook/addon-viewport";

const payments = [{
    "id": 14,
    "orgId": 4,
    "projectId": 8,
    "contractId": 55,
    "paymentPeriodId": 1429,
    "total": 440,
    "currency": "eur",
    "comment": "dfgdfg",
    "rejectReason": null,
    "status": "approved",
    "createdAt": "2020-02-26T13:53:14.000Z",
    "updatedAt": "2020-02-26T13:53:51.000Z",
    "updatedBy": "papaya admin",
    "contractorPaymentRequestInvoice": {
        "id": 14,
        "fileId": 394,
        "file": {
            "id": 394,
            "title": "3d-deco-light-superman-logo.jpg",
            "name": "3d-deco-light-superman-logo.jpg",
            "key": "dev/project/8/worker/66/contractor_payment_request_invoice/fa8ef024-8089-4982-b4e1-b7eda3239c80",
            "type": "contractor_payment_request_invoice",
            "uploadDate": "2020-02-26",
            "uploadedByUserId": "31",
            "directUrl": "http://customer-1.dev.papayaglobal.com:8080/api/v1/file/394/link?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjMxLCJrZXkiOiIzOTQiLCJpYXQiOjE1ODI3MzI0MTEsImV4cCI6MTU4MzMzNzIxMX0.GX0-sGjLWgmOdwxq1h2IPOwAw6NEdugshOcAlqe19os&viewMode=true",
            "createdAt": "2020-02-26T13:53:08.000Z",
            "updatedAt": "2020-02-26T13:53:08.000Z",
            "__typename": "File"
        },
        "contractorPaymentRequestId": 14,
        "createdAt": "2020-02-26T13:53:14.000Z",
        "updatedAt": "2020-02-26T13:53:14.000Z",
        "__typename": "PaymentRequestInvoice"
    },
    "contractorPaymentRequestProForma": [{
        "id": 27,
        "fileId": 395,
        "file": {
            "id": 395,
            "title": "Pro Forma Invoice - Alice Murray - February 1–29, 2020 - 2020-02-26 at 15:53 - Draft.pdf",
            "name": "Pro Forma Invoice - Alice Murray - February 1–29, 2020 - 2020-02-26 at 15:53 - Draft.pdf",
            "key": "dev/project/8/worker/66/pro_forma_approved/5c6907e0-2219-471d-b75f-7e5db752d4cc",
            "type": "pro_forma",
            "uploadDate": "2020-02-26",
            "uploadedByUserId": "31",
            "directUrl": "http://customer-1.dev.papayaglobal.com:8080/api/v1/file/395/link?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjMxLCJrZXkiOiIzOTUiLCJpYXQiOjE1ODI3MzI0MTEsImV4cCI6MTU4MzMzNzIxMX0.MX_PXEtxaUaC0ABTE9psvT8yD6HTSF5pvSWlpAsCFfA&viewMode=true",
            "createdAt": "2020-02-26T13:53:13.000Z",
            "updatedAt": "2020-02-26T13:53:13.000Z",
            "__typename": "File"
        },
        "contractorPaymentRequestId": 14,
        "createdAt": "2020-02-26T13:53:14.000Z",
        "updatedAt": "2020-02-26T13:53:14.000Z",
        "__typename": "PaymentRequestProForma"
    }, {
        "id": 28,
        "fileId": 396,
        "file": {
            "id": 396,
            "title": "Pro Forma Invoice - Alice Murray - February 1–29, 2020 - Approved.pdf",
            "name": "Pro Forma Invoice - Alice Murray - February 1–29, 2020 - Approved.pdf",
            "key": "dev/project/8/worker/66/pro_forma/291fd8ef-60ef-4710-be74-5379118f5250",
            "type": "pro_forma_approved",
            "uploadDate": "2020-02-26",
            "uploadedByUserId": "31",
            "directUrl": "http://customer-1.dev.papayaglobal.com:8080/api/v1/file/396/link?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjMxLCJrZXkiOiIzOTYiLCJpYXQiOjE1ODI3MzI0MTEsImV4cCI6MTU4MzMzNzIxMX0.Db8dM3D7DUtBsHITqiTo--SJdFoXTaogMckwibxjTDU&viewMode=true",
            "createdAt": "2020-02-26T13:53:14.000Z",
            "updatedAt": "2020-02-26T13:53:14.000Z",
            "__typename": "File"
        },
        "contractorPaymentRequestId": 14,
        "createdAt": "2020-02-26T13:53:14.000Z",
        "updatedAt": "2020-02-26T13:53:14.000Z",
        "__typename": "PaymentRequestProForma"
    }],
    "paymentPeriod": {
        "createdAt": "2020-01-14T12:24:01.000Z",
        "updatedAt": "2020-01-14T12:24:01.000Z",
        "id": "1429",
        "projectId": 8,
        "isPayrollSummaryDownloadReportEnabled": null,
        "startedAt": "2020-02-01",
        "endedAt": "2020-02-29",
        "paymentDueDate": null,
        "__typename": "PaymentPeriod"
    },
    "__typename": "PaymentRequest"
}];

const actions = [
    {
        name: "View Payslip",
        action: () => alert("Clicked View Payslip")
    },
    {
        name: "Download Payslip",
        action: () => alert("Clicked Download Payslip")
    },
    {
        name: "Report an Issue",
        action: () => alert("Clicked Report an Issue")
    }
];

storiesOf("Contractor Payment Row", module)
    .addParameters({viewport: {viewports: INITIAL_VIEWPORTS}})
    .addDecorator(withKnobs)
    .add("iphone6", () => (
        <ContractorPaymentRow
            payments={payments}
            actions={actions}
            isExpanded={false}
            selectable={boolean("selectable", false)}
            selected={true}
            onProFormaClicked={({payment, contractorPaymentRequestProForma}) => alert("clicked attachment pro forma")}
            onInvoiceClicked={({payment, contractorPaymentRequestProForma}) => alert("clicked attachment pro forma")}
        />
    ), {viewport: {defaultViewport: "iphone6"}})
    .add("Desktop", () => (
        <>
            <div className="app attachment" style={{width: "1260px"}}>
                <ContractorPaymentRow
                    isMonthly={true}
                    payments={payments}
                    actions={[]}
                    selectable={boolean("selectable", false)}
                    selected={false}
                    onProFormaClicked={({payment, contractorPaymentRequestProForma}) => alert("clicked attachment pro forma")}
                    onInvoiceClicked={({payment, contractorPaymentRequestProForma}) => alert("clicked attachment pro forma")}
                    onReviseClicked={({payment}) => alert("")}
                />
            </div>
        </>
    ), {viewport: {defaultViewport: "responsive"}});
