import styled from "styled-components";
import React from "react";

import * as Colors from "../../Constants/colors";
import check from "../../assets/icons/check.svg";

const CheckBox = ({ className, children, checked }) => (
  <input type="checkbox" className={className} checked={checked} />
);

const AppCheckBox = styled(CheckBox)`
  appearance: none;
  width: 1rem;
  height: 1rem;
  border: 1px solid ${Colors.DARK1};
  opacity: 0.3;
  box-shadow: none;
  display: flex;
  align-items: center;
  justify-content: center;

  :focus,
  :active,
  :hover {
    outline: none;
    border: 1px solid #3785fa;
    opacity: 1;
  }
  :checked {
    opacity: 1;
    background-color: ${Colors.ACCENT1};
    border-color: ${Colors.ACCENT1};
  }
  :checked:after {
    content: url(${check});
    font-size: 14px;
  }
`;

export default AppCheckBox;
