import React from "react";
import {storiesOf} from "@storybook/react";
import {array, text, withKnobs} from "@storybook/addon-knobs";

import ReportRow from "../Common/ReportRow";

import "./stories.css";

const actions = [
    {
        name: "Edit",
        action: () => alert("Clicked Edit")
    },
    {
        name: "Delete",
        action: () => alert("Clicked Delete")
    }
];

storiesOf("Report Row", module)
    .addDecorator(withKnobs)
    .add("Default", () => (
        <div className="app attachment">
            <ReportRow
                attachments={[{fileName: "file1.pdf"}]}
                comment={"my Comment"}
                pendingTooltip="Report Row with single attachment"
                dates={text("dates", "15-20 April 2019")}
                actions={actions}
                onClick={() => alert("report row clicked")}
                onAttachmentsClicked={() => alert("attachments clicks")}
            />
        </div>
    ))
    .add("Multiple Props", () => (
        <>
            <div className="app attachment">
                <ReportRow
                    type={text("type", "leave")}
                    attachments={array("attachments", [
                        {fileName: "file1.pdf"},
                        {fileName: "file2.pdf"},
                        {fileName: "file3.pdf"}
                    ])}
                    reportStatus={text("reportStatus", "planned")}
                    pendingTooltip={text("pendingTooltip", "Report Row with multiple attachment")}
                    dates={text("dates", "10 May 2019")}
                    reportedDate={text("reportedDate", "11 May 2019")}
                    actions={array("actions", actions)}
                    daysReported={text("daysReported", "1 Day")}
                />
            </div>
            <div className="app attachment">
                <ReportRow
                    type={text("type", "leave")}
                    attachments={array("attachments", [
                        {fileName: "file1.pdf"},
                        {fileName: "file2.pdf"},
                        {fileName: "file3.pdf"}
                    ])}
                    reportStatus={"history"}
                    pendingTooltip={text("pendingTooltip", "Report Row with multiple attachment")}
                    dates={text("dates", "10 May 2019")}
                    reportedDate={text("reportedDate", "11 May 2019")}
                    actions={array("actions", actions)}
                    daysReported={text("daysReported", "1 Day")}
                />
            </div>
            <div className="app attachment">
                <ReportRow
                    type={text("type", "sick")}
                    payPeriod={text("payPeriod", "13 - 31 Jan")}
                    attachments={array("attachments", [
                        {fileName: "file1.pdf"},
                        {fileName: "file2.pdf"},
                        {fileName: "file3.pdf"}
                    ])}
                    reportStatus={"history"}
                    pendingTooltip={text("pendingTooltip", "Report Row with multiple attachment")}
                    dates={text("dates", "10 May 2019")}
                    reportedDate={text("reportedDate", "11 May 2019")}
                    actions={array("actions", actions)}
                    daysReported={text("daysReported", "1 Day")}
                />
            </div>
            <div className="app attachment">
                <ReportRow
                    type={text("type", "leave")}
                    attachments={array("attachments", [
                        {fileName: "file1.pdf"},
                        {fileName: "file2.pdf"},
                        {fileName: "file3.pdf"}
                    ])}
                    reportStatus={"history"}
                    pendingTooltip={text("pendingTooltip", "Report Row with multiple attachment")}
                    dates={text("dates", "10 May 2019")}
                    reportedDate={text("reportedDate", "11 May 2019")}
                    actions={array("actions", actions)}
                    daysReported={text("daysReported", "1 Day")}
                />
            </div>
            <div className="app attachment">
                <ReportRow
                    type={text("type", "unpaid")}
                    attachments={array("attachments", [])}
                    reportStatus={"history"}
                    pendingTooltip={text("pendingTooltip", "Report Row with multiple attachment")}
                    dates={text("dates", "10 May 2019")}
                    reportedDate={text("reportedDate", "11 May 2019")}
                    actions={array("actions", actions)}
                    daysReported={text("daysReported", "1 Day")}
                    onClick={() => alert("clicked ReportRow")}
                />
            </div>
        </>
    ));
