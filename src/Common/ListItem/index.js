import React from "react";
import styled from "styled-components";
import {isFunction} from "lodash";
import {ReactComponent as ListItemClose} from "../../assets/icons/ListItemClose.svg";
import {ReactComponent as AttachmentIcon} from "../../assets/icons/attachment.svg";
import * as Color from "../../Constants/colors";
import MiddleTruncate from '../../react-middle-truncate/middle-truncate';
import {sizes} from "../../Constants/mediaQueries";

const StyledPillsWrapper = styled.div`
  background-color: ${({bgColor}) => bgColor || "rgba(25, 117, 240, 0.05)"};
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  border-radius: 20px; 
  padding: 5px 10px;
  width: fit-content;
  max-width: 100%;
  cursor: pointer;
  overflow: hidden;  
`;

const StyledTextContainer = styled.div`
  display: flex;
  flex-direction: row;
  width: fit-content;
  max-width: 100%;
  align-items: center;
  
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

const StyledMiddleTruncate = styled(MiddleTruncate)`
  color: #1975f0;
  width: calc(100% - 26px);
  @media (max-width: ${sizes.md}px) {
    min-width: calc(100% - 26px);
    width: 100%;
  }
`;

const ListItemComponent = (props) => {
    const {className, onClick, name, onCloseClick, hideClose = false, bgColor} = props;

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
            <StyledMiddleTruncate
                forcereRender={true}
                smartCopy={'all'}
                onResizeDebounceMs={100}
                text={name}
                start={8}
                end={8}
            />
        </StyledTextContainer>

        {!hideClose && <StyledCloseIcon className="closeIcon" alt="" onClick={onClosePillClick}/>}
    </StyledPillsWrapper>
};

export default ListItemComponent;
