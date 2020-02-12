import React from "react";
import styled from "styled-components";

import media from "../../Constants/mediaQueries";
import * as Color from "../../Constants/colors";
import { ReactComponent as ProFormaIcon } from "../../assets/icons/pro-forma.svg";
import { ReactComponent as Icon } from "../../assets/icons/attachment.svg";

const AttachmentIconComponent = ({
  className,
  children,
  attachments = [],
  displayName,
  type,
  isExpanded,
  onClick
}) => {
  return (
    <div
      className={className}
      style={{ backgroundColor: "rgba(25, 117, 240, 0.05)" }}
      onClick={onClick}
    >
      {attachments.length > 1 && (
        <span className="attachmentCount">{attachments.length}</span>
      )}
      {type === "proForma" ? (
        <ProFormaIcon className="icon" style={{ flexShrink: 0 }} />
      ) : (
        <Icon className="icon" style={{ flexShrink: 0 }} />
      )}
    </div>
  );
};

const AttachmentIcon = styled(AttachmentIconComponent)`
  display: flex;
  justify-content: center;
  align-items: center;
  background: rgba(25, 117, 240, 0.05);
  min-height: 34px;
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

export default AttachmentIcon;
