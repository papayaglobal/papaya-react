import styled from "styled-components";
import {BLACK, DARK1, WHITE} from "./../../Constants";
import {RightArrow} from "./../../papaya-styled-components";
import {sizes} from "./../../Constants/mediaQueries";

export const StyledPaymentContainer = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  box-shadow: 0 1px 4px 0 rgba(0, 0, 0, 0.1);
  background-color: ${WHITE};  
  &:hover {
    box-shadow: 0 1px 10px 0 rgba(0, 0, 0, 0.1);
  }
`;

export const StyledPaymentRow = styled.div`
  display: flex;
  flex-grow: 1;
  flex-shrink: 0;
  flex-direction: row;
  height: 46px;
  justify-content: space-between;
  align-items: center;
  padding: 0 15px;
  border-radius: 4px;  
  
  &:hover {
    cursor: pointer;    
  }
`;
export const StyledLeftWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  flex: 2;  
  @media (max-width: ${sizes.md}px) {
    flex: 3;
  }
`;
export const StyledRightWrapper = styled.div`
  display: flex;
  position: relative;
  flex-direction: row;
  align-items: center;
  flex: 1;
  justify-content: flex-end;
`;

export const StyledRightArrow = styled(RightArrow)`
  :hover, :hover .oval, .oval, .oval:hover {
    fill: transparent;    
  } 
  .right-arrow { fill: ${BLACK} }
  transition: all 0.5s ease;
  transform: ${({isExpanded}) => isExpanded ? "rotate(90deg)" : ""};
`;

export const StyledDates = styled.div`
  display: flex;
  flex: 1.5;
  @media (min-width: ${sizes.md}px) {
    flex: 1;
  }
  cursor: pointer;  
  margin: 0 5px;  
  font-size: 0.9rem;  
  color: ${({isMonthly}) => isMonthly ? BLACK : DARK1};
  font-weight: ${({isMonthly}) => isMonthly ? "600" : "400"};
`;

export const StyledAmount = styled.div`
  display: flex;
  flex: 1;
  justify-content: flex-start;
  @media (max-width: ${sizes.md}px) {
    flex: 2;
  }
  font-size: 0.9rem;
  @media (max-width: ${sizes.sm}px) {
    font-size: 0.8rem;
  }
  color: #343949;
  font-weight: 600;
`;

export const StyledAttachment = styled.div`
  display: none;
  @media (min-width: ${sizes.md}px) {
    display: flex;
  }
`;
export const StyledAttachmentIcon = styled.div`
  display: none;
  @media (max-width: ${sizes.md}px) {
    display: flex;
  }
`;

export const StyledReportedDate = styled.div`
  color: #b5b7bd;
  font-weight: normal;
  font-style: italic;
  margin: 0 20px;
  width: 96px;
  display: none;
  @media (min-width: ${sizes.md}px) {
    display: inline-block;
  }
`;

export const StyledSelectWrapper = styled.div`
  display: none;
  @media (min-width: ${sizes.md}px) {
    display: block;
  }
`;
export const StyledActions = styled.div`
  display: none;
  position: relative;
  @media (min-width: ${sizes.md}px) {
    display: block;
  }
  margin: 0 5px;
  button {
    min-width: 1.2rem;
    padding: 0;
    margin: 0;
    background: none;
  }
  .dropdown-menu {
    left: -130px !important;
    top: -2px;
  }
`;
export const StyledAttachments = styled.div`
  display: none;
  @media (min-width: ${sizes.md}px) {
    display: block;
  }
`;

export const StyledExpandedContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  border-top: 1px solid rgba(0, 0, 0, 0.1);
  padding-left: 40px;
  padding-top: ${({isExpanded}) => isExpanded ? "30px" : "0"};;
  height: ${({isExpanded}) => isExpanded ? "300px" : "0px"};  
  visibility: ${({isExpanded}) => isExpanded ? "visible" : "hidden"};  
  width: 100%;  
  color: #1E0000;
  transition: height 250ms ease-out;
  .date {
    font-family: OpenSans-Italic;
  }
`;


export const StyledExpandedRight = styled.div`
  display: flex;
  margin-left: 92px;
  margin-bottom: 25px;
  img {
    height: fit-content;
    margin-right: 28px;
    margin-right: 28px;
    position: relative;
    bottom: 6px;
  }
  .attachment-title {
    font-family: OpenSans-Semibold;
    color: #797C87;
  }
  .right-content {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
`
