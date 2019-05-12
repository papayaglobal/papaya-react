import React from "react";
import styled from "styled-components";

import * as Colors from "../../Constants/colors";

const LabelComponent = ({ className, title }) => (
  <div className={className}>
    <p>{title}</p>
  </div>
);

const Label = styled(LabelComponent)`
  background-color: ${Colors.STATUSOK};
  color: #ffffff;
  border-radius: 20px;
  height: 22px;
  min-width: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 3px 7px;

  & p {
    font-size: 12px;
    font-weight: bold;
    margin: 0;
    line-height: 1;
  }
`;

export default Label;
