import React from "react";
import styled from "styled-components";
import ValidIcon from "../../assets/icons/V.svg";
import ErrorIcon from "../../assets/icons/X.svg";
import WarningIcon from "../../assets/icons/warning.svg";

import * as Colors from "../../Constants/colors";

const TextInput = styled.input`
  min-width: 20.5rem;
  height: 2.5rem;
  padding: 7px 16px;
  line-height: 1;
  border-radius: 4px;
  border-width: 1px;
  border-style: solid;
  border-color: ${props =>
    props.validationType === "valid"
      ? Colors.STATUSOK
      : props.validationType === "warning"
      ? Colors.STATUSWARNING
      : props.validationType === "error"
      ? Colors.STATUSCRITICAL
      : Colors.DARK4};
  font-family: "Open Sans";
  background-image: url(${props =>
    props.validationType === "valid"
      ? ValidIcon
      : props.validationType === "warning"
      ? WarningIcon
      : props.validationType === "error"
      ? ErrorIcon
      : ""});
  background-repeat: no-repeat;
  background-attachment: scroll;
  background-position: 18.5rem 0.8rem;
  background-size: auto 12px;
  padding-right: 40px;
  color: #343949;

  ::-webkit-input-placeholder {
    font-family: "Open Sans", sans-serif !important;
    color: #b5b7bd;
  }

  :focus {
    border-color: #3785fa;
    opacity: 0.8;
    outline: none;
  }

  :disabled {
    opacity: 0.6;
    cursor: default;
  }
`;

export default TextInput;
