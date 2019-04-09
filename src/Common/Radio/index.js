import styled from "styled-components";
import React from "react";

import * as Colors from "../../Constants/colors";
import check from "../../assets/icons/check.svg";

const Radio = ({ className, children, checked }) => (
  <input type="radio" className={className} checked={checked} />
);

const AppRadio = styled(Radio)`
  appearance: none;
  width: 1rem;
  height: 1rem;
  border: 1px solid ${Colors.DARK1};
  border-radius: 2rem;
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
    content: " ";
    width: 8px;
    height: 8px;
    font-size: 32px;
    border-radius: 50px;
    background: #ffffff;
    text-shadow: 0px;
  }
`;

export default AppRadio;
