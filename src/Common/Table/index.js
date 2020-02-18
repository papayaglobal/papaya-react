import {
  filter,
  get,
  includes,
  map,
  omit,
  orderBy,
  slice,
  update,
  findIndex,
  isEmpty,
  isNil
} from "lodash";
import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { DARK3, DARK1 } from "../../Constants/colors";
import SideMenuIcon from "../../assets/icons/context-menu.svg";
import { ReactComponent as TableSortArrowIcon } from "../../assets/icons/table-sorting-arrow.svg";
import { ReactComponent as TableArrow } from "../../assets/icons/tableArrow.svg";
import Dropdown from "../../Common/Dropdown";
import Paging from "../../Common/Paging";
import { CheckBox } from "../../Common/Checkbox";
import { StyledActions } from "../../papaya-styled-components/contractorPaymentRowHelpers";

export default function Table({
  columns,
  data,
  selectKey,
  onSelected,
  expandKey,
  sideMenuKey,
  defaultSideMenu,
  rowCountDefault,
  rowCountOptions
}) {
  const customData = map(data, (item, index) => {
    return {
      ...item,
      isExpanded: false,
      expandRowEl: useRef(),
      rowIndex: index
    };
  });

  const customColumns = map(columns, column => {
    return {
      ...column,
      sortOrder: null
    };
  });

  const [customColumnState, setCustomColumnState] = useState(customColumns);
  const [customDataState, setCustomDataState] = useState(customData);
  const [firstRowIndex, setFirstRowIndex] = useState(0);
  const [rowCountState, setRowCountState] = useState(rowCountDefault);
  const [headerCheckboxState, setCheckboxState] = useState(false);

  useEffect(() => {
    if (selectKey) {
      checkIfAllSelected();
    }
  }, [firstRowIndex, rowCountState]);

  const renderHeaders = () => {
    return map(customColumnState, (column, headerIdx) => {
      const { output, flex, sortOrder } = column;
      return (
        <TableText key={`header-table-text-${headerIdx}`} flex={flex} header>
          <span onClick={() => sortColumn(column, headerIdx)}>{output}</span>
          <SortArrowContainer sortorder={sortOrder}>
            <TableSortArrowIcon />
          </SortArrowContainer>
        </TableText>
      );
    });
  };

  const renderBody = () => {
    let rowsToShow = getRowsToShow();
    return map(rowsToShow, row => {
      return (
        <TableRowContainer
          key={`table-row-${row.rowIndex}`}
          isExpanded={row.isExpanded}
        >
          <TableRow isExpanded={row.isExpanded}>
            {selectKey && (
              <CheckboxContainer>
                <CheckBox
                  checked={!!get(row, selectKey)}
                  onClick={() => toggleCheckbox(row.rowIndex)}
                />
              </CheckboxContainer>
            )}
            {expandKey && (
              <ExpandArrow
                onClick={() => expandRow(row.rowIndex)}
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
            {defaultSideMenu && renderSideMenu(row)}
          </TableRow>
          {expandKey && (
            <ExpandRowContent
              isExpanded={row.isExpanded}
              expandEl={row.expandRowEl}
              ref={row.expandRowEl}
            >
              {row[expandKey]}
            </ExpandRowContent>
          )}
        </TableRowContainer>
      );
    });
  };

  const getRowsToShow = () => {
    let rowsToShow;
    if (rowCountState) {
      rowsToShow = slice(
        customDataState,
        firstRowIndex,
        firstRowIndex + rowCountState
      );
    } else {
      rowsToShow = customDataState;
    }

    return rowsToShow;
  };

  const renderSideMenu = row => {
    let list = [...defaultSideMenu];
    if (!isNil(sideMenuKey)) {
      if (!isNil(row[sideMenuKey])) {
        list = row[sideMenuKey];
      }
    }

    list = map(list, sideMenu => ({
      ...sideMenu,
      action: () => {
        sideMenu.action(row);
      }
    }));

    return (
      <SideMenuContainer>
        <StyledActions>
          <Dropdown
            list={list}
            icon={SideMenuIcon}
            buttonBackgroundColor={"transparent"}
          />
        </StyledActions>
      </SideMenuContainer>
    );
  };

  const sortColumn = (column, headerIdx) => {
    let { sortOrder, colId } = column;
    const updatedColumns = map(customColumnState, column => ({
      ...column,
      sortOrder: null
    }));

    const updatedSortOrder = sortOrder === "asc" ? "desc" : "asc";
    update(updatedColumns, `[${headerIdx}].sortOrder`, () => updatedSortOrder);

    const updatedData = column.sortMethod
      ? column.sortMethod(customDataState, updatedSortOrder)
      : orderBy(customDataState, colId, updatedSortOrder);

    setCustomColumnState([...updatedColumns]);
    setCustomDataState([...updatedData]);
  };

  const toggleCheckbox = rowIndex => {
    const updatedData = customDataState;
    const index = findIndex(updatedData, item => item.rowIndex === rowIndex);
    update(updatedData, `[${index}]${selectKey}`, value => !value);
    setCustomDataState([...updatedData]);
    if (onSelected) {
      onSelected(getSelected());
    }
    checkIfAllSelected();
  };

  const checkIfAllSelected = () => {
    const unSelectedItems = filter(getRowsToShow(), [selectKey, false]);

    setCheckboxState(isEmpty(unSelectedItems));
  };

  const collapseRows = () => {
    map(getRowsToShow(), row => (row.isExpanded = false));
  };

  const getSelected = () => {
    let selectedRows = filter(customDataState, item => item[selectKey]);

    return map(selectedRows, row =>
      omit(row, ["isExpanded", "expandRowEl", "rowIndex"])
    );
  };

  const toggleAll = event => {
    const updatedData = map(customDataState, item => {
      if (includes(getRowsToShow(), item)) {
        item[selectKey] = event.target.checked;
      }

      return item;
    });

    setCustomDataState([...updatedData]);

    checkIfAllSelected();

    if (onSelected) {
      onSelected(getSelected());
    }
  };

  const expandRow = rowIndex => {
    const updatedData = customDataState;
    const index = updatedData.findIndex(d => d.rowIndex === rowIndex);
    update(updatedData, `[${index}].isExpanded`, value => !value);
    setCustomDataState([...updatedData]);
  };

  const changePage = page => {
    collapseRows();
    setFirstRowIndex(page * rowCountState - rowCountState);
  };

  const changeRowCount = rowCount => {
    if (!rowCount) {
      return;
    }
    setRowCountState(rowCount);
  };

  return (
    <>
      <TableContainer>
        <TableRow header>
          {selectKey && (
            <CheckboxContainer>
              <CheckBox checked={headerCheckboxState} onClick={toggleAll} />
            </CheckboxContainer>
          )}
          {expandKey && <ExpandArrow></ExpandArrow>}
          {renderHeaders()}
          {sideMenuKey && <SideMenuContainer></SideMenuContainer>}
        </TableRow>
        {renderBody()}
        {rowCountState && (
          <Paging
            pageCount={Math.ceil(customDataState.length / rowCountState)}
            onNumClick={page => changePage(page)}
            rowCountDefault={{ value: rowCountDefault, label: rowCountDefault }}
            rowCountOptions={rowCountOptions}
            changeRowCount={changeRowCount}
          ></Paging>
        )}
      </TableContainer>
    </>
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
  color: ${props => (props.header ? `${DARK3}` : `${DARK1}`)};
  box-shadow: ${props =>
    props.header || props.isExpanded
      ? "none"
      : "0 1px 4px 0 rgba(0, 0, 0, 0.1)"};
  border-radius: ${props => (props.header ? "none" : "4px")};
  transition: ${props =>
    props.isExpanded ? "none" : "box-shadow 1.2s ease-out"};
`;

const TableRowContainer = styled.div`
  display: flex;
  flex-direction: column;
  box-shadow: ${props =>
    props.isExpanded ? "0 1px 4px 0 rgba(0, 0, 0, 0.1)" : "none"};
  transition: box-shadow 0.5s ease-out;
`;

const TableText = styled.div`
  flex: ${props => props.flex};
  font-weight: ${({ header }) => (header ? "bold" : "regular")};
  span {
    &:hover {
      cursor: pointer;
    }
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

const CheckboxContainer = styled.div`
  flex: 0.2;
  margin-right: 4px;
`;

const ExpandArrow = styled.div`
  flex: 0.2;
  margin-bottom: 3px;
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
