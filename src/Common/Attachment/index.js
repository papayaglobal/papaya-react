import React from "react";
import styled from "styled-components";

import media from "../../Constants/mediaQueries";
import * as Color from "../../Constants/colors";

import { ReactComponent as AttachmentIcon } from "../../assets/icons/attachment.svg";

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
    <AttachmentIcon className="icon" />
    {displayName && (
      <span className="fileName">
        {attachments.length > 1 ? `${attachments.length} Files` : attachments[0].name}
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
    color: ${Color.ACCENT1};
    margin-right: 5px;
  }
  .fileName {
    color: #1975f0;
    padding-left: 5px;
  }

  & :hover {
    cursor: pointer;
    color: ${Color.ACCENT1DARK};
    fill: ${Color.ACCENT1DARK};
  }

  .icon {
    fill: ${Color.ACCENT1};
  }

  .icon:hover {
    fill: ${Color.ACCENT1DARK};
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
