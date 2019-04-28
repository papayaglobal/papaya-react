import React from "react";
import styled from "styled-components";

import media from "../../Constants/mediaQueries";

import attachment from "../../assets/icons/attachment-link.svg";

const AttachmentComponent = ({ className, children, attachments }) => (
  <div className={className}>
    {attachments.length > 1 && <span className="attachmentCount">{attachments.length}</span>}
    <img src={attachment} alt="Attachment Icon" className="icon" />
  </div>
);

const Attachment = styled(AttachmentComponent)`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 15px;
  background: rgba(25, 117, 240, 0.05);
  height: 34px;
  border-radius: 17px;
  padding: 9px;

  .attachmentCount {
    padding: 0 5px;
    color: #1975f0;
    margin-right: 5px;
  }

  & :hover {
    cursor: pointer;
  }

  ${media.sm`
  margin: 0 10px;
  .attachmentCount {
    display: none;
  }
  `}
`;

export default Attachment;
