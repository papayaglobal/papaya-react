import React from "react";
import styled from "styled-components";

const MessageComponent = ({ className, children, icon }) => (
  <div className={className}>
    {icon && <img src={icon} alt="Message Icon" />}
    {children}
  </div>
);

const Message = styled(MessageComponent)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;

  & img {
    margin-bottom: 15px;
    height: 72px;
    opacity: 0.49;
  }

  & p {
    font-size: 0.9rem;
    margin: 1px 0;
    line-height: 21px;
    color: #797c87;
  }
`;

export default Message;
