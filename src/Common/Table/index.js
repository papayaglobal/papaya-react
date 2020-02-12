import React, { useState, useRef } from "react";
import styled from "styled-components";
import { get, map, omit, update, orderBy } from "lodash";
import { ReactComponent as TableArrow } from "../../assets/icons/tableArrow.svg";
import { ReactComponent as TableSortArrowIcon } from "../../assets/icons/table-sorting-arrow.svg";
import SideMenuIcon from "../../assets/icons/context-menu.svg";
import Dropdown from "../../Common/Dropdown";
import { StyledActions } from "../../papaya-styled-components/contractorPaymentRowHelpers";

export default function Table({
  columns,
  data,
  selectable,
  selectKey,
  onSelected,
  expandable,
  expandKey,
  sideMenu
}) {
  const customData = map(data, d => {
    return {
      ...d,
      isExpanded: false,
      expandRowEl: useRef()
    };
  });

  const customColumns = map(columns, c => {
    return {
      ...c,
      sortOrder: null
    };
  });

  const [customColumnState, setCustomColumnState] = useState(customColumns);
  const [customDataState, setCustomDataState] = useState(customData);
  // const [sortOrder, setSortOrder] = useState(null);

  const renderHeaders = () => {
    return map(customColumnState, (column, headerIdx) => {
      const { output, flex, sortOrder } = column;
      return (
        <TableText
          key={`header-table-text-${headerIdx}`}
          flex={flex}
          onClick={() => sortColumn(column, headerIdx)}
          header
        >
          {output}
          <SortArrowContainer sortorder={sortOrder}>
            <TableSortArrowIcon />
          </SortArrowContainer>
        </TableText>
      );
    });
  };

  const renderBody = () => {
    return map(customDataState, (row, rowIdx) => {
      return (
        <TableRowContainer
          key={`table-row-${rowIdx}`}
          isExpanded={row.isExpanded}
        >
          <TableRow isExpanded={row.isExpanded}>
            {selectable && (
              <Checkbox
                type="checkbox"
                checked={!!get(row, selectKey)}
                onChange={() => toggleCheckbox(rowIdx)}
              />
            )}
            {expandable && (
              <ExpandArrow
                onClick={() => expandRow(rowIdx)}
                isExpanded={row.isExpanded}
              >
                <TableArrow></TableArrow>
              </ExpandArrow>
            )}
            {map(customColumnState, (column, colKey) => {
              const { colId, flex } = column;
              return (
                <TableText key={`body-table-text-${colKey}`} flex={flex}>
                  {get(row, colId)}
                </TableText>
              );
            })}
            {sideMenu && (
              <SideMenuContainer>
                <StyledActions>
                  <Dropdown
                    list={row.sideMenuContent}
                    icon={SideMenuIcon}
                    buttonBackgroundColor={"transparent"}
                  />
                </StyledActions>
              </SideMenuContainer>
            )}
          </TableRow>
          <ExpandRowContent
            isExpanded={row.isExpanded}
            expandEl={row.expandRowEl}
            ref={row.expandRowEl}
            onClick={() => console.log(row.expandRowEl)}
          >
            {row[expandKey]}
          </ExpandRowContent>
        </TableRowContainer>
      );
    });
  };

  const sortColumn = (column, headerIdx) => {
    let { sortOrder, colId } = column;
    const updatedColumns = customColumnState;
    map(updatedColumns, column => (column.sortOrder = null));
    if (sortOrder === "acs") {
      update(updatedColumns, `[${headerIdx}].sortOrder`, () => "desc");
      sortOrder = "desc";
    } else if (sortOrder === null || sortOrder !== "asc") {
      update(updatedColumns, `[${headerIdx}].sortOrder`, () => "acs");
      sortOrder = "acs";
    }
    let updatedData;
    if (column.sortMethod)
      updatedData = column.sortMethod(customDataState, sortOrder);
    else updatedData = orderBy(customDataState, colId, sortOrder);
    setCustomColumnState([...updatedColumns]);
    setCustomDataState([...updatedData]);
  };

  const toggleCheckbox = rowIndex => {
    const updatedData = customDataState;
    update(updatedData, `[${rowIndex}]${selectKey}`, value => !value);
    setCustomDataState([...updatedData]);
    if (onSelected) {
      onSelected(getSelected());
    }
  };

  const getSelected = () => {
    let selectedRows = customDataState.filter(i => i[selectKey]);
    return map(selectedRows, i => omit(i, ["isExpanded", "expandRowEl"]));
  };

  const toggleAll = event => {
    const updatedData = map(customDataState, i => {
      i[selectKey] = event.target.checked;
      return i;
    });
    setCustomDataState([...updatedData]);
    if (onSelected) {
      onSelected(getSelected());
    }
  };

  const expandRow = rowIndex => {
    const updatedData = customDataState;
    update(updatedData, `[${rowIndex}].isExpanded`, value => !value);
    setCustomDataState([...updatedData]);
  };

  return (
    <TableContainer>
      <TableRow header>
        {selectable && <Checkbox type="checkbox" onClick={toggleAll} />}
        {expandable && <ExpandArrow></ExpandArrow>}
        {renderHeaders()}
        {sideMenu && <SideMenuContainer></SideMenuContainer>}
      </TableRow>
      {renderBody()}
    </TableContainer>
  );
}

const TableContainer = styled.div`
  margin: 0px 25px;
  border-top: 1px solid rgba(52, 57, 73, 0.1);
  width: 100%;
`;

const TableRow = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  padding: 10px;
  margin-bottom: 7px;
  color: ${props =>
    props.header ? "rgba(181,183,189,1)" : "rgba(72, 77, 91, 1)"};
  box-shadow: ${props =>
    props.header || props.isExpanded
      ? "none"
      : "0 1px 4px 0 rgba(0, 0, 0, 0.1)"};
  border-radius: ${props => (props.header ? "none" : "4px")};
  transition: ${props => (props.isExpanded ? "none" : "all 1.2s ease-out")};
`;

const TableRowContainer = styled.div`
  display: flex;
  /* overflow: hidden; */
  flex-direction: column;
  box-shadow: ${props =>
    props.isExpanded ? "0 1px 4px 0 rgba(0, 0, 0, 0.1)" : "none"};
  transition: all 0.5s ease-out;
`;

const TableText = styled.div`
  flex: ${props => props.flex};
  &:hover {
    cursor: ${({ header }) => (header ? "pointer" : "")};
  }
`;

const ExpandRowContent = styled.div`
  overflow: hidden;
  height: ${({ isExpanded, expandEl }) =>
    isExpanded
      ? `${expandEl.current.firstElementChild.clientHeight}px`
      : "0px"};
  transition: visibility 0.5s ease-out, height 0.5s ease-out;

  > *:first-of-type {
    padding: 10px;
  }
`;

const Checkbox = styled.input`
  flex: 0.2;
`;

const ExpandArrow = styled.div`
  flex: 0.2;
  svg {
    transition: all 0.5s ease;
    transform: ${({ isExpanded }) => (isExpanded ? "rotate(90deg)" : "")};
    &:hover {
      cursor: pointer;
    }
  }
`;

const SideMenuContainer = styled.div`
  flex: 0.4;
  svg {
    &:hover {
      cursor: pointer;
    }
  }
`;

const SortArrowContainer = styled.span`
  margin-left: 5px;
  svg {
    transition: transform 0.5s, height 0.1s;
    height: ${({ sortorder }) => (sortorder ? "5px" : "0px")};
    transform: ${({ sortorder }) =>
      sortorder === "desc" ? "rotate(0deg)" : "rotate(-180deg)"};
  }
`;
