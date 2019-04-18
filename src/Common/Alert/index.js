import React from "react";
import styled from "styled-components";

import close from "../../assets/icons/X.svg";

import * as Colors from "../../Constants/colors";

const Alert = ({ className, children, message, dismissable, onClick }) => (
  <div className={className}>
    <p>{message}</p>
    {dismissable && <img src={close} alt="" onClick={onClick} />}
  </div>
);

const AppAlert = styled(Alert)`
  display: flex;
  justify-content: center;
  align-items: center;
  background: ${props =>
    props.type === "success"
      ? "rgba(46, 214, 188, 0.3)"
      : props.type === "warning"
      ? "rgba(249,160,28,0.3)"
      : props.type === "error"
      ? "rgba(248,83,89,0.3)"
      : "rgba(25,117,240,0.3)"};
  border: 1px solid ${Colors.STATUSOK};
  border-color: ${props =>
    props.type === "success"
      ? "rgba(46, 214, 188)"
      : props.type === "warning"
      ? "rgba(249,160,28)"
      : props.type === "error"
      ? "rgba(248,83,89)"
      : "rgba(25,117,240)"};
  border-radius: 4px;
  height: 44px;
  padding: 0 40px;
  position: relative;

  & p {
    color: ${Colors.BLACK};
    opacity: 1;
    font-size: 1rem;
  }

  & img {
    width: 0.5rem;
    height: 0.5rem;
    position: absolute;
    right: 15px;
  }
`;

export default AppAlert;
