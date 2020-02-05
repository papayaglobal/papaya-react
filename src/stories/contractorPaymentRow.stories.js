import React from "react";
import {storiesOf} from "@storybook/react";
import {boolean, withKnobs} from "@storybook/addon-knobs";

import ContractorPaymentRow from "../Common/ContractorPaymentRow";

import "./stories.css";
import {INITIAL_VIEWPORTS} from "@storybook/addon-viewport";

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
                payment={{
                    proForma: {
                        file: {
                            name: "Invoice - 15 - 31 December 2018 Approved.pdf"
                        }
                    },
                    invoice: {
                        file: {
                            name: "Cornelia Morrison_jan2020.pdf"
                        }
                    }
                }}
                amount={"$7,705.58"}
                dates={"Nov 22, 2019"}
                reportedDate={"Dec 31, 2019"}
                actions={actions}
                isMonthly={boolean("isMonthly", false)}
                selectable={boolean("selectable", false)}
                selected={true}
            />
        </div>
    ), {viewport: {defaultViewport: "iphone6"}})
    .add("Desktop", () => (
        <>
            <div className="app attachment">
                <ContractorPaymentRow
                    payment={{
                        "id": 14,
                        "orgId": 4,
                        "projectId": 8,
                        "contractId": 38,
                        "paymentPeriodId": 1429,
                        "total": 0,
                        "currency": "kzt",
                        "comment": "asdasd",
                        "rejectReason": null,
                        "status": "pending_audit",
                        "updatedBy": null,
                        "createdAt": "2020-02-05T12:18:56.000Z",
                        "updatedAt": "2020-02-05T12:18:56.000Z",
                        "contractorPaymentRequestInvoice": {
                            "id": 12,
                            "fileId": 294,
                            "file": {
                                "id": 294,
                                "title": "20190903_161802.jpg",
                                "name": "20190903_161802.jpg",
                                "key": "dev/project/8/worker/52/contractor_payment_request_invoice/2474b433-a93b-4e15-aebf-45eac2a02150",
                                "type": "contractor_payment_request_invoice",
                                "uploadDate": "2020-02-05",
                                "uploadedByUserId": "84",
                                "directUrl": "http://customer-1.dev.papayaglobal.com:8080/api/v1/file/294/link?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjg0LCJrZXkiOiIyOTQiLCJpYXQiOjE1ODA5MTU4NTIsImV4cCI6MTU4MTUyMDY1Mn0.z_knHXXhXJjwq1en_6aGRKQX0uWSoFTm7C8VLi4zWSk&viewMode=true",
                                "createdAt": "2020-02-05T12:18:48.000Z",
                                "updatedAt": "2020-02-05T12:18:48.000Z",
                                "__typename": "File"
                            },
                            "contractorPaymentRequestId": 14,
                            "createdAt": "2020-02-05T12:18:56.000Z",
                            "updatedAt": "2020-02-05T12:18:56.000Z",
                            "__typename": "PaymentRequestInvoice"
                        },
                        "contractorPaymentRequestProForma": {
                            "id": 16,
                            "fileId": 295,
                            "file": {
                                "id": 295,
                                "title": "Pro Forma Invoice - Carrie Andreini - February 1–29, 2020 - 2020-02-05 at 18:54 - Draft.pdf",
                                "name": "Pro Forma Invoice - Carrie Andreini - February 1–29, 2020 - 2020-02-05 at 18:54 - Draft.pdf",
                                "key": "dev/project/8/worker/52/pro_forma/16b4f902-4f3c-45b0-bdec-b2c32cf31ba0",
                                "type": "pro_forma",
                                "uploadDate": "2020-02-05",
                                "uploadedByUserId": "84",
                                "directUrl": "http://customer-1.dev.papayaglobal.com:8080/api/v1/file/295/link?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjg0LCJrZXkiOiIyOTUiLCJpYXQiOjE1ODA5MTU4NTIsImV4cCI6MTU4MTUyMDY1Mn0.VSVeFzqHgodcspGwJGrz83RPYC9ziebl5GUV5bfM8HE&viewMode=true",
                                "createdAt": "2020-02-05T12:18:55.000Z",
                                "updatedAt": "2020-02-05T12:18:55.000Z",
                                "__typename": "File"
                            },
                            "contractorPaymentRequestId": 14,
                            "createdAt": "2020-02-05T12:18:56.000Z",
                            "updatedAt": "2020-02-05T12:18:56.000Z",
                            "__typename": "PaymentRequestProForma"
                        },
                        "__typename": "PaymentRequest"
                    }}
                    amount={"$7,705.58"}
                    dates={"November, 2019"}
                    reportedDate={"Dec 1, 2019"}
                    actions={[]}
                    isMonthly={boolean("isMonthly", true)}
                    selectable={boolean("selectable", false)}
                    selected={false}
                    onProFormaClicked={({payment, contractorPaymentRequestProForma}) => alert("clicked attachment pro forma")}
                />
            </div>
        </>
    ), {viewport: {defaultViewport: "responsive"}});
