import React from "react";
import {storiesOf} from "@storybook/react";
import {boolean, withKnobs} from "@storybook/addon-knobs";

import ContractorPaymentRow from "../Common/ContractorPaymentRow";

import "./stories.css";
import {INITIAL_VIEWPORTS} from "@storybook/addon-viewport";

const payments = [
    {
        "id": 44,
        "orgId": 19182,
        "projectId": 18731,
        "contractId": 44462,
        "paymentPeriodId": 136022,
        "total": 3314.14,
        "currency": "usd",
        "comment": "khbjg",
        "rejectReason": "x",
        "status": "rejected",
        "createdAt": "2020-03-04T19:22:14.000Z",
        "updatedAt": "2020-03-04T20:00:58.000Z",
        "updatedBy": "papaya admin",
        "contractorPaymentRequestInvoice": {
            "contractorPaymentRequestId": "136",
            "createdAt": "2020-03-25T13:33:59.000Z",
            "file": {
                "createdAt": "2020-03-25T13:33:54.000Z",
                "directUrl": "http://idan.dev.papayaglobal.com:8080/api/v1/file/648/link?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEwNCwia2V5IjoiNjQ4IiwiaWF0IjoxNTg1MTQ0NTY3LCJleHAiOjE1ODU3NDkzNjd9.QjCU2yiRiMG73TWo49Az5rrqKEa4jIleblpS0QxIFlM&viewMode=true",
                "id": "648",
                "key": "dev/project/72/worker/423/contractor_payment_request_invoice/e5ad8666-e140-47b2-8e7c-b006116130b5",
                "name": "idan contractor - Tax Invoice - March 1–31, 2020.pdf",
                "title": "idan contractor - Tax Invoice - March 1–31, 2020.pdf",
                "type": "contractor_payment_request_invoice",
                "updatedAt": "2020-03-25T13:33:54.000Z",
                "uploadDate": "2020-03-25",
                "uploadedByUserId": "104"
            },
            "fileId": "648",
            "id": "8",
            "updatedAt": "2020-03-25T13:33:59.000Z"
        },
        "contractorPaymentRequestProForma": [
            {
                "id": 87,
                "fileId": 102642,
                "file": {
                    "id": 102642,
                    "title": "Pro Forma Invoice - Contractor2 QA - March 1–31, 2020 - 2020-03-04 at 21:22 - Draft.pdf",
                    "name": "Pro Forma Invoice - Contractor2 QA - March 1–31, 2020 - 2020-03-04 at 21:22 - Draft.pdf",
                    "key": "staging/project/18731/worker/44197/pro_forma_approved/930bc4b3-ed9b-4144-84fb-be70c8a7b48f",
                    "type": "pro_forma",
                    "uploadDate": "2020-03-04",
                    "uploadedByUserId": "49256",
                    "directUrl": "https://test-contractors.staging.papayaglobal.com/api/v1/file/102642/link?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjQ5MjU2LCJrZXkiOiIxMDI2NDIiLCJpYXQiOjE1ODQwMjMxNjYsImV4cCI6MTU4NDYyNzk2Nn0.BW-M_AkP4tOJb_j-kUGg5RyQZVFJ9lqkRplfhH0CyA0&viewMode=true",
                    "createdAt": "2020-03-04T19:22:08.000Z",
                    "updatedAt": "2020-03-04T19:22:08.000Z",
                    "__typename": "File"
                },
                "contractorPaymentRequestId": 44,
                "createdAt": "2020-03-04T19:22:14.000Z",
                "updatedAt": "2020-03-04T19:22:14.000Z",
                "__typename": "PaymentRequestProForma"
            },
            {
                "id": 88,
                "fileId": 102643,
                "file": {
                    "id": 102643,
                    "title": "Pro Forma Invoice - Contractor2 QA - March 1–31, 2020 - Approved.pdf",
                    "name": "Pro Forma Invoice - Contractor2 QA - March 1–31, 2020 - Approved.pdf",
                    "key": "staging/project/18731/worker/44197/pro_forma/cd56e598-c4db-4e65-99e3-f29976288a89",
                    "type": "pro_forma_approved",
                    "uploadDate": "2020-03-04",
                    "uploadedByUserId": "49256",
                    "directUrl": "https://test-contractors.staging.papayaglobal.com/api/v1/file/102643/link?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjQ5MjU2LCJrZXkiOiIxMDI2NDMiLCJpYXQiOjE1ODQwMjMxNjYsImV4cCI6MTU4NDYyNzk2Nn0.pga0ihBBg1QUVxT_MeVN0WtNVwy3wh3JOLv1-EzSyg8&viewMode=true",
                    "createdAt": "2020-03-04T19:22:14.000Z",
                    "updatedAt": "2020-03-04T19:22:14.000Z",
                    "__typename": "File"
                },
                "contractorPaymentRequestId": 44,
                "createdAt": "2020-03-04T19:22:14.000Z",
                "updatedAt": "2020-03-04T19:22:14.000Z",
                "__typename": "PaymentRequestProForma"
            }
        ],
        "paymentPeriod": {
            "createdAt": "2020-02-17T12:24:33.000Z",
            "updatedAt": "2020-02-17T12:24:33.000Z",
            "id": "136022",
            "projectId": 18731,
            "isPayrollSummaryDownloadReportEnabled": null,
            "startedAt": "2020-03-01",
            "endedAt": "2020-03-31",
            "paymentDueDate": null,
            "__typename": "PaymentPeriod"
        },
        "__typename": "PaymentRequest"
    },
    {
        "id": 49,
        "orgId": 19182,
        "projectId": 18731,
        "contractId": 44462,
        "paymentPeriodId": 136022,
        "total": 3314.14,
        "currency": "usd",
        "comment": "khjg",
        "rejectReason": "gfcg",
        "status": "rejected",
        "createdAt": "2020-03-04T20:03:53.000Z",
        "updatedAt": "2020-03-05T16:33:48.000Z",
        "updatedBy": "papaya admin",
        "contractorPaymentRequestInvoice": {
            "contractorPaymentRequestId": "136",
            "createdAt": "2020-03-25T13:33:59.000Z",
            "file": {
                "createdAt": "2020-03-25T13:33:54.000Z",
                "directUrl": "http://idan.dev.papayaglobal.com:8080/api/v1/file/648/link?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEwNCwia2V5IjoiNjQ4IiwiaWF0IjoxNTg1MTQ0NTY3LCJleHAiOjE1ODU3NDkzNjd9.QjCU2yiRiMG73TWo49Az5rrqKEa4jIleblpS0QxIFlM&viewMode=true",
                "id": "648",
                "key": "dev/project/72/worker/423/contractor_payment_request_invoice/e5ad8666-e140-47b2-8e7c-b006116130b5",
                "name": "idan contractor - Tax Invoice - March 1–31, 2020.pdf",
                "title": "idan contractor - Tax Invoice - March 1–31, 2020.pdf",
                "type": "contractor_payment_request_invoice",
                "updatedAt": "2020-03-25T13:33:54.000Z",
                "uploadDate": "2020-03-25",
                "uploadedByUserId": "104"
            },
            "fileId": "648",
            "id": "8",
            "updatedAt": "2020-03-25T13:33:59.000Z"
        },
        "contractorPaymentRequestProForma": [
            {
                "id": 97,
                "fileId": 102652,
                "file": {
                    "id": 102652,
                    "title": "Pro Forma Invoice - Contractor2 QA - March 1–31, 2020 - 2020-03-04 at 22:03 - Draft.pdf",
                    "name": "Pro Forma Invoice - Contractor2 QA - March 1–31, 2020 - 2020-03-04 at 22:03 - Draft.pdf",
                    "key": "staging/project/18731/worker/44197/pro_forma_approved/3ff05a0c-b4b4-4aab-9327-bb528817862c",
                    "type": "pro_forma",
                    "uploadDate": "2020-03-04",
                    "uploadedByUserId": "49256",
                    "directUrl": "https://test-contractors.staging.papayaglobal.com/api/v1/file/102652/link?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjQ5MjU2LCJrZXkiOiIxMDI2NTIiLCJpYXQiOjE1ODQwMjMxNjYsImV4cCI6MTU4NDYyNzk2Nn0.MqCdMi5i2aJrUZDSwtz1_wzAPUMZtx2Jl5U_XcG7GIo&viewMode=true",
                    "createdAt": "2020-03-04T20:03:48.000Z",
                    "updatedAt": "2020-03-04T20:03:48.000Z",
                    "__typename": "File"
                },
                "contractorPaymentRequestId": 49,
                "createdAt": "2020-03-04T20:03:53.000Z",
                "updatedAt": "2020-03-04T20:03:53.000Z",
                "__typename": "PaymentRequestProForma"
            },
            {
                "id": 98,
                "fileId": 102653,
                "file": {
                    "id": 102653,
                    "title": "Pro Forma Invoice - Contractor2 QA - March 1–31, 2020 - Approved.pdf",
                    "name": "Pro Forma Invoice - Contractor2 QA - March 1–31, 2020 - Approved.pdf",
                    "key": "staging/project/18731/worker/44197/pro_forma/6663ad05-a6b9-40ae-9d0c-1878a365942d",
                    "type": "pro_forma_approved",
                    "uploadDate": "2020-03-04",
                    "uploadedByUserId": "49256",
                    "directUrl": "https://test-contractors.staging.papayaglobal.com/api/v1/file/102653/link?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjQ5MjU2LCJrZXkiOiIxMDI2NTMiLCJpYXQiOjE1ODQwMjMxNjYsImV4cCI6MTU4NDYyNzk2Nn0.gwpN-NMUUoCG29AHYtrKOrGMgKjuj_KkFKt_8gGWWds&viewMode=true",
                    "createdAt": "2020-03-04T20:03:53.000Z",
                    "updatedAt": "2020-03-04T20:03:53.000Z",
                    "__typename": "File"
                },
                "contractorPaymentRequestId": 49,
                "createdAt": "2020-03-04T20:03:53.000Z",
                "updatedAt": "2020-03-04T20:03:53.000Z",
                "__typename": "PaymentRequestProForma"
            }
        ],
        "paymentPeriod": {
            "createdAt": "2020-02-17T12:24:33.000Z",
            "updatedAt": "2020-02-17T12:24:33.000Z",
            "id": "136022",
            "projectId": 18731,
            "isPayrollSummaryDownloadReportEnabled": null,
            "startedAt": "2020-03-01",
            "endedAt": "2020-03-31",
            "paymentDueDate": null,
            "__typename": "PaymentPeriod"
        },
        "__typename": "PaymentRequest"
    },
    {
        "id": 73,
        "orgId": 19182,
        "projectId": 18731,
        "contractId": 44462,
        "paymentPeriodId": 136022,
        "total": 3341.8,
        "currency": "usd",
        "comment": "hgfdgfd",
        "rejectReason": "sdvsdv",
        "status": "rejected",
        "createdAt": "2020-03-12T09:48:00.000Z",
        "updatedAt": "2020-03-12T10:53:37.000Z",
        "updatedBy": "papaya admin",
        "contractorPaymentRequestInvoice": {
            "contractorPaymentRequestId": "136",
            "createdAt": "2020-03-25T13:33:59.000Z",
            "file": {
                "createdAt": "2020-03-25T13:33:54.000Z",
                "directUrl": "http://idan.dev.papayaglobal.com:8080/api/v1/file/648/link?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEwNCwia2V5IjoiNjQ4IiwiaWF0IjoxNTg1MTQ0NTY3LCJleHAiOjE1ODU3NDkzNjd9.QjCU2yiRiMG73TWo49Az5rrqKEa4jIleblpS0QxIFlM&viewMode=true",
                "id": "648",
                "key": "dev/project/72/worker/423/contractor_payment_request_invoice/e5ad8666-e140-47b2-8e7c-b006116130b5",
                "name": "idan contractor - Tax Invoice - March 1–31, 2020.pdf",
                "title": "idan contractor - Tax Invoice - March 1–31, 2020.pdf",
                "type": "contractor_payment_request_invoice",
                "updatedAt": "2020-03-25T13:33:54.000Z",
                "uploadDate": "2020-03-25",
                "uploadedByUserId": "104"
            },
            "fileId": "648",
            "id": "8",
            "updatedAt": "2020-03-25T13:33:59.000Z"
        },
        "contractorPaymentRequestProForma": [
            {
                "id": 137,
                "fileId": 105391,
                "file": {
                    "id": 105391,
                    "title": "Pro Forma Invoice - Contractor2 QA - March 1–31, 2020 - 2020-03-12 at 11:47 - Draft.pdf",
                    "name": "Pro Forma Invoice - Contractor2 QA - March 1–31, 2020 - 2020-03-12 at 11:47 - Draft.pdf",
                    "key": "staging/project/18731/worker/44197/pro_forma_approved/efe8a5f6-605d-41ab-acef-5b24cc167593",
                    "type": "pro_forma",
                    "uploadDate": "2020-03-12",
                    "uploadedByUserId": "49256",
                    "directUrl": "https://test-contractors.staging.papayaglobal.com/api/v1/file/105391/link?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjQ5MjU2LCJrZXkiOiIxMDUzOTEiLCJpYXQiOjE1ODQwMjMxNjYsImV4cCI6MTU4NDYyNzk2Nn0.Z-JKktCma2D9Z2a3sE21K4Te9DJxiO7PuQxNZBYS7Lk&viewMode=true",
                    "createdAt": "2020-03-12T09:47:55.000Z",
                    "updatedAt": "2020-03-12T09:47:55.000Z",
                    "__typename": "File"
                },
                "contractorPaymentRequestId": 73,
                "createdAt": "2020-03-12T09:48:00.000Z",
                "updatedAt": "2020-03-12T09:48:00.000Z",
                "__typename": "PaymentRequestProForma"
            },
            {
                "id": 138,
                "fileId": 105392,
                "file": {
                    "id": 105392,
                    "title": "Pro Forma Invoice - Contractor2 QA - March 1–31, 2020 - Approved.pdf",
                    "name": "Pro Forma Invoice - Contractor2 QA - March 1–31, 2020 - Approved.pdf",
                    "key": "staging/project/18731/worker/44197/pro_forma/512f5a29-c440-4217-84cb-7c402fe7b70d",
                    "type": "pro_forma_approved",
                    "uploadDate": "2020-03-12",
                    "uploadedByUserId": "49256",
                    "directUrl": "https://test-contractors.staging.papayaglobal.com/api/v1/file/105392/link?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjQ5MjU2LCJrZXkiOiIxMDUzOTIiLCJpYXQiOjE1ODQwMjMxNjYsImV4cCI6MTU4NDYyNzk2Nn0.cso3VRfj2-wh3QvZfOJlxSCDkHs2HHLLLLfSDvLhP_o&viewMode=true",
                    "createdAt": "2020-03-12T09:48:00.000Z",
                    "updatedAt": "2020-03-12T09:48:00.000Z",
                    "__typename": "File"
                },
                "contractorPaymentRequestId": 73,
                "createdAt": "2020-03-12T09:48:00.000Z",
                "updatedAt": "2020-03-12T09:48:00.000Z",
                "__typename": "PaymentRequestProForma"
            }
        ],
        "paymentPeriod": {
            "createdAt": "2020-02-17T12:24:33.000Z",
            "updatedAt": "2020-02-17T12:24:33.000Z",
            "id": "136022",
            "projectId": 18731,
            "isPayrollSummaryDownloadReportEnabled": null,
            "startedAt": "2020-03-01",
            "endedAt": "2020-03-31",
            "paymentDueDate": null,
            "__typename": "PaymentPeriod"
        },
        "__typename": "PaymentRequest"
    },
    {
        "id": 77,
        "orgId": 19182,
        "projectId": 18731,
        "contractId": 44462,
        "paymentPeriodId": 136022,
        "total": 3341.8,
        "currency": "usd",
        "comment": "sddsf",
        "rejectReason": "dfgdfg",
        "status": "pending_approval",
        "createdAt": "2020-03-12T11:01:20.000Z",
        "updatedAt": "2020-03-12T14:09:19.000Z",
        "updatedBy": "papaya admin",
        "contractorPaymentRequestInvoice": {
            "contractorPaymentRequestId": "136",
            "createdAt": "2020-03-25T13:33:59.000Z",
            "file": {
                "createdAt": "2020-03-25T13:33:54.000Z",
                "directUrl": "http://idan.dev.papayaglobal.com:8080/api/v1/file/648/link?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEwNCwia2V5IjoiNjQ4IiwiaWF0IjoxNTg1MTQ0NTY3LCJleHAiOjE1ODU3NDkzNjd9.QjCU2yiRiMG73TWo49Az5rrqKEa4jIleblpS0QxIFlM&viewMode=true",
                "id": "648",
                "key": "dev/project/72/worker/423/contractor_payment_request_invoice/e5ad8666-e140-47b2-8e7c-b006116130b5",
                "name": "idan contractor - Tax Invoice - March 1–31, 2020.pdf",
                "title": "idan contractor - Tax Invoice - March 1–31, 2020.pdf",
                "type": "contractor_payment_request_invoice",
                "updatedAt": "2020-03-25T13:33:54.000Z",
                "uploadDate": "2020-03-25",
                "uploadedByUserId": "104"
            },
            "fileId": "648",
            "id": "8",
            "updatedAt": "2020-03-25T13:33:59.000Z"
        },
        "contractorPaymentRequestProForma": [
            {
                "id": 145,
                "fileId": 105419,
                "file": {
                    "id": 105419,
                    "title": "Pro Forma Invoice - Contractor2 QA - March 1–31, 2020 - 2020-03-12 at 13:01 - Draft.pdf",
                    "name": "idan contractor - Pro Forma In...020-03-25 at 15:33 - Draft.pdf",
                    //Pro Forma Invoice - Contractor2 QA - March 1–31, 2020 - 2020-03-12 at 13:01 - Draft.pdf
                    "key": "staging/project/18731/worker/44197/pro_forma_approved/b0bccba8-1673-4f11-ad58-78df42bc3b51",
                    "type": "pro_forma",
                    "uploadDate": "2020-03-12",
                    "uploadedByUserId": "49256",
                    "directUrl": "https://test-contractors.staging.papayaglobal.com/api/v1/file/105419/link?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjQ5MjU2LCJrZXkiOiIxMDU0MTkiLCJpYXQiOjE1ODQwMjMxNjYsImV4cCI6MTU4NDYyNzk2Nn0.FhIWDReegkPjZXCLnnyjSNkokfMHofILpIFUshcv1_k&viewMode=true",
                    "createdAt": "2020-03-12T11:01:15.000Z",
                    "updatedAt": "2020-03-12T11:01:15.000Z",
                    "__typename": "File"
                },
                "contractorPaymentRequestId": 77,
                "createdAt": "2020-03-12T11:01:20.000Z",
                "updatedAt": "2020-03-12T11:01:20.000Z",
                "__typename": "PaymentRequestProForma"
            },
            {
                "id": 146,
                "fileId": 105420,
                "file": {
                    "id": 105420,
                    "title": "Pro Forma Invoice - Contractor2 QA - March 1–31, 2020 - Approved.pdf",
                    "name": "Pro Forma Invoice - Contractor2 QA - March 1–31, 2020 - Approved.pdf",
                    "key": "staging/project/18731/worker/44197/pro_forma/360be3a9-8682-48e2-a0c5-3aefaf92ac09",
                    "type": "pro_forma_approved",
                    "uploadDate": "2020-03-12",
                    "uploadedByUserId": "49256",
                    "directUrl": "https://test-contractors.staging.papayaglobal.com/api/v1/file/105420/link?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjQ5MjU2LCJrZXkiOiIxMDU0MjAiLCJpYXQiOjE1ODQwMjMxNjYsImV4cCI6MTU4NDYyNzk2Nn0.qoWe_p0FUZgMohwOEl2gra3IGKjPXMWXbhPm3TajoHo&viewMode=true",
                    "createdAt": "2020-03-12T11:01:20.000Z",
                    "updatedAt": "2020-03-12T11:01:20.000Z",
                    "__typename": "File"
                },
                "contractorPaymentRequestId": 77,
                "createdAt": "2020-03-12T11:01:20.000Z",
                "updatedAt": "2020-03-12T11:01:20.000Z",
                "__typename": "PaymentRequestProForma"
            }
        ],
        "paymentPeriod": {
            "createdAt": "2020-02-17T12:24:33.000Z",
            "updatedAt": "2020-02-17T12:24:33.000Z",
            "id": "136022",
            "projectId": 18731,
            "isPayrollSummaryDownloadReportEnabled": null,
            "startedAt": "2020-03-01",
            "endedAt": "2020-03-31",
            "paymentDueDate": null,
            "__typename": "PaymentPeriod"
        },
        "__typename": "PaymentRequest"
    }
];

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

const CUSTOM_VIEWPORTS = {
    GalaxyS9Plus: {
        name: 'Galaxy S9/8 Plus',
        styles: {
            width: '412px',
            height: '846px',
        },
    }
};

storiesOf("Contractor Payment Row", module)
    .addParameters({viewport: {viewports: {...INITIAL_VIEWPORTS, ...CUSTOM_VIEWPORTS}}})
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
            <div className="app attachment" style={{width: "766px"}}>
                <ContractorPaymentRow
                    isMonthly={true}
                    payments={payments}
                    actions={[]}
                    selectable={boolean("selectable", false)}
                    selected={false}
                    onProFormaClicked={({payment, contractorPaymentRequestProForma}) => alert("clicked attachment pro forma")}
                    onInvoiceClicked={({payment, contractorPaymentRequestProForma}) => alert("clicked attachment pro forma")}
                    onReviseClicked={({payment}) => alert("revise")}
                />
            </div>
        </>
    ), {viewport: {defaultViewport: "responsive"}});
