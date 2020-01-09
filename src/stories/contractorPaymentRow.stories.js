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
    .add("Real Data2", () => (
        <>
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
                    dates={"November, 2019"}
                    reportedDate={"Dec 1, 2019"}
                    actions={[]}
                    isMonthly={boolean("isMonthly", true)}
                    selectable={boolean("selectable", false)}
                    selected={false}
                />
            </div>
        </>
    ), {viewport: {defaultViewport: "responsive"}});
