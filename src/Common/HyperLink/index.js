import styled from "styled-components";

import * as Colors from "../../Constants/colors";

const AppLink = styled.a`
  color: ${Colors.ACCENT1};
  font-size: ${props => (props.size === "small" ? "0.9rem" : "1rem")};
  cursor: pointer;

  :hover {
    color: ${Colors.ACCENT1DARK};
  }
  & img {
    margin: 0 5px;
    width: ${props => (props.size === "small" ? "0.9rem" : "1rem")};
    height: ${props => (props.size === "small" ? "0.9rem" : "1rem")};
  }
`;

export default AppLink;
