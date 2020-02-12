import styled from "styled-components";
import is from "styled-is";

export const Flex = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: flex-start;
  align-content: stretch;

  border-top: ${({ borderTop }) => borderTop};
  flex: ${({ flex }) => flex};

  ${is("pointer")`
    cursor: pointer;
  `};

  ${is("widthFit")`
    width: fit-content;
  `};

  ${is("fullHeight")`    
    height: 100%;
  `};

  ${is("fullWidth")`    
    width: 100%;
  `};

  ${is("inline")`
    display: inline-flex;
  `};

  ${is("row")`
    flex-direction: row;
  `};

  ${is("rowReverse")`
    flex-direction: row-reverse;
  `};

  ${is("column")`
    flex-direction: column;
  `};

  ${is("columnReverse")`
    flex-direction: column-reverse;
  `};

  ${is("nowrap")`
    flex-wrap: nowrap;
  `};

  ${is("flexWrap")`
    flex-wrap: wrap;
  `};

  ${is("wrapReverse")`
    flex-wrap: wrap-reverse;
  `};

  ${is("justifyStart")`
    justify-content: flex-start;
  `};

  ${is("justifyEnd")`
    justify-content: flex-end;
  `};

  ${is("justifyCenter")`
    justify-content: center;
  `};

  ${is("justifyBetween")`
    justify-content: space-between;
  `};

  ${is("justifyAround")`
    justify-content: space-around;
  `};

  ${is("contentStart")`
    align-content: flex-start;
  `};

  ${is("contentEnd")`
    align-content: flex-end;
  `};

  ${is("contentCenter")`
    align-content: center;
  `};

  ${is("contentSpaceBetween")`
    align-content: space-between;
  `};

  ${is("contentSpaceAround")`
    align-content: space-around;
  `};

  ${is("contentStretch")`
    align-content: stretch;
  `};

  ${is("alignStart")`
    align-items: flex-start;
  `};

  ${is("alignEnd")`
    align-items: flex-end;
  `};

  ${is("alignCenter")`
    align-items: center;
  `};

  ${is("alignBaseline")`
    align-items: baseline;
  `};

  ${is("alignStretch")`
    align-items: stretch;
  `};

  ${is("full")`
    width: 100%;
    height: 100%;
    flex-basis: 100%;
  `};

  ${is("center")`
    align-items: center;
    justify-content: center;
  `};

  padding: ${({ padding }) => padding};
  margin: ${({ margin }) => margin};
  height: ${({ height }) => height};
  cursor: ${({ cursor }) => cursor};
`;
