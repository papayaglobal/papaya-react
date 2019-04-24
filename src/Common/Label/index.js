import React from "react";
import styled from "styled-components";

import * as Colors from "../../Constants/colors";

const Label = ({ className, title }) => (
  <div className={className}>
    <p>{title}</p>
  </div>
);

const AppLabel = styled(Label)`
  background-color: ${Colors.STATUSOK};
  color: #ffffff;
  border-radius: 20px;
  height: 22px;
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

export default AppLabel;
