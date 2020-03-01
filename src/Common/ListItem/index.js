import React from "react";
import styled ,{css} from "styled-components";
import {isFunction} from "lodash";
import {ReactComponent as ListItemClose} from "../../assets/icons/ListItemClose.svg";
import {ReactComponent as AttachmentIcon} from "../../assets/icons/attachment.svg";
import * as Color from "../../Constants/colors";
// import MiddleTruncate from './react-middle-truncate/middle-truncate';

const StyledPillsWrapper = styled.div`
  background-color: ${({bgColor}) => bgColor || "rgba(25, 117, 240, 0.05)"};
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  border-radius: 20px; 
  padding: 5px 10px;
  width: fit-content;
  cursor: pointer;
  overflow: hidden;
`;

const FileName = styled.span`
  ${props => props.limit ? css`
      max-height: 15px;
      max-width: calc(100% - 130px);
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    `:''
  }
`;

const StyledTextContainer = styled.div`
  display: flex;
  flex-direction: row;

  > svg.icon {
    margin-right: 10px;
    fill: ${Color.ACCENT1};
    &:hover {
        fill: ${Color.ACCENT1DARK};
    }
  }
  > span {
    color: #1975f0;
  }
`;
const StyledCloseIcon = styled(ListItemClose)`
  margin-left: 10px;
  .closePath {
    width: 10px;
    height: 10px;
  }  
  cursor: pointer;
`;
const ListItemComponent = (props) => {
    const {className, onClick, name, onCloseClick, hideClose = false, bgColor, limit} = props;

    const onClickPills = (e) => {
        e.stopPropagation();
        isFunction(onClick) && onClick();
    };

    const onClosePillClick = (e) => {
        e.stopPropagation();
        isFunction(onCloseClick) && onCloseClick();
    };

    return <StyledPillsWrapper className={className}
                               bgColor={bgColor}
                               onClick={onClickPills}>
        <StyledTextContainer>
            <AttachmentIcon className="icon" style={{flexShrink: 0}}/>
            {/* <MiddleTruncate onResizeDebounceMs={300} text={name} style={{ minWidth: 400 }} /> */}
            <FileName className="fileName" limit={limit}>{name}</FileName>
        </StyledTextContainer>

        {!hideClose && <StyledCloseIcon className="closeIcon" alt="" onClick={onClosePillClick}/>}
    </StyledPillsWrapper>
};

export default ListItemComponent;
