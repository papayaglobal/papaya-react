import React, { useState } from "react";
import styled from "styled-components";
import { map } from "lodash";
import { ReactComponent as TableArrow } from "../../assets/icons/tableArrow.svg";

export default function Paging({ pageCount, onNumClick }) {
  const [currPage, setCurrPage] = useState(1);

  const renderPagesNums = () => {
    const pageNums = [];
    for (let i = 1; i <= pageCount; i++) {
      pageNums.push(
        <PageNumber
          key={i}
          onClick={() => numClick(i)}
          currPage={isCurrPage(i)}
        >
          {i}
        </PageNumber>
      );
    }

    return pageNums;
  };
  const numClick = num => {
    setCurrPage(num);
    return onNumClick(num);
  };

  const isCurrPage = num => {
    if (num === currPage) return true;
    return false;
  };

  const GoNextPage = () => {
    if (currPage === pageCount) return;
    setCurrPage(currPage => currPage + 1);
    onNumClick(currPage + 1);
  };

  return (
    <PagingNumbers>
      {map(renderPagesNums(), num => num)}
      <TableArrow onClick={GoNextPage} />
    </PagingNumbers>
  );
}

const PagingNumbers = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 30px;
  font-family: OpenSans-SemiBold;
  font-size: 14px;
  color: #484d5b;
  letter-spacing: 0;
  svg {
    color: rgba(121, 124, 135, 1);
    &:hover {
      cursor: pointer;
    }
  }
`;

const PageNumber = styled.span`
  margin-right: 23px;
  padding: 11px;
  transition: all 0.5s ease;
  border-radius: 50%;
  background-color: ${({ currPage }) =>
    currPage ? "rgba(72,77,91,0.05)" : "transparent"};
  font-family: ${({ currPage }) =>
    currPage ? "OpenSans-SemiBold" : "OpenSans-Regular"};
  color: ${({ currPage }) => (currPage ? "#484D5B" : "#797C87")};
  &:hover {
    cursor: pointer;
  }
`;
