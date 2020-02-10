import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { get, map, omit, update, each } from "lodash";
import { StyledDates } from "../ContractorPaymentRow/contractorPaymentRowHelpers";

export default function Table({
  columns,
  data,
  selectable,
  selectKey,
  onSelected,
  expandable
}) {
  const customData = map(data, d => {
    return {
      ...d,
      isExpanded: false
    };
  });
  const [customDataState, setCustomDataState] = useState(customData);
  const [isExpanded, setIsExpanded] = useState(false);

  const renderHeaders = () => {
    return map(columns, (column, key) => {
      const { output, flex } = column;
      return (
        <TableText key={`header-table-text-${key}`} flex={flex}>
          {output}
        </TableText>
      );
    });
  };

  const renderBody = () => {
    return map(customDataState, (row, rowIdx) => {
      return (
        <TableRowContainer isExpanded={row.isExpanded}>
          <TableRow key={`table-row-${rowIdx}`} isExpanded={row.isExpanded}>
            {selectable && (
              <Checkbox
                type="checkbox"
                checked={!!get(row, selectKey)}
                onChange={() => toggleCheckbox(rowIdx)}
              />
            )}
            {expandable && (
              <ExpandArrow onClick={() => expandRow(rowIdx)}>></ExpandArrow>
            )}
            {map(columns, (column, colKey) => {
              const { colId, flex } = column;
              return (
                <TableText key={`body-table-text-${colKey}`} flex={flex}>
                  {get(row, colId)}
                </TableText>
              );
            })}
          </TableRow>
          {expandable && row.isExpanded && (
            <ExpandRowContent isExpanded={row.isExpanded}>
              {expandable}
            </ExpandRowContent>
          )}
        </TableRowContainer>
      );
    });
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
    return map(selectedRows, i => omit(i, "isExpanded"));
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
`;

const TableRowContainer = styled.div`
  display: flex;
  flex-direction: column;
  box-shadow: ${props =>
    props.isExpanded ? "0 1px 4px 0 rgba(0, 0, 0, 0.1)" : "none"};
`;

const TableText = styled.div`
  flex: ${props => props.flex};
`;

const ExpandRowContent = styled.div`
  padding: 10px;
  height: ${({ isExpanded }) => (isExpanded ? "fit-content" : "0px")};
  visibility: ${({ isExpanded }) => (isExpanded ? "visible" : "hidden")};
  transition: all 0.3s ease-out;
`;

const Checkbox = styled.input`
  flex: 0.4;
`;

const ExpandArrow = styled.div`
  flex: 0.4;
`;
