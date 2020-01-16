import React from "react";
import styled from "styled-components";
import {isFunction} from "lodash";
import {ReactComponent as CloseIcon} from "../../assets/icons/X.svg";
import {ReactComponent as AttachmentIcon} from "../../assets/icons/attachment.svg";
import * as Color from "../../Constants/colors";

const StyledPillsWrapper = styled.div`
  background-color: rgba(25, 117, 240, 0.05);
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  border-radius: 20px; 
  padding: 5px 10px;
  width: fit-content;
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
const StyledCloseIcon = styled(CloseIcon)`
  margin-left: 10px;
  width: 10px;
  cursor: pointer;
  .xIcon {
    fill: #B5B7BD;    
  }
`;
const ListItemComponent = (props) => {
    const {className, onClick, name, onCloseClick} = props;

    const onClickPills = (e) => {
        e.stopPropagation();
        isFunction(onClick) && onClick();
    };

    const onClosePillClick = (e) => {
        e.stopPropagation();
        isFunction(onCloseClick) && onCloseClick();
    };

    return <StyledPillsWrapper className={className}
                               onClick={onClickPills}>
        <StyledTextContainer>
            <AttachmentIcon className="icon" style={{flexShrink: 0}}/>
            <span className="fileName">{name}</span>
        </StyledTextContainer>

        <StyledCloseIcon className="closeIcon" alt="" onClick={onClosePillClick}/>
    </StyledPillsWrapper>
};

export default ListItemComponent;
