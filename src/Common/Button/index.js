import styled from "styled-components";

import * as Color from "../../Constants/colors";

const AppButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  background: ${props =>
    props.outline ? "transparent" : props.type === "secondary" ? Color.BRIGHT3 : Color.ACCENT1};
  border-color: ${props =>
    props.outline ? (props.type === "secondary" ? Color.DARK3 : Color.ACCENT1) : "transparent"};
  border-width: ${props => (props.outline ? "1px" : "0")};
  border-radius: 0.3rem;
  border-style: solid;
  color: ${props =>
    props.type === "secondary"
      ? props.outline
        ? Color.DARK1
        : Color.BLACK
      : props.outline
      ? Color.ACCENT1
      : Color.WHITE};
  font-size: ${props =>
    props.size === "small" ? "0.9rem" : props.size === "medium" ? "1rem" : "1rem"};
  min-width: ${props =>
    props.size === "small" ? "1.9rem" : props.size === "medium" ? "2.3rem" : "2.8rem"};
  min-height: ${props =>
    props.size === "small" ? "1.9rem" : props.size === "medium" ? "2.3rem" : "2.8rem"};
  padding: ${props =>
    props.size === "small"
      ? "0.4rem 0.9rem"
      : props.size === "medium"
      ? "0.5rem 1rem"
      : "0.9rem 0.9rem"};

  :hover {
    background: ${props =>
      props.type === "secondary"
        ? props.outline
          ? Color.BRIGHT1
          : Color.BRIGHT3
        : props.outline
        ? Color.ACCENT1
        : Color.ACCENT1DARK};
    color: ${props => (props.type === "secondary" ? Color.BLACK : Color.WHITE)};
  }

  :focus {
    outline: 0;
  }

  :disabled,
  [disabled] {
    cursor: default;
    background: ${props =>
      props.outline ? "transparent" : props.type === "secondary" ? Color.BRIGHT3 : Color.ACCENT1};
    color: ${props =>
      props.type === "secondary"
        ? props.outline
          ? Color.DARK1
          : Color.BLACK
        : props.outline
        ? Color.ACCENT1
        : Color.WHITE};
    opacity: 0.75;
    border-color: ${props =>
      props.outline ? (props.type === "secondary" ? Color.DARK3 : "#3785FA") : "transparent"};
  }
  & img {
    height: ${props =>
      props.size === "small" ? "0.7rem" : props.size === "medium" ? "0.8rem" : "1rem"};
  }
`;

export default AppButton;
