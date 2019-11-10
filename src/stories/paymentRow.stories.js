import React from "react";
import { storiesOf } from "@storybook/react";
import { withKnobs, text, boolean, object } from "@storybook/addon-knobs";

import PaymentRow from "../Common/PaymentRow";

import "./stories.css";

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

storiesOf("Payment Row", module)
  .addDecorator(withKnobs)
  .add("Default", () => (
    <div className="app attachment">
      <PaymentRow
        attachments={[
          {
            fileName: "Payslip-April-1.pdf"
          }
        ]}
        dates={text("dates", "April 2019")}
        amount={text("amount", "7,705.58")}
        reportedDate={text("reportedDate", "18 Apr 2019")}
        actions={actions}
        isNew={boolean("isNew", false)}
        isMonthly
      />
    </div>
  ))
  .add("With Pay Period", () => (
    <div className="app attachment">
      <PaymentRow
        attachments={[
          {
            fileName: "Payslip-May-1.pdf"
          }
        ]}
        dates={text("dates", "01 - 15 May")}
        amount={text("amount", "7,705.58")}
        reportedDate={text("reportedDate", "10 May 2019")}
        actions={actions}
        isNew={boolean("isNew", false)}
        isMonthly={false}
      />
    </div>
  ))
  .add("Selectable", () => (
    <div className="app attachment">
      <PaymentRow
        attachments={[
          {
            fileName: "Payslip-May-1.pdf"
          }
        ]}
        dates={text("dates", "01 - 15 May")}
        amount={text("amount", "7,705.58")}
        reportedDate={text("reportedDate", "10 May 2019")}
        actions={actions}
        isNew={boolean("isNew", false)}
        isMonthly={false}
        selectable={true}
      />
    </div>
  ))
  .add("New Payment", () => (
    <div className="app attachment">
      <PaymentRow
        attachments={[
          {
            fileName: "Payslip-April-1.pdf"
          }
        ]}
        dates={text("dates", "15-20 April 2019")}
        amount={text("amount", "7,705.58")}
        reportedDate={text("reportedDate", "18 Apr 2019")}
        actions={actions}
        isNew={boolean("isNew", true)}
        selectable={boolean("selectable", false)}
      />
    </div>
  ))
  .add("Multiple Props", () => (
    <div className="app attachment">
      <PaymentRow
        attachments={object("attachments", [
          {
            fileName: "Payslip-May.pdf",
            documentType: "Payslip",
            note: "Vestibulum rutrum quam vitae fringilla tincidunt."
          },
          {
            fileName: "file1.pdf",
            documentType: "Other",
            note: "Nam dapibus nisl vitae elit fringilla rutrum. Aen."
          },
          {
            fileName: "Another File.pdf",
            documentType: "Other",
            note: "Donec facilisis tortor ut augue lacinia, at viver."
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
  ))
    .add("Real Data", () => (
        <div className="app attachment">
            <PaymentRow
                attachments={object("attachments", [
                    {
                        "id": "71",
                        "title": "boarding-pass-ani.pdf",
                        "name": "boarding-pass-ani.pdf",
                        "key": "dev/project/10/worker/367/payment/1e03aba9-1ada-4bde-ada3-332ed491c9b8",
                        "type": "worker_payment",
                        "uploadDate": "2019-11-03",
                        "uploadedByUserId": "1",
                        "directUrl": "http://customer-1.dev.papayaglobal.com:8080/api/v1/file/71/link?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjQ2LCJrZXkiOiI3MSIsImlhdCI6MTU3MzM5OTAzNSwiZXhwIjoxNTc0MDAzODM1fQ.uF4UoVDLbl7P5rpBfi7TKB4zp1BxJEkLElnJOTn8DYQ&viewMode=true",
                        "createdAt": "2019-11-03T08:32:11.000Z",
                        "updatedAt": "2019-11-03T08:32:11.000Z",
                        "__typename": "File"
                    },
                    {
                        "id": "72",
                        "title": "3d-deco-light-superman-logo.jpg",
                        "name": "3d-deco-light-superman-logo.jpg",
                        "key": "dev/project/10/worker/367/payment/a491dc45-2a82-47e9-a4ab-1d3a6e6a4584",
                        "type": "worker_payment",
                        "uploadDate": "2019-11-10",
                        "uploadedByUserId": "1",
                        "directUrl": "http://customer-1.dev.papayaglobal.com:8080/api/v1/file/72/link?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjQ2LCJrZXkiOiI3MiIsImlhdCI6MTU3MzM5OTAzNSwiZXhwIjoxNTc0MDAzODM1fQ.kpgQa0N3RrWPQr0qEfwQekOLDmUaWszvF7RLwaTn2pg&viewMode=true",
                        "createdAt": "2019-11-10T14:30:27.000Z",
                        "updatedAt": "2019-11-10T14:30:27.000Z",
                        "__typename": "File"
                    },
                    {
                        "id": "73",
                        "title": "build_39233_step_104_container_0.txt",
                        "name": "build_39233_step_104_container_0.txt",
                        "key": "dev/project/10/worker/367/payment/95b7042c-901f-4fed-aefc-0de2a6fb8d42",
                        "type": "worker_payment",
                        "uploadDate": "2019-11-10",
                        "uploadedByUserId": "1",
                        "directUrl": "http://customer-1.dev.papayaglobal.com:8080/api/v1/file/73/link?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjQ2LCJrZXkiOiI3MyIsImlhdCI6MTU3MzM5OTAzNSwiZXhwIjoxNTc0MDAzODM1fQ.ERKeLQ7dkrSHsa3X83v_O6RJ1kwh9JjbrtBO-_0YEp8&viewMode=true",
                        "createdAt": "2019-11-10T14:30:59.000Z",
                        "updatedAt": "2019-11-10T14:30:59.000Z",
                        "__typename": "File"
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
    ));
