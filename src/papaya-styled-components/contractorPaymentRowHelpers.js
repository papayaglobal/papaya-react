import styled from "styled-components";
import { BLACK, DARK1, DARK2, DARK3, WHITE } from "../Constants";
import { RightArrow } from "../papaya-styled-components";
import { Flex } from "../papaya-styled-components/flex-components";
import { sizes } from "../Constants/mediaQueries";

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
  justify-content: flex-start;
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
  :hover,
  :hover .oval,
  .oval,
  .oval:hover {
    fill: transparent;
  }
  .right-arrow {
    fill: ${BLACK};
  }
  transition: all 0.5s ease;
  transform: ${({ isExpanded }) => (isExpanded ? "rotate(90deg)" : "")};
`;

export const StyledDates = styled(Flex)`
  flex: 1.5;
  flex-shrink: 0;
  flex-basis: auto;
  @media (min-width: ${sizes.md}px) {
    flex: 2;
  }
  cursor: pointer;
  margin: 0 5px;
  font-size: 0.9rem;
  color: ${({ isMonthly }) => (isMonthly ? BLACK : DARK1)};
  font-weight: ${({ isMonthly }) => (isMonthly ? "600" : "400")};
`;

export const StyledAmount = styled(Flex)`
  flex-shrink: 0;
  flex-basis: auto;
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
    flex: 10;
    flex-shrink: 1;
  }
`;
export const StyledAttachmentIcon = styled.div`
  display: none;
  @media (max-width: ${sizes.md}px) {
    display: flex;
  }
`;

export const StyledReportedDate = styled.div`
  color: ${DARK3};
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

export const StyledExpandedContainer = styled(Flex)`
  flex-wrap: wrap;
  border-top: 1px solid rgba(0, 0, 0, 0.1);
  padding: ${({ isExpanded }) => (isExpanded ? "30px 40px 25px" : "0")};
  height: ${({ isExpanded }) => (isExpanded ? "fit-content" : "0px")};
  visibility: ${({ isExpanded }) => (isExpanded ? "visible" : "hidden")};
  width: 100%;
  color: #1e0000;
  transition: height 250ms ease-out;
  .date {
    font-family: OpenSans-Italic;
  }
`;

export const CreatedDate = styled.span`
  font-family: "Open Sans", sans-serif;
  font-style: italic;
  margin-bottom: 5px;
  font-size: 14px;
  color: ${DARK1};
`;

export const CreatedDateTime = styled.span`
  font-family: "Open Sans", sans-serif;
  font-style: italic;
  font-size: 12px;
  color: ${DARK3};
`;

export const StyledAttachmentTitle = styled.span`
  display: inline-block;
  margin: ${({ margin }) => margin};
  padding: ${({ padding }) => padding};
  font-family: "Open Sans", sans-serif;
  font-weight: 600;
  color: ${DARK2};
`;

export const StyledSubmittedText = styled.span`
  display: inline-block;
  font-family: "Open Sans", sans-serif;
  font-size: 14px;
  color: #1e0000;
  margin-top: 5px;
`;
