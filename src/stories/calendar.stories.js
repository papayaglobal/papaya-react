import React from "react";
import {storiesOf} from "@storybook/react";
import {array, boolean, object, text, withKnobs} from "@storybook/addon-knobs";

import Calendar from "../Common/Calendar";

import "./stories.css";

storiesOf("Calendar", module)
    .addDecorator(withKnobs)
    .add("Default", () => (
        <div className="app calendar">
            <Calendar flat={boolean("flat", true)}/>
        </div>
    ))
    .add("With Vacation Leaves", () => (
        <div className="app calendar">
            <Calendar
                vacationLeaves={array("vacationLeaves", [
                    "2019/04/03",
                    "2019/04/12",
                    "2019/04/26",
                    "2019/04/27",
                    "2019/04/28"
                ])}
            />
        </div>
    ))
    .add("With Sick Leaves", () => (
        <div className="app calendar">
            <Calendar
                sickLeaves={array("sickLeaves", [
                    "2019/04/03",
                    "2019/04/12",
                    "2019/04/26",
                    "2019/04/27",
                    "2019/04/28"
                ])}
            />
        </div>
    ))
    .add("Calendar - new Props (Unpaid / Sick / Leave )", () => (
        <div className="app calendar">
            <Calendar
                weekStartsOn={text("weekStartsOn", "monday")}
                currentPeriod={object("currentPeriod", {
                    createdAt: "2019-07-02T10:52:01.000Z",
                    endedAt: "2019-12-31",
                    id: "13",
                    isPayrollSummaryDownloadReportEnabled: null,
                    isSalaryUpdatesPublishOrComplete: false,
                    paymentDueDate: "2019-12-31",
                    projectId: 10,
                    startedAt: "2019-12-01",
                    updatedAt: "2019-07-02T10:52:01.000Z"
                })}
                nextPeriod={object("nextPeriod", {
                    createdAt: "2019-08-27T12:51:15.000Z",
                    endedAt: "2020-01-31",
                    id: "145",
                    isPayrollSummaryDownloadReportEnabled: null,
                    paymentDueDate: "2020-01-31",
                    projectId: 10,
                    startedAt: "2020-01-01",
                    updatedAt: "2019-08-27T12:51:15.000Z"
                })}
                ptoItems={[{
                    "id": 4,
                    "type": "sick",
                    "start": "2019-10-20",
                    "end": "2019-10-26",
                    "reportedByUserId": 33,
                    "dateDisplayType": "SINGLE_DAY",
                    "netDays": 1,
                    "comment": "",
                    "workerReport": {
                        "id": "14",
                        "paymentPeriodId": 10,
                        "paymentPeriod": {
                            "createdAt": "2019-07-02T10:52:01.000Z",
                            "updatedAt": "2019-07-02T10:52:01.000Z",
                            "id": "10",
                            "projectId": 10,
                            "isPayrollSummaryDownloadReportEnabled": null,
                            "startedAt": "2019-09-01",
                            "endedAt": "2019-09-30",
                            "__typename": "WorkerReportPaymentPeriod"
                        },
                        "__typename": "WorkerReport"
                    },
                    "informationSource": null,
                    "attachments": [
                        {
                            "id": 4,
                            "ptoItemId": 4,
                            "fileId": 63,
                            "file": {
                                "id": 63,
                                "title": "3d-deco-light-superman-logo.jpg",
                                "name": "3d-deco-light-superman-logo.jpg",
                                "key": "dev/project/10/worker/363/pto_attachment/100433f7-c6f5-479e-afc6-fc6812af2851",
                                "type": "pto_attachment",
                                "uploadDate": "2019-09-23",
                                "uploadedByUserId": "33",
                                "directUrl": "http://customer-1.dev.papayaglobal.com:8080/api/v1/file/63/link?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjQ2LCJrZXkiOiI2MyIsImlhdCI6MTU3NTgxNDcwNCwiZXhwIjoxNTc2NDE5NTA0fQ.5oScrTcV6gzJ7qnfSCEQ_XvSeKu13Rc7NZLZQAfn75Y&viewMode=true",
                                "createdAt": "2019-09-23T14:17:28.000Z",
                                "updatedAt": "2019-09-23T14:17:28.000Z",
                                "__typename": "File"
                            },
                            "createdAt": "2019-09-23T14:17:40.000Z",
                            "updatedAt": "2019-09-23T14:17:40.000Z",
                            "__typename": "PtoItemAttachment"
                        }
                    ],
                    "createdAt": "2019-09-23T14:17:40.000Z",
                    "updatedAt": "2019-09-23T14:17:40.000Z",
                    "__typename": "PtoItem"
                },
                    {
                        "id": 5,
                        "type": "leave",
                        "start": "2019-09-19",
                        "end": "2019-09-19",
                        "reportedByUserId": 33,
                        "dateDisplayType": "SINGLE_DAY",
                        "netDays": 1,
                        "comment": "",
                        "workerReport": {
                            "id": "14",
                            "paymentPeriodId": 10,
                            "paymentPeriod": {
                                "createdAt": "2019-07-02T10:52:01.000Z",
                                "updatedAt": "2019-07-02T10:52:01.000Z",
                                "id": "10",
                                "projectId": 10,
                                "isPayrollSummaryDownloadReportEnabled": null,
                                "startedAt": "2019-09-01",
                                "endedAt": "2019-09-30",
                                "__typename": "WorkerReportPaymentPeriod"
                            },
                            "__typename": "WorkerReport"
                        },
                        "informationSource": null,
                        "attachments": [
                            {
                                "id": 5,
                                "ptoItemId": 5,
                                "fileId": 64,
                                "file": {
                                    "id": 64,
                                    "title": "3d-deco-light-superman-logo.jpg",
                                    "name": "3d-deco-light-superman-logo.jpg",
                                    "key": "dev/project/10/worker/363/pto_attachment/32466745-10b7-4a2f-acdc-1c178cbc2dea",
                                    "type": "pto_attachment",
                                    "uploadDate": "2019-09-23",
                                    "uploadedByUserId": "33",
                                    "directUrl": "http://customer-1.dev.papayaglobal.com:8080/api/v1/file/64/link?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjQ2LCJrZXkiOiI2NCIsImlhdCI6MTU3NTgxNDcwNCwiZXhwIjoxNTc2NDE5NTA0fQ.Ymn4T2uTJLNzAMN4mfHOhmOyopsQBXTF0Og51Jq01ZQ&viewMode=true",
                                    "createdAt": "2019-09-23T14:34:41.000Z",
                                    "updatedAt": "2019-09-23T14:34:41.000Z",
                                    "__typename": "File"
                                },
                                "createdAt": "2019-09-23T14:34:44.000Z",
                                "updatedAt": "2019-09-23T14:34:44.000Z",
                                "__typename": "PtoItemAttachment"
                            }
                        ],
                        "createdAt": "2019-09-23T14:34:44.000Z",
                        "updatedAt": "2019-09-23T14:34:44.000Z",
                        "__typename": "PtoItem"
                    },
                    {
                        "id": 8,
                        "type": "leave",
                        "start": "2019-11-07",
                        "end": "2019-11-08",
                        "reportedByUserId": 46,
                        "dateDisplayType": "DATE_RANGE",
                        "netDays": 2,
                        "comment": "8NovVacation1234",
                        "workerReport": {
                            "id": "17",
                            "paymentPeriodId": 12,
                            "paymentPeriod": {
                                "createdAt": "2019-07-02T10:52:01.000Z",
                                "updatedAt": "2019-11-24T15:41:45.000Z",
                                "id": "12",
                                "projectId": 10,
                                "isPayrollSummaryDownloadReportEnabled": 1,
                                "startedAt": "2019-11-01",
                                "endedAt": "2019-11-30",
                                "__typename": "WorkerReportPaymentPeriod"
                            },
                            "__typename": "WorkerReport"
                        },
                        "informationSource": null,
                        "attachments": [],
                        "createdAt": "2019-11-06T09:10:08.000Z",
                        "updatedAt": "2019-11-07T14:38:28.000Z",
                        "__typename": "PtoItem"
                    },
                    {
                        "id": 10,
                        "type": "leave",
                        "start": "2019-11-10",
                        "end": "2019-11-22",
                        "reportedByUserId": 46,
                        "dateDisplayType": "DATE_RANGE",
                        "netDays": 13,
                        "comment": "11Nov Vacation",
                        "workerReport": {
                            "id": "17",
                            "paymentPeriodId": 12,
                            "paymentPeriod": {
                                "createdAt": "2019-07-02T10:52:01.000Z",
                                "updatedAt": "2019-11-24T15:41:45.000Z",
                                "id": "12",
                                "projectId": 10,
                                "isPayrollSummaryDownloadReportEnabled": 1,
                                "startedAt": "2019-11-01",
                                "endedAt": "2019-11-30",
                                "__typename": "WorkerReportPaymentPeriod"
                            },
                            "__typename": "WorkerReport"
                        },
                        "informationSource": null,
                        "attachments": [],
                        "createdAt": "2019-11-06T09:14:29.000Z",
                        "updatedAt": "2019-11-10T13:17:30.000Z",
                        "__typename": "PtoItem"
                    },
                    {
                        "id": 34,
                        "type": "leave",
                        "start": "2019-11-02",
                        "end": "2019-11-02",
                        "reportedByUserId": 46,
                        "dateDisplayType": "SINGLE_DAY",
                        "netDays": 1,
                        "comment": "02.11 + file",
                        "workerReport": {
                            "id": "17",
                            "paymentPeriodId": 12,
                            "paymentPeriod": {
                                "createdAt": "2019-07-02T10:52:01.000Z",
                                "updatedAt": "2019-11-24T15:41:45.000Z",
                                "id": "12",
                                "projectId": 10,
                                "isPayrollSummaryDownloadReportEnabled": 1,
                                "startedAt": "2019-11-01",
                                "endedAt": "2019-11-30",
                                "__typename": "WorkerReportPaymentPeriod"
                            },
                            "__typename": "WorkerReport"
                        },
                        "informationSource": null,
                        "attachments": [
                            {
                                "id": 13,
                                "ptoItemId": 34,
                                "fileId": 90,
                                "file": {
                                    "id": 90,
                                    "title": "File_12-08-15-291_2019-08-11_.pdf",
                                    "name": "File_12-08-15-291_2019-08-11_.pdf",
                                    "key": "dev/project/10/worker/367/pto_attachment/df879c8c-1c42-4846-9f77-85fc4601bab0",
                                    "type": "pto_attachment",
                                    "uploadDate": "2019-11-14",
                                    "uploadedByUserId": "46",
                                    "directUrl": "http://customer-1.dev.papayaglobal.com:8080/api/v1/file/90/link?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjQ2LCJrZXkiOiI5MCIsImlhdCI6MTU3NTgxNDcwNCwiZXhwIjoxNTc2NDE5NTA0fQ.HO36JiQ2KmgOpBNUtsLFrvDnxvPxMLxB6JMz2cbPjoc&viewMode=true",
                                    "createdAt": "2019-11-14T12:37:19.000Z",
                                    "updatedAt": "2019-11-14T12:37:19.000Z",
                                    "__typename": "File"
                                },
                                "createdAt": "2019-11-14T12:37:22.000Z",
                                "updatedAt": "2019-11-14T12:37:22.000Z",
                                "__typename": "PtoItemAttachment"
                            }
                        ],
                        "createdAt": "2019-11-14T12:09:13.000Z",
                        "updatedAt": "2019-11-14T12:09:13.000Z",
                        "__typename": "PtoItem"
                    },
                    {
                        "id": 35,
                        "type": "sick",
                        "start": "2019-11-03",
                        "end": "2019-11-04",
                        "reportedByUserId": 46,
                        "dateDisplayType": "DATE_RANGE",
                        "netDays": 2,
                        "comment": "2 כןךקד",
                        "workerReport": {
                            "id": "17",
                            "paymentPeriodId": 12,
                            "paymentPeriod": {
                                "createdAt": "2019-07-02T10:52:01.000Z",
                                "updatedAt": "2019-11-24T15:41:45.000Z",
                                "id": "12",
                                "projectId": 10,
                                "isPayrollSummaryDownloadReportEnabled": 1,
                                "startedAt": "2019-11-01",
                                "endedAt": "2019-11-30",
                                "__typename": "WorkerReportPaymentPeriod"
                            },
                            "__typename": "WorkerReport"
                        },
                        "informationSource": null,
                        "attachments": [],
                        "createdAt": "2019-11-14T12:42:28.000Z",
                        "updatedAt": "2019-11-26T12:27:36.000Z",
                        "__typename": "PtoItem"
                    },
                    {
                        "id": 38,
                        "type": "sick",
                        "start": "2019-10-01",
                        "end": "2019-10-01",
                        "reportedByUserId": 46,
                        "dateDisplayType": "SINGLE_DAY",
                        "netDays": 1,
                        "comment": "sadasd",
                        "workerReport": {
                            "id": "17",
                            "paymentPeriodId": 12,
                            "paymentPeriod": {
                                "createdAt": "2019-07-02T10:52:01.000Z",
                                "updatedAt": "2019-11-24T15:41:45.000Z",
                                "id": "12",
                                "projectId": 10,
                                "isPayrollSummaryDownloadReportEnabled": 1,
                                "startedAt": "2019-11-01",
                                "endedAt": "2019-11-30",
                                "__typename": "WorkerReportPaymentPeriod"
                            },
                            "__typename": "WorkerReport"
                        },
                        "informationSource": null,
                        "attachments": [],
                        "createdAt": "2019-11-17T07:47:14.000Z",
                        "updatedAt": "2019-11-17T07:47:14.000Z",
                        "__typename": "PtoItem"
                    },
                    {
                        "id": 40,
                        "type": "leave",
                        "start": "2019-10-15",
                        "end": "2019-10-15",
                        "reportedByUserId": 46,
                        "dateDisplayType": "SINGLE_DAY",
                        "netDays": 1,
                        "comment": "sdfsdfsdf",
                        "workerReport": {
                            "id": "17",
                            "paymentPeriodId": 12,
                            "paymentPeriod": {
                                "createdAt": "2019-07-02T10:52:01.000Z",
                                "updatedAt": "2019-11-24T15:41:45.000Z",
                                "id": "12",
                                "projectId": 10,
                                "isPayrollSummaryDownloadReportEnabled": 1,
                                "startedAt": "2019-11-01",
                                "endedAt": "2019-11-30",
                                "__typename": "WorkerReportPaymentPeriod"
                            },
                            "__typename": "WorkerReport"
                        },
                        "informationSource": null,
                        "attachments": [],
                        "createdAt": "2019-11-17T16:36:08.000Z",
                        "updatedAt": "2019-11-17T16:36:08.000Z",
                        "__typename": "PtoItem"
                    },
                    {
                        "id": 44,
                        "type": "leave",
                        "start": "2019-11-05",
                        "end": "2019-11-05",
                        "reportedByUserId": 46,
                        "dateDisplayType": "SINGLE_DAY",
                        "netDays": 1,
                        "comment": "yhfhfg",
                        "workerReport": {
                            "id": "17",
                            "paymentPeriodId": 12,
                            "paymentPeriod": {
                                "createdAt": "2019-07-02T10:52:01.000Z",
                                "updatedAt": "2019-11-24T15:41:45.000Z",
                                "id": "12",
                                "projectId": 10,
                                "isPayrollSummaryDownloadReportEnabled": 1,
                                "startedAt": "2019-11-01",
                                "endedAt": "2019-11-30",
                                "__typename": "WorkerReportPaymentPeriod"
                            },
                            "__typename": "WorkerReport"
                        },
                        "informationSource": null,
                        "attachments": [],
                        "createdAt": "2019-11-26T12:37:26.000Z",
                        "updatedAt": "2019-11-26T12:37:26.000Z",
                        "__typename": "PtoItem"
                    },
                    {
                        "id": 45,
                        "type": "sick",
                        "start": "2019-11-24",
                        "end": "2019-11-24",
                        "reportedByUserId": 46,
                        "dateDisplayType": "SINGLE_DAY",
                        "netDays": 1,
                        "comment": "",
                        "workerReport": {
                            "id": "17",
                            "paymentPeriodId": 12,
                            "paymentPeriod": {
                                "createdAt": "2019-07-02T10:52:01.000Z",
                                "updatedAt": "2019-11-24T15:41:45.000Z",
                                "id": "12",
                                "projectId": 10,
                                "isPayrollSummaryDownloadReportEnabled": 1,
                                "startedAt": "2019-11-01",
                                "endedAt": "2019-11-30",
                                "__typename": "WorkerReportPaymentPeriod"
                            },
                            "__typename": "WorkerReport"
                        },
                        "informationSource": null,
                        "attachments": [
                            {
                                "id": 22,
                                "ptoItemId": 45,
                                "fileId": 181,
                                "file": {
                                    "id": 181,
                                    "title": "File_12-08-15-291_2019-08-11_.pdf",
                                    "name": "File_12-08-15-291_2019-08-11_.pdf",
                                    "key": "dev/project/10/worker/367/pto_attachment/1c198f53-82a1-4b24-a8fd-77623e5f79f3",
                                    "type": "pto_attachment",
                                    "uploadDate": "2019-11-28",
                                    "uploadedByUserId": "46",
                                    "directUrl": "http://customer-1.dev.papayaglobal.com:8080/api/v1/file/181/link?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjQ2LCJrZXkiOiIxODEiLCJpYXQiOjE1NzU4MTQ3MDQsImV4cCI6MTU3NjQxOTUwNH0.hV9NcjW5EJK-f4ifIVeqXSpspHHMoOpYkzrqn9hzYIc&viewMode=true",
                                    "createdAt": "2019-11-28T12:57:40.000Z",
                                    "updatedAt": "2019-11-28T12:57:40.000Z",
                                    "__typename": "File"
                                },
                                "createdAt": "2019-11-28T12:58:13.000Z",
                                "updatedAt": "2019-11-28T12:58:13.000Z",
                                "__typename": "PtoItemAttachment"
                            },
                            {
                                "id": 23,
                                "ptoItemId": 45,
                                "fileId": 179,
                                "file": {
                                    "id": 179,
                                    "title": "boarding-pass-ani.pdf",
                                    "name": "boarding-pass-ani.pdf",
                                    "key": "dev/project/10/worker/367/pto_attachment/b6f9f522-42e1-48b5-95ed-f76fa148e7c0",
                                    "type": "pto_attachment",
                                    "uploadDate": "2019-11-28",
                                    "uploadedByUserId": "46",
                                    "directUrl": "http://customer-1.dev.papayaglobal.com:8080/api/v1/file/179/link?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjQ2LCJrZXkiOiIxNzkiLCJpYXQiOjE1NzU4MTQ3MDQsImV4cCI6MTU3NjQxOTUwNH0.7-zbqoior-X3Zv_ifb_yxgMVtowXpo-_TtJqn4g3nuc&viewMode=true",
                                    "createdAt": "2019-11-28T12:57:31.000Z",
                                    "updatedAt": "2019-11-28T12:57:31.000Z",
                                    "__typename": "File"
                                },
                                "createdAt": "2019-11-28T12:58:13.000Z",
                                "updatedAt": "2019-11-28T12:58:13.000Z",
                                "__typename": "PtoItemAttachment"
                            },
                            {
                                "id": 24,
                                "ptoItemId": 45,
                                "fileId": 182,
                                "file": {
                                    "id": 182,
                                    "title": "File_12-08-15-291_2019-08-11-signed.pdf",
                                    "name": "File_12-08-15-291_2019-08-11-signed.pdf",
                                    "key": "dev/project/10/worker/367/pto_attachment/514e7b95-4b2c-4387-a479-d270520b597c",
                                    "type": "pto_attachment",
                                    "uploadDate": "2019-11-28",
                                    "uploadedByUserId": "46",
                                    "directUrl": "http://customer-1.dev.papayaglobal.com:8080/api/v1/file/182/link?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjQ2LCJrZXkiOiIxODIiLCJpYXQiOjE1NzU4MTQ3MDQsImV4cCI6MTU3NjQxOTUwNH0.41R1J3DhnznbrY9iVN7XQS_IfZMFJujJ4ImbQ8Lzenw&viewMode=true",
                                    "createdAt": "2019-11-28T12:57:44.000Z",
                                    "updatedAt": "2019-11-28T12:57:44.000Z",
                                    "__typename": "File"
                                },
                                "createdAt": "2019-11-28T12:58:13.000Z",
                                "updatedAt": "2019-11-28T12:58:13.000Z",
                                "__typename": "PtoItemAttachment"
                            }
                        ],
                        "createdAt": "2019-11-28T12:58:13.000Z",
                        "updatedAt": "2019-11-28T12:58:13.000Z",
                        "__typename": "PtoItem"
                    },
                    {
                        "id": 46,
                        "type": "unpaid",
                        "start": "2019-11-25",
                        "end": "2019-11-25",
                        "reportedByUserId": 46,
                        "dateDisplayType": "SINGLE_DAY",
                        "netDays": 1,
                        "comment": "",
                        "workerReport": {
                            "id": "17",
                            "paymentPeriodId": 13,
                            "paymentPeriod": {
                                "createdAt": "2019-07-02T10:52:01.000Z",
                                "updatedAt": "2019-11-24T15:41:45.000Z",
                                "id": "13",
                                "projectId": 10,
                                "isPayrollSummaryDownloadReportEnabled": 1,
                                "startedAt": "2019-11-01",
                                "endedAt": "2019-11-30",
                                "__typename": "WorkerReportPaymentPeriod"
                            },
                            "__typename": "WorkerReport"
                        },
                        "informationSource": null,
                        "attachments": [],
                        "createdAt": "2019-11-28T13:35:16.000Z",
                        "updatedAt": "2019-11-28T13:35:16.000Z",
                        "__typename": "PtoItem"
                    },
                    {
                        "id": 71,
                        "type": "leave",
                        "start": "2019-12-01",
                        "end": "2019-12-01",
                        "reportedByUserId": 46,
                        "dateDisplayType": "SINGLE_DAY",
                        "netDays": 1,
                        "comment": "",
                        "workerReport": {
                            "id": "18",
                            "paymentPeriodId": 13,
                            "paymentPeriod": {
                                "createdAt": "2019-07-02T10:52:01.000Z",
                                "updatedAt": "2019-07-02T10:52:01.000Z",
                                "id": "13",
                                "projectId": 10,
                                "isPayrollSummaryDownloadReportEnabled": null,
                                "startedAt": "2019-12-01",
                                "endedAt": "2019-12-31",
                                "__typename": "WorkerReportPaymentPeriod"
                            },
                            "__typename": "WorkerReport"
                        },
                        "informationSource": null,
                        "attachments": [],
                        "createdAt": "2019-12-04T15:44:16.000Z",
                        "updatedAt": "2019-12-04T15:44:16.000Z",
                        "__typename": "PtoItem"
                    },
                    {
                        "id": 73,
                        "type": "sick",
                        "start": "2019-12-30",
                        "end": "2019-12-30",
                        "reportedByUserId": 46,
                        "dateDisplayType": "SINGLE_DAY",
                        "netDays": 1,
                        "comment": "",
                        "workerReport": {
                            "id": "18",
                            "paymentPeriodId": 13,
                            "paymentPeriod": {
                                "createdAt": "2019-07-02T10:52:01.000Z",
                                "updatedAt": "2019-07-02T10:52:01.000Z",
                                "id": "13",
                                "projectId": 10,
                                "isPayrollSummaryDownloadReportEnabled": null,
                                "startedAt": "2019-12-01",
                                "endedAt": "2019-12-31",
                                "__typename": "WorkerReportPaymentPeriod"
                            },
                            "__typename": "WorkerReport"
                        },
                        "informationSource": null,
                        "attachments": [],
                        "createdAt": "2019-12-04T16:03:43.000Z",
                        "updatedAt": "2019-12-04T16:03:43.000Z",
                        "__typename": "PtoItem"
                    },
                    {
                        "id": 48,
                        "type": "leave",
                        "start": "2020-01-02",
                        "end": "2020-01-03",
                        "reportedByUserId": 46,
                        "dateDisplayType": "DATE_RANGE",
                        "netDays": 2,
                        "comment": "wwwwhghghgh3333555666",
                        "workerReport": {
                            "id": "19",
                            "paymentPeriodId": 145,
                            "paymentPeriod": {
                                "createdAt": "2019-08-27T12:51:15.000Z",
                                "updatedAt": "2019-08-27T12:51:15.000Z",
                                "id": "145",
                                "projectId": 10,
                                "isPayrollSummaryDownloadReportEnabled": null,
                                "startedAt": "2020-01-01",
                                "endedAt": "2020-01-31",
                                "__typename": "WorkerReportPaymentPeriod"
                            },
                            "__typename": "WorkerReport"
                        },
                        "informationSource": null,
                        "attachments": [],
                        "createdAt": "2019-12-01T14:57:19.000Z",
                        "updatedAt": "2019-12-01T15:51:52.000Z",
                        "__typename": "PtoItem"
                    },
                    {
                        "id": 64,
                        "type": "unpaid",
                        "start": "2020-01-14",
                        "end": "2020-01-17",
                        "reportedByUserId": 46,
                        "dateDisplayType": "DATE_RANGE",
                        "netDays": 4,
                        "comment": "",
                        "workerReport": {
                            "id": "19",
                            "paymentPeriodId": 145,
                            "paymentPeriod": {
                                "createdAt": "2019-08-27T12:51:15.000Z",
                                "updatedAt": "2019-08-27T12:51:15.000Z",
                                "id": "145",
                                "projectId": 10,
                                "isPayrollSummaryDownloadReportEnabled": null,
                                "startedAt": "2020-01-01",
                                "endedAt": "2020-01-31",
                                "__typename": "WorkerReportPaymentPeriod"
                            },
                            "__typename": "WorkerReport"
                        },
                        "informationSource": null,
                        "attachments": [],
                        "createdAt": "2019-12-02T08:24:32.000Z",
                        "updatedAt": "2019-12-02T08:24:32.000Z",
                        "__typename": "PtoItem"
                    },
                    {
                        "id": 68,
                        "type": "leave",
                        "start": "2020-01-10",
                        "end": "2020-01-10",
                        "reportedByUserId": 46,
                        "dateDisplayType": "SINGLE_DAY",
                        "netDays": 1,
                        "comment": "",
                        "workerReport": {
                            "id": "19",
                            "paymentPeriodId": 145,
                            "paymentPeriod": {
                                "createdAt": "2019-08-27T12:51:15.000Z",
                                "updatedAt": "2019-08-27T12:51:15.000Z",
                                "id": "145",
                                "projectId": 10,
                                "isPayrollSummaryDownloadReportEnabled": null,
                                "startedAt": "2020-01-01",
                                "endedAt": "2020-01-31",
                                "__typename": "WorkerReportPaymentPeriod"
                            },
                            "__typename": "WorkerReport"
                        },
                        "informationSource": null,
                        "attachments": [],
                        "createdAt": "2019-12-04T13:43:07.000Z",
                        "updatedAt": "2019-12-04T13:43:07.000Z",
                        "__typename": "PtoItem"
                    },
                    {
                        "id": 70,
                        "type": "unpaid",
                        "start": "2020-01-12",
                        "end": "2020-01-12",
                        "reportedByUserId": 46,
                        "dateDisplayType": "SINGLE_DAY",
                        "netDays": 1,
                        "comment": "",
                        "workerReport": {
                            "id": "19",
                            "paymentPeriodId": 145,
                            "paymentPeriod": {
                                "createdAt": "2019-08-27T12:51:15.000Z",
                                "updatedAt": "2019-08-27T12:51:15.000Z",
                                "id": "145",
                                "projectId": 10,
                                "isPayrollSummaryDownloadReportEnabled": null,
                                "startedAt": "2020-01-01",
                                "endedAt": "2020-01-31",
                                "__typename": "WorkerReportPaymentPeriod"
                            },
                            "__typename": "WorkerReport"
                        },
                        "informationSource": null,
                        "attachments": [],
                        "createdAt": "2019-12-04T13:43:15.000Z",
                        "updatedAt": "2019-12-04T13:43:15.000Z",
                        "__typename": "PtoItem"
                    },
                    {
                        "id": 139,
                        "type": "unpaid",
                        "start": "2019-12-27",
                        "end": "2019-12-27",
                        "reportedByUserId": 1,
                        "dateDisplayType": "SINGLE_DAY",
                        "netDays": 1,
                        "comment": "",
                        "workerReport": {
                            "id": "19",
                            "paymentPeriodId": 145,
                            "paymentPeriod": {
                                "createdAt": "2019-08-27T12:51:15.000Z",
                                "updatedAt": "2019-08-27T12:51:15.000Z",
                                "id": "145",
                                "projectId": 10,
                                "isPayrollSummaryDownloadReportEnabled": null,
                                "startedAt": "2020-01-01",
                                "endedAt": "2020-01-31",
                                "__typename": "WorkerReportPaymentPeriod"
                            },
                            "__typename": "WorkerReport"
                        },
                        "informationSource": null,
                        "attachments": [],
                        "createdAt": "2019-12-08T12:19:23.000Z",
                        "updatedAt": "2019-12-08T12:19:23.000Z",
                        "__typename": "PtoItem"
                    },
                    {
                        "id": 66,
                        "type": "leave",
                        "start": "2020-03-01",
                        "end": "2020-03-01",
                        "reportedByUserId": 46,
                        "dateDisplayType": "SINGLE_DAY",
                        "netDays": 1,
                        "comment": "",
                        "workerReport": {
                            "id": "20",
                            "paymentPeriodId": 356,
                            "paymentPeriod": {
                                "createdAt": "2019-10-03T07:25:45.000Z",
                                "updatedAt": "2019-10-03T07:25:45.000Z",
                                "id": "356",
                                "projectId": 10,
                                "isPayrollSummaryDownloadReportEnabled": null,
                                "startedAt": "2020-03-01",
                                "endedAt": "2020-03-31",
                                "__typename": "WorkerReportPaymentPeriod"
                            },
                            "__typename": "WorkerReport"
                        },
                        "informationSource": null,
                        "attachments": [],
                        "createdAt": "2019-12-04T07:48:50.000Z",
                        "updatedAt": "2019-12-04T07:48:50.000Z",
                        "__typename": "PtoItem"
                    },
                    {
                        "id": 67,
                        "type": "unpaid",
                        "start": "2020-03-31",
                        "end": "2020-03-31",
                        "reportedByUserId": 46,
                        "dateDisplayType": "SINGLE_DAY",
                        "netDays": 1,
                        "comment": "",
                        "workerReport": {
                            "id": "20",
                            "paymentPeriodId": 356,
                            "paymentPeriod": {
                                "createdAt": "2019-10-03T07:25:45.000Z",
                                "updatedAt": "2019-10-03T07:25:45.000Z",
                                "id": "356",
                                "projectId": 10,
                                "isPayrollSummaryDownloadReportEnabled": null,
                                "startedAt": "2020-03-01",
                                "endedAt": "2020-03-31",
                                "__typename": "WorkerReportPaymentPeriod"
                            },
                            "__typename": "WorkerReport"
                        },
                        "informationSource": null,
                        "attachments": [],
                        "createdAt": "2019-12-04T07:49:08.000Z",
                        "updatedAt": "2019-12-04T07:49:08.000Z",
                        "__typename": "PtoItem"
                    },
                    {
                        "id": 137,
                        "type": "leave",
                        "start": "2020-02-21",
                        "end": "2020-02-21",
                        "reportedByUserId": 46,
                        "dateDisplayType": "SINGLE_DAY",
                        "netDays": 1,
                        "comment": "",
                        "workerReport": {
                            "id": "25",
                            "paymentPeriodId": 149,
                            "paymentPeriod": {
                                "createdAt": "2019-09-05T15:20:18.000Z",
                                "updatedAt": "2019-09-05T15:20:18.000Z",
                                "id": "149",
                                "projectId": 10,
                                "isPayrollSummaryDownloadReportEnabled": null,
                                "startedAt": "2020-02-01",
                                "endedAt": "2020-02-29",
                                "__typename": "WorkerReportPaymentPeriod"
                            },
                            "__typename": "WorkerReport"
                        },
                        "informationSource": null,
                        "attachments": [],
                        "createdAt": "2019-12-08T11:16:09.000Z",
                        "updatedAt": "2019-12-08T11:16:09.000Z",
                        "__typename": "PtoItem"
                    },
                    {
                        "id": 138,
                        "type": "unpaid",
                        "start": "2020-02-22",
                        "end": "2020-02-22",
                        "reportedByUserId": 46,
                        "dateDisplayType": "SINGLE_DAY",
                        "netDays": 1,
                        "comment": "",
                        "workerReport": {
                            "id": "25",
                            "paymentPeriodId": 149,
                            "paymentPeriod": {
                                "createdAt": "2019-09-05T15:20:18.000Z",
                                "updatedAt": "2019-09-05T15:20:18.000Z",
                                "id": "149",
                                "projectId": 10,
                                "isPayrollSummaryDownloadReportEnabled": null,
                                "startedAt": "2020-02-01",
                                "endedAt": "2020-02-29",
                                "__typename": "WorkerReportPaymentPeriod"
                            },
                            "__typename": "WorkerReport"
                        },
                        "informationSource": null,
                        "attachments": [],
                        "createdAt": "2019-12-08T11:17:36.000Z",
                        "updatedAt": "2019-12-08T11:17:36.000Z",
                        "__typename": "PtoItem"
                    }
                ]}
            />
        </div>
    ));
