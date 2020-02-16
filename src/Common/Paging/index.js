import React, { useState } from "react";
import Select from "react-select";
import styled from "styled-components";
import { map } from "lodash";
import { ReactComponent as TableSortArrowIcon } from "../../assets/icons/table-sorting-arrow.svg";
import { ReactComponent as TableArrow } from "../../assets/icons/tableArrow.svg";

export default function Paging({
  rowCount,
  onNumClick,
  rowCountDefault,
  rowCountOptions,
  changeRowCount
}) {
  const [currPage, setCurrPage] = useState(1);
  const [currRowCount, setCurrRowCount] = useState(rowCountDefault);

  const renderPagesNums = () => {
    const pageNums = [];
    for (let i = 1; i <= rowCount; i++) {
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

  const NextPage = () => {
    if (currPage === rowCount) return;
    setCurrPage(currPage => currPage + 1);
    onNumClick(currPage + 1);
  };

  const handleRowCountChange = newRowCount => {
    setCurrRowCount({ value: newRowCount, label: newRowCount });
    changeRowCount(newRowCount);
    setCurrPage(1);
    onNumClick(1);
  };

  const customSelectStyle = {
    indicatorSeparator: styles => {
      return {
        ...styles,
        display: "none"
      };
    },
    valueContainer: styles => {
      return {
        ...styles,
        padding: "2px 3px"
      };
    },
    container: (styles, { isFocused }) => {
      return {
        ...styles,
        backgroundColor: "#ffffff",
        border: "none",
        boxShadow: "0 1px 2px 0 rgba(0,0,0,0.15)",
        borderRadius: "4px",
        marginLeft: "42px",
        width: "82px",
        borderBottomLeftRadius: isFocused ? 0 : 4,
        borderBottomRightRadius: isFocused ? 0 : 4
      };
    },
    control: styles => {
      return {
        ...styles,
        border: "none",
        padding: "8px"
        // width: "82px"
      };
    },
    option: (styles, { isFocused }) => {
      return {
        ...styles,
        backgroundColor: isFocused ? "#F7F8FB" : "#ffffff",
        borderColor: "transparent",
        fontFamily: "Open Sans",
        color: "#212529",
        fontSize: 16,
        paddingLeft: 22
      };
    },
    singleValue: styles => {
      return {
        ...styles,
        paddingLeft: 10
      };
    }
  };

  const dropdownIndicatorStyle = {
    color: "#C2C3C8",
    marginRight: 10
  };

  return (
    <PagingNumbers>
      {map(renderPagesNums(), num => num)}
      <TableArrow onClick={NextPage} />
      {rowCountOptions && (
        <Select
          options={rowCountOptions}
          onChange={e => handleRowCountChange(e.value)}
          value={currRowCount}
          components={{
            DropdownIndicator: () => (
              <TableSortArrowIcon style={dropdownIndicatorStyle} />
            )
          }}
          styles={customSelectStyle}
        ></Select>
      )}
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
