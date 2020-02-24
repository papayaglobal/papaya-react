import React from "react";
import styled from "styled-components";

import * as Colors from "../../Constants/colors";

const LabelComponent = ({ className, title }) => (
  <div className={className}>
    <p>{title}</p>
  </div>
);

const Label = styled(LabelComponent)`
  background-color: ${({ color }) => color || Colors.STATUSOK};
  color: #ffffff;
  border-radius: ${({ squared }) => (squared ? "4px" : "20px")};
  height: ${({ small }) => (small ? "14.5px" : "22px")};
  min-width: ${({ squared }) => (squared ? "unset" : "50px")};
  width: ${({ squared, small }) =>
    squared ? (small ? "14.5px" : "22px") : "fit-content"};
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 3px 7px;

  & p {
    font-size: ${({ small }) => (small ? "9px" : "12px")};
    font-weight: bold;
    margin: 0;
    line-height: 1;
  }
`;

export default Label;
