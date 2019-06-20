import React from "react";
import styled from "styled-components";

import media from "../../Constants/mediaQueries";

import attachment from "../../assets/icons/attachment-link.svg";

const AttachmentComponent = ({
  className,
  children,
  attachments,
  displayName,
  type,
  isExpanded
}) => (
  <div
    className={className}
    style={{ backgroundColor: type === "link" ? "transparent" : "rgba(25, 117, 240, 0.05)" }}
  >
    {!displayName &&
      (attachments.length > 1 && <span className="attachmentCount">{attachments.length}</span>)}
    <img src={attachment} alt="Attachment Icon" className="icon" />
    {displayName && (
      <span className="fileName">
        {attachments.length > 1
          ? `${attachments.length} Files`
          : isExpanded
          ? attachments.fileName
          : attachments[0].fileName}
      </span>
    )}
  </div>
);

const Attachment = styled(AttachmentComponent)`
  display: flex;
  justify-content: center;
  align-items: center;
  background: rgba(25, 117, 240, 0.05);
  height: 34px;
  border-radius: 17px;
  padding: 9px;

  .attachmentCount {
    padding: 0 5px;
    color: #1975f0;
    margin-right: 5px;
  }
  .fileName {
    color: #1975f0;
    padding-left: 5px;
  }

  & :hover {
    cursor: pointer;
  }

  ${media.sm`
  .attachmentCount {
    display: block;
  }
  `}
  ${media.md`
  .attachmentCount {
    display: block;
  }
  `}
`;

export default Attachment;
