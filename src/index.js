import React from "react";
import ReactDOM from "react-dom";
import "./assets/css/normalize.css";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";

import Alert from "./Common/Alert";
import Attachment from "./Common/Attachment";
import Button from "./Common/Button";
import Calendar from "./Common/Calendar";
import Dropdown from "./Common/Dropdown";
import Link from "./Common/HyperLink";
import Label from "./Common/Label";
import Message from "./Common/Message";
import PaymentRow from "./Common/PaymentRow";
import PopOver from "./Common/PopOver";
import RadioButton from "./Common/Radio";
import ReportRow from "./Common/ReportRow";
import SelectBox from "./Common/Select";
import Spinner from "./Common/Spinner";
import Switch from "./Common/Switch";
import TextArea from "./Common/TextArea";
import TextInput from "./Common/TextInput";
import ToolTip from "./Common/Tooltip";
import ListItem from "./Common/ListItem";
import ContractorPaymentRow from "./Common/ContractorPaymentRow";
import {CheckBox} from "./Common/Checkbox/index";

export {
    Alert,
    Attachment,
    Button,
    Calendar,
    CheckBox,
    Dropdown,
    Link,
    Label,
    Message,
    PaymentRow,
    PopOver,
    RadioButton,
    ReportRow,
    SelectBox,
    Spinner,
    Switch,
    TextArea,
    TextInput,
    ToolTip,
    ContractorPaymentRow,
    ListItem
};

ReactDOM.render(<App/>, document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
