import React from "react";
import {storiesOf} from "@storybook/react";
import {boolean, withKnobs} from "@storybook/addon-knobs";

import ContractorPaymentRow from "../Common/ContractorPaymentRow";

import "./stories.css";
import {INITIAL_VIEWPORTS} from "@storybook/addon-viewport";

const payments = [{
    "id": 12,
    "orgId": 4,
    "projectId": 8,
    "contractId": 55,
    "paymentPeriodId": 1429,
    "total": 245987.32,
    "currency": "kzt",
    "comment": "dfgdfgdfg",
    "rejectReason": "Not enough Moeeeeeeey",
    "status": "rejected",
    "updatedBy": "papaya admin",
    "createdAt": "2020-02-04T16:10:39.000Z",
    "updatedAt": "2020-02-06T09:15:55.000Z",
    "contractorPaymentRequestInvoice": {
        "id": 10,
        "fileId": 290,
        "file": {
            "id": 290,
            "title": "glyphicons-halflings-regular.woff2",
            "name": "glyphicons-halflings-regular.woff2",
            "key": "dev/project/8/worker/66/contractor_payment_request_invoice/b59ef542-265d-4bbd-8134-0674b4340934",
            "type": "contractor_payment_request_invoice",
            "uploadDate": "2020-02-04",
            "uploadedByUserId": "31",
            "directUrl": "http://customer-1.dev.papayaglobal.com:8080/api/v1/file/290/link?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjMxLCJrZXkiOiIyOTAiLCJpYXQiOjE1ODA5ODgxNzksImV4cCI6MTU4MTU5Mjk3OX0.RjCtJcZtNYnZbjszzu20ge9zwOTu3rxcYkyIMa_iQ-Q&viewMode=true",
            "createdAt": "2020-02-04T16:10:31.000Z",
            "updatedAt": "2020-02-04T16:10:31.000Z",
            "__typename": "File"
        },
        "contractorPaymentRequestId": 12,
        "createdAt": "2020-02-04T16:10:39.000Z",
        "updatedAt": "2020-02-04T16:10:39.000Z",
        "__typename": "PaymentRequestInvoice"
    },
    "contractorPaymentRequestProForma": {
        "id": 14,
        "fileId": 291,
        "file": {
            "id": 291,
            "title": "Pro Forma Invoice - Alice Murray - February 1–29, 2020 - 2020-02-04 at 10:38 - Draft.pdf",
            "name": "Pro Forma Invoice - Alice Murray - February 1–29, 2020 - 2020-02-04 at 10:38 - Draft.pdf",
            "key": "dev/project/8/worker/66/pro_forma/94ce9440-7449-4dc9-89cb-b502e5d54dd8",
            "type": "pro_forma",
            "uploadDate": "2020-02-04",
            "uploadedByUserId": "31",
            "directUrl": "http://customer-1.dev.papayaglobal.com:8080/api/v1/file/291/link?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjMxLCJrZXkiOiIyOTEiLCJpYXQiOjE1ODA5ODgxNzksImV4cCI6MTU4MTU5Mjk3OX0.a5o8dlvaJWUCpRYtQ89ldwDGMXNcNxjkOvd6Ygl2Wb0&viewMode=true",
            "createdAt": "2020-02-04T16:10:39.000Z",
            "updatedAt": "2020-02-04T16:10:39.000Z",
            "__typename": "File"
        },
        "contractorPaymentRequestId": 12,
        "createdAt": "2020-02-04T16:10:39.000Z",
        "updatedAt": "2020-02-04T16:10:39.000Z",
        "__typename": "PaymentRequestProForma"
    },
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
}, {
    "id": 15,
    "orgId": 4,
    "projectId": 8,
    "contractId": 55,
    "paymentPeriodId": 1429,
    "total": 245987.32,
    "currency": "kzt",
    "comment": "My Comment",
    "rejectReason": "2 time reject",
    "status": "approved",
    "updatedBy": "papaya admin",
    "createdAt": "2020-02-06T09:14:58.000Z",
    "updatedAt": "2020-02-06T09:47:18.000Z",
    "contractorPaymentRequestInvoice": {
        "id": 13,
        "fileId": 296,
        "file": {
            "id": 296,
            "title": "3d-deco-light-superman-logo.jpg",
            "name": "3d-deco-light-superman-logo.jpg",
            "key": "dev/project/8/worker/66/contractor_payment_request_invoice/d0e897b8-38f6-46ef-b251-d674d655c730",
            "type": "contractor_payment_request_invoice",
            "uploadDate": "2020-02-06",
            "uploadedByUserId": "31",
            "directUrl": "http://customer-1.dev.papayaglobal.com:8080/api/v1/file/296/link?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjMxLCJrZXkiOiIyOTYiLCJpYXQiOjE1ODA5ODgxNzksImV4cCI6MTU4MTU5Mjk3OX0.Wi5hAlwFici8jf4UjEURzmuz5Rd6Jf-ph0jEn-PFChM&viewMode=true",
            "createdAt": "2020-02-06T09:14:44.000Z",
            "updatedAt": "2020-02-06T09:14:44.000Z",
            "__typename": "File"
        },
        "contractorPaymentRequestId": 15,
        "createdAt": "2020-02-06T09:14:58.000Z",
        "updatedAt": "2020-02-06T09:14:58.000Z",
        "__typename": "PaymentRequestInvoice"
    },
    "contractorPaymentRequestProForma": [
        {
            "id": 17,
            "fileId": 297,
            "file": {
                "id": 297,
                "title": "Pro Forma Invoice - Alice Murray - February 1–29, 2020 - 2020-02-06 at 14:56 - Draft.pdf",
                "name": "Pro Forma Invoice - Alice Murray - February 1–29, 2020 - 2020-02-06 at 14:56 - Draft.pdf",
                "key": "dev/project/8/worker/66/pro_forma/64e52668-557c-48b0-bdf5-3f43cca60dec",
                "type": "pro_forma",
                "uploadDate": "2020-02-06",
                "uploadedByUserId": "31",
                "directUrl": "http://customer-1.dev.papayaglobal.com:8080/api/v1/file/297/link?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjMxLCJrZXkiOiIyOTciLCJpYXQiOjE1ODA5ODgxNzksImV4cCI6MTU4MTU5Mjk3OX0.GwPiYtlGzSdw2EPW38cbmmQhM5HvpmQL2IZBSgetrhU&viewMode=true",
                "createdAt": "2020-02-06T09:14:57.000Z",
                "updatedAt": "2020-02-06T09:14:57.000Z",
                "__typename": "File"
            },
            "contractorPaymentRequestId": 15,
            "createdAt": "2020-02-06T09:14:58.000Z",
            "updatedAt": "2020-02-06T09:14:58.000Z",
            "__typename": "PaymentRequestProForma"
        },
        {
            "id": 17,
            "fileId": 297,
            "file": {
                "id": 297,
                "title": "Pro Forma Invoice - Alice Murray - February 1–29, 2020 - 2020-02-06 at 14:56.pdf",
                "name": "Pro Forma Invoice - Alice Murray - February 1–29, 2020 - 2020-02-06 at 14:56.pdf",
                "key": "dev/project/8/worker/66/pro_forma/64e52668-557c-48b0-bdf5-3f43cca60dec",
                "type": "pro_forma_approved",
                "uploadDate": "2020-02-06",
                "uploadedByUserId": "31",
                "directUrl": "http://customer-1.dev.papayaglobal.com:8080/api/v1/file/297/link?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjMxLCJrZXkiOiIyOTciLCJpYXQiOjE1ODA5ODgxNzksImV4cCI6MTU4MTU5Mjk3OX0.GwPiYtlGzSdw2EPW38cbmmQhM5HvpmQL2IZBSgetrhU&viewMode=true",
                "createdAt": "2020-02-06T09:14:57.000Z",
                "updatedAt": "2020-02-06T09:14:57.000Z",
                "__typename": "File"
            },
            "contractorPaymentRequestId": 15,
            "createdAt": "2020-02-06T09:14:58.000Z",
            "updatedAt": "2020-02-06T09:14:58.000Z",
            "__typename": "PaymentRequestProForma"
        }
    ],
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
        <div className="app attachment">
            <ContractorPaymentRow
                payments={payments}
                actions={actions}
                selectable={boolean("selectable", false)}
                selected={true}
                onProFormaClicked={({payment, contractorPaymentRequestProForma}) => alert("clicked attachment pro forma")}
                onInvoiceClicked={({payment, contractorPaymentRequestProForma}) => alert("clicked attachment pro forma")}
            />
        </div>
    ), {viewport: {defaultViewport: "iphone6"}})
    .add("Desktop", () => (
        <>
            <div className="app attachment" style={{width: "1260px"}}>
                <ContractorPaymentRow
                    isMonthly={false}
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
