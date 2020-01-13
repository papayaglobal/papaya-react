import React from "react";
import styled from "styled-components";
import { get } from "lodash";

import media from "../../Constants/mediaQueries";
import * as Color from "../../Constants/colors";

import { ReactComponent as AttachmentIcon } from "../../assets/icons/attachment.svg";
import { ReactComponent as ProFormaIcon } from "../../assets/icons/pro-forma.svg";

const AttachmentComponent = (props) => {
  const {
    className,
    children,
    attachments = [],
    displayName,
    type,
    isExpanded,
    bgColor,
    onClick
  } = props;

  let backgroundColor = bgColor || (["link", "proForma"].includes(type) ? "transparent" : "rgba(25, 117, 240, 0.05)");
  if(type === 'proForma')console.log(backgroundColor);
  

  return (
    <div
      className={className}
      style={{ backgroundColor }}
      onClick={onClick}
    >
      {!displayName &&
        (attachments.length > 1 && <span className="attachmentCount">{attachments.length}</span>)}
      {type === "proForma" ? <ProFormaIcon className="icon" style={{ flexShrink: 0 }} /> :
        <AttachmentIcon className="icon" style={{ flexShrink: 0 }} />}
      {displayName && (
        <span className="fileName">
          {attachments.length > 1 ? `${attachments.length} Files` : get(attachments, "[0].file.name")}
        </span>
      )}
    </div>
  )
};

const Attachment = styled(AttachmentComponent)`
  display: flex;
  justify-content: center;
  align-items: center;
  background: rgba(25, 117, 240, 0.05);
  min-height: 34px;
  border-radius: 17px;
  padding: 9px;
  width: fit-content;

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
