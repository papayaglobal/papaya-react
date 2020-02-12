import React from "react";
import { storiesOf } from "@storybook/react";
import { boolean, object, text, withKnobs } from "@storybook/addon-knobs";

import PaymentRow from "../Common/PaymentRow";

import "./stories.css";
import { INITIAL_VIEWPORTS } from "@storybook/addon-viewport";

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

let selectPaymentRow = true;

storiesOf("Payment Row", module)
  .addParameters({ viewport: { viewports: INITIAL_VIEWPORTS } })
  .addDecorator(withKnobs)
  .add(
    "iphone6",
    () => (
      <div className="app attachment">
        <PaymentRow
          payment={{ comment: "My comment" }}
          attachments={object("attachments", [
            {
              file: {
                name:
                  "Investor_attractor_Memories_August_2019_BEAUTIFUL_LINE_OF_FILE_NAME.pdf",
                type: "Payslip",
                note: "Vestibulum rutrum quam vitae fringilla tincidunt."
              }
            }
          ])}
          amount={text("amount", "7,705.58")}
          pendingTooltip="Report Row with multiple attachment"
          dates={text("dates", "10 May 2019")}
          reportedDate={text("reportedDate", "11 May 2019")}
          actions={actions}
          daysReported={text("daysReported", "1 Day")}
          isNew={boolean("isNew", false)}
          selectable={boolean("selectable", false)}
        />
      </div>
    ),
    { viewport: { defaultViewport: "iphone6" } }
  )
  .add(
    "Real Data",
    () => (
      <>
        <div className="app attachment">
          <PaymentRow
            attachments={object("attachments", [
              {
                type: "PAYSLIP",
                status: null,
                file: {
                  name: "guy_resume.pdf",
                  directUrl:
                    "http://customer-1.dev.papayaglobal.com:8080/api/v1/file/101/link?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjQ3LCJrZXkiOiIxMDEiLCJpYXQiOjE1NzQ1ODkzMTcsImV4cCI6MTU3NTE5NDExN30.PIck31UCEe1rxtM2t1plPff49RvNXKteOVa6ZYoQlaA"
                }
              }
            ])}
            amount={text("amount", "1,111.00")}
            pendingTooltip="Report Row with multiple attachment"
            dates={"November 1, 2019"}
            reportedDate={"Dec 1, 2019"}
            actions={[]}
            daysReported={text("daysReported", "1 Day")}
            isNew={boolean("isNew", true)}
            selectable={boolean("selectable", false)}
            selected={false}
          />
        </div>
        <div className="app attachment">
          <PaymentRow
            attachments={object("attachments", [
              {
                id: "34",
                paymentId: "1926",
                fileId: "101",
                type: "PAYSLIP",
                status: null,
                isAudited: 0,
                auditedBy: null,
                createdAt: "2019-11-20T09:39:50.000Z",
                updatedAt: "2019-11-20T09:39:50.000Z",
                file: {
                  id: "101",
                  title: "guy_resume.pdf",
                  name: "guy_resume.pdf",
                  key:
                    "dev/project/38/worker/368/payment/0455e8b6-907d-4e42-9061-1c099d40309f",
                  type: "worker_payment",
                  uploadDate: "2019-11-20",
                  uploadedByUserId: "1",
                  directUrl:
                    "http://customer-1.dev.papayaglobal.com:8080/api/v1/file/101/link?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjQ3LCJrZXkiOiIxMDEiLCJpYXQiOjE1NzQ1ODkzMTcsImV4cCI6MTU3NTE5NDExN30.PIck31UCEe1rxtM2t1plPff49RvNXKteOVa6ZYoQlaA",
                  createdAt: "2019-11-20T09:39:47.000Z",
                  updatedAt: "2019-11-20T09:39:47.000Z",
                  __typename: "File"
                },
                __typename: "WorkerPaymentDocument"
              },
              {
                id: "35",
                paymentId: "1927",
                fileId: "102",
                type: "PAYSLIP",
                status: null,
                isAudited: 0,
                auditedBy: null,
                createdAt: "2019-11-20T09:40:19.000Z",
                updatedAt: "2019-11-20T09:40:19.000Z",
                file: {
                  id: "102",
                  title: "guy_resume.pdf",
                  name: "guy_resume.pdf",
                  key:
                    "dev/project/38/worker/368/payment/1d6b6c86-a7c1-490f-a597-c9c0062b0ba9",
                  type: "worker_payment",
                  uploadDate: "2019-11-20",
                  uploadedByUserId: "1",
                  directUrl:
                    "http://customer-1.dev.papayaglobal.com:8080/api/v1/file/102/link?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjQ3LCJrZXkiOiIxMDIiLCJpYXQiOjE1NzQ1ODkzMTcsImV4cCI6MTU3NTE5NDExN30.QGYgTDP7bj6meelse6Fu7tXzkT8eIVR9FTMIsQneETI",
                  createdAt: "2019-11-20T09:40:17.000Z",
                  updatedAt: "2019-11-20T09:40:17.000Z",
                  __typename: "File"
                },
                __typename: "WorkerPaymentDocument"
              }
            ])}
            amount={text("amount", "7,705.58")}
            pendingTooltip="Report Row with multiple attachment"
            dates={"November 1, 2019"}
            reportedDate={"Dec 24, 2019"}
            actions={actions}
            daysReported={text("daysReported", "1 Day")}
            isNew={boolean("isNew", false)}
            selectable={boolean("selectable", false)}
          />
        </div>
        <div className="app attachment">
          <PaymentRow
            attachments={object("attachments", [
              {
                id: "34",
                paymentId: "1926",
                fileId: "101",
                type: "PAYSLIP",
                status: null,
                isAudited: 0,
                auditedBy: null,
                createdAt: "2019-11-20T09:39:50.000Z",
                updatedAt: "2019-11-20T09:39:50.000Z",
                file: {
                  id: "101",
                  title: "guy_resume.pdf",
                  name: "guy_resume.pdf",
                  key:
                    "dev/project/38/worker/368/payment/0455e8b6-907d-4e42-9061-1c099d40309f",
                  type: "worker_payment",
                  uploadDate: "2019-11-20",
                  uploadedByUserId: "1",
                  directUrl:
                    "http://customer-1.dev.papayaglobal.com:8080/api/v1/file/101/link?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjQ3LCJrZXkiOiIxMDEiLCJpYXQiOjE1NzQ1ODkzMTcsImV4cCI6MTU3NTE5NDExN30.PIck31UCEe1rxtM2t1plPff49RvNXKteOVa6ZYoQlaA",
                  createdAt: "2019-11-20T09:39:47.000Z",
                  updatedAt: "2019-11-20T09:39:47.000Z",
                  __typename: "File"
                },
                __typename: "WorkerPaymentDocument"
              }
            ])}
            amount={text("amount", "7,705.58")}
            pendingTooltip="Report Row with 1 attachment"
            dates={"10 May 2019"}
            reportedDate={"11 May 2019"}
            actions={actions}
            daysReported={text("daysReported", "1 Day")}
            isNew={boolean("isNew", false)}
            selectable={boolean("selectable", false)}
          />
        </div>
      </>
    ),
    { viewport: { defaultViewport: "responsive" } }
  )
  .add(
    "working checkbox",
    () => {
      return (
        <div className="app attachment">
          <PaymentRow
            attachments={object("attachments", [
              {
                id: "34",
                paymentId: "1926",
                fileId: "101",
                type: "PAYSLIP",
                status: null,
                isAudited: 0,
                auditedBy: null,
                createdAt: "2019-11-20T09:39:50.000Z",
                updatedAt: "2019-11-20T09:39:50.000Z",
                file: {
                  id: "101",
                  title: "guy_resume.pdf",
                  name: "guy_resume.pdf",
                  key:
                    "dev/project/38/worker/368/payment/0455e8b6-907d-4e42-9061-1c099d40309f",
                  type: "worker_payment",
                  uploadDate: "2019-11-20",
                  uploadedByUserId: "1",
                  directUrl:
                    "http://customer-1.dev.papayaglobal.com:8080/api/v1/file/101/link?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjQ3LCJrZXkiOiIxMDEiLCJpYXQiOjE1NzQ1ODkzMTcsImV4cCI6MTU3NTE5NDExN30.PIck31UCEe1rxtM2t1plPff49RvNXKteOVa6ZYoQlaA",
                  createdAt: "2019-11-20T09:39:47.000Z",
                  updatedAt: "2019-11-20T09:39:47.000Z",
                  __typename: "File"
                }
              }
            ])}
            amount={text("amount", "7,705.58")}
            pendingTooltip="Report Row with multiple attachment"
            dates={text("dates", "10 May 2019")}
            reportedDate={text("reportedDate", "11 May 2019")}
            actions={actions}
            daysReported={text("daysReported", "1 Day")}
            isNew={boolean("isNew", false)}
            selectable={boolean("selectable", true)}
            selected={boolean("selected", true)}
            onSelectClick={({ payment }) =>
              alert("PaymentRow checkbox clicked")
            }
            onClick={() => alert("PaymentRow clicked")}
            onAttachmentClicked={({ attachment }) =>
              alert("onAttachmentClicked " + attachment.file.name)
            }
          />
        </div>
      );
    },
    { viewport: { defaultViewport: "responsive" } }
  )
  .add(
    "working checkbox with multiple files",
    () => {
      let selectable = boolean("selectable", selectPaymentRow);
      return (
        <div className="app attachment">
          <PaymentRow
            attachments={object("attachments", [
              {
                id: "34",
                paymentId: "1926",
                fileId: "101",
                type: "PAYSLIP",
                status: null,
                isAudited: 0,
                auditedBy: null,
                createdAt: "2019-11-20T09:39:50.000Z",
                updatedAt: "2019-11-20T09:39:50.000Z",
                file: {
                  id: "101",
                  title: "guy_resume.pdf",
                  name: "guy_resume.pdf",
                  key:
                    "dev/project/38/worker/368/payment/0455e8b6-907d-4e42-9061-1c099d40309f",
                  type: "worker_payment",
                  uploadDate: "2019-11-20",
                  uploadedByUserId: "1",
                  directUrl:
                    "http://customer-1.dev.papayaglobal.com:8080/api/v1/file/101/link?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjQ3LCJrZXkiOiIxMDEiLCJpYXQiOjE1NzQ1ODkzMTcsImV4cCI6MTU3NTE5NDExN30.PIck31UCEe1rxtM2t1plPff49RvNXKteOVa6ZYoQlaA",
                  createdAt: "2019-11-20T09:39:47.000Z",
                  updatedAt: "2019-11-20T09:39:47.000Z",
                  __typename: "File"
                },
                __typename: "WorkerPaymentDocument"
              },
              {
                id: "35",
                paymentId: "1927",
                fileId: "102",
                type: "PAYSLIP",
                status: null,
                isAudited: 0,
                auditedBy: null,
                createdAt: "2019-11-20T09:40:19.000Z",
                updatedAt: "2019-11-20T09:40:19.000Z",
                file: {
                  id: "102",
                  title: "guy_resume.pdf",
                  name: "guy_resume.pdf",
                  key:
                    "dev/project/38/worker/368/payment/1d6b6c86-a7c1-490f-a597-c9c0062b0ba9",
                  type: "worker_payment",
                  uploadDate: "2019-11-20",
                  uploadedByUserId: "1",
                  directUrl:
                    "http://customer-1.dev.papayaglobal.com:8080/api/v1/file/102/link?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjQ3LCJrZXkiOiIxMDIiLCJpYXQiOjE1NzQ1ODkzMTcsImV4cCI6MTU3NTE5NDExN30.QGYgTDP7bj6meelse6Fu7tXzkT8eIVR9FTMIsQneETI",
                  createdAt: "2019-11-20T09:40:17.000Z",
                  updatedAt: "2019-11-20T09:40:17.000Z",
                  __typename: "File"
                },
                __typename: "WorkerPaymentDocument"
              }
            ])}
            amount={text("amount", "7,705.58")}
            pendingTooltip="Report Row with multiple attachment"
            dates={text("dates", "10 May 2019")}
            reportedDate={"11 May 2019"}
            actions={actions}
            daysReported={text("daysReported", "1 Day")}
            isNew={boolean("isNew", true)}
            selectable={boolean("selectable", true)}
            selected={[]}
            selectedAttachments={[
              {
                id: "34",
                paymentId: "1926",
                fileId: "101",
                type: "PAYSLIP",
                status: null,
                isAudited: 0,
                auditedBy: null,
                createdAt: "2019-11-20T09:39:50.000Z",
                updatedAt: "2019-11-20T09:39:50.000Z",
                file: {
                  id: "101",
                  title: "guy_resume.pdf",
                  name: "guy_resume.pdf",
                  key:
                    "dev/project/38/worker/368/payment/0455e8b6-907d-4e42-9061-1c099d40309f",
                  type: "worker_payment",
                  uploadDate: "2019-11-20",
                  uploadedByUserId: "1",
                  directUrl:
                    "http://customer-1.dev.papayaglobal.com:8080/api/v1/file/101/link?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjQ3LCJrZXkiOiIxMDEiLCJpYXQiOjE1NzQ1ODkzMTcsImV4cCI6MTU3NTE5NDExN30.PIck31UCEe1rxtM2t1plPff49RvNXKteOVa6ZYoQlaA",
                  createdAt: "2019-11-20T09:39:47.000Z",
                  updatedAt: "2019-11-20T09:39:47.000Z",
                  __typename: "File"
                },
                __typename: "WorkerPaymentDocument"
              }
            ]}
            onSelectClick={({ payment }) =>
              alert("PaymentRow checkbox clicked")
            }
            onClick={() => alert("PaymentRow clicked")}
            onSelectAttachmentClicked={({ attachment }) =>
              alert("onSelectAttachmentClicked: " + attachment.file.name)
            }
            onAttachmentClicked={({ attachment }) =>
              alert("onAttachmentClicked: " + attachment.file.name)
            }
          />
        </div>
      );
    },
    { viewport: { defaultViewport: "responsive" } }
  )
  .add(
    "payment row - no actions list",
    () => {
      let selectable = boolean("selectable", selectPaymentRow);
      return (
        <div className="app attachment">
          <PaymentRow
            payment={{ comment: "My comment" }}
            attachments={object("attachments", [
              {
                type: "PAYSLIP",
                status: null,
                file: {
                  name: "guy_resume.pdf",
                  directUrl:
                    "http://customer-1.dev.papayaglobal.com:8080/api/v1/file/101/link?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjQ3LCJrZXkiOiIxMDEiLCJpYXQiOjE1NzQ1ODkzMTcsImV4cCI6MTU3NTE5NDExN30.PIck31UCEe1rxtM2t1plPff49RvNXKteOVa6ZYoQlaA"
                }
              }
            ])}
            amount={text("amount", "7,705.58")}
            pendingTooltip="Report Row with multiple attachment"
            dates={text("dates", "10 May 2019")}
            reportedDate={text("reportedDate", "11 May 2019")}
            actions={[]}
            hasComment={true}
            daysReported={text("daysReported", "1 Day")}
            isNew={boolean("isNew", false)}
            selectable={boolean("selectable", true)}
            selected={selectable}
            onSelectClick={({ payment }) =>
              alert("PaymentRow checkbox clicked")
            }
            onClick={() => alert("PaymentRow clicked")}
            onAttachmentClicked={({ attachment }) =>
              alert("onAttachmentClicked " + attachment.file.name)
            }
          />
        </div>
      );
    },
    { viewport: { defaultViewport: "responsive" } }
  );
