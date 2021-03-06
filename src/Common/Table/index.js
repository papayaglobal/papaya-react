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
    isNil,
    find,
    isEqual,
    toLower
} from "lodash";
import React, { useEffect, useRef, useState, forwardRef, useImperativeHandle } from "react";
import styled from "styled-components";
import { DARK3, DARK1 } from "../../Constants/colors";
import SideMenuIcon from "../../assets/icons/context-menu.svg";
import { ReactComponent as TableSortArrowIcon } from "../../assets/icons/table-sorting-arrow.svg";
import { ReactComponent as TableArrow } from "../../assets/icons/tableArrow.svg";
import Dropdown from "../../Common/Dropdown";
import Paging from "../../Common/Paging";
import Spinner from "../../Common/Spinner";
import { CheckBox } from "../../Common/Checkbox";
import { StyledActions } from "../../papaya-styled-components/contractorPaymentRowHelpers";

function Table(
    {
        columns,
        data,
        onSelected,
        expandable,
        sideMenu,
        defaultSideMenu,
        rowCountDefault,
        rowCountOptions,
        onLazyLoad,
        lazyExpand,
        totalRows,
        className
    },
    ref
) {
    const customData = map(data, (item, index) => {
        return {
            ...item,
            isExpanded: false,
            rowIndex: index
        };
    });

    const customColumns = map(columns, (column) => {
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
    const paginationRef = useRef();

    useImperativeHandle(ref, () => ({
        reset: () => {
            setCustomColumnState(customColumns);
            setCustomDataState(customData);

            setFirstRowIndex(0);
            paginationRef.current.goFirstPage();
        }
    }));

    useEffect(() => {
        if (!isEqual(customData, customDataState)) {
            setCustomDataState(customData);
        }
    }, [data]);

    useEffect(() => {
        if (!isNil(onLazyLoad)) {
            emitLazyLoad();
        } else {
            collapseRows();
        }
    }, [firstRowIndex, rowCountState, customColumnState]);

    useEffect(() => {
        if (!isNil(get(customDataState, "[0].isSelected"))) {
            checkIfAllSelected();
        }
    }, [firstRowIndex, rowCountState, customDataState]);

    const emitLazyLoad = async () => {
        if (isNil(onLazyLoad)) {
            return;
        }

        const sortedColumn = find(customColumnState, (column) => !isNil(column.sortOrder));
        const slicedData = await onLazyLoad({
            first: firstRowIndex,
            rowCount: rowCountState,
            sortColumnId: get(sortedColumn, "colId"),
            sortColumnOrder: get(sortedColumn, "sortOrder")
        });

        const slicedCustomData = map(slicedData, (item, index) => {
            return {
                ...item,
                isExpanded: false,
                rowIndex: index
            };
        });
        setCustomDataState(slicedCustomData);
    };

    const renderHeaders = () => {
        return map(customColumnState, (column, headerIdx) => {
            const { output, flex, sortOrder, notSortable } = column;
            const isSortable = isNil(notSortable) || !notSortable;

            return (
                <TableText key={`header-table-text-${headerIdx}`} flex={flex} isSortable={isSortable} header>
                    <span
                        className={`${toLower(output)}-table-header`}
                        onClick={() => isSortable && sortColumn(column, headerIdx)}
                    >
                        {output}
                    </span>
                    <SortArrowContainer sortOrder={sortOrder}>
                        <TableSortArrowIcon />
                    </SortArrowContainer>
                </TableText>
            );
        });
    };

    const renderBody = () => {
        let rowsToShow = getRowsToShow();
        return map(rowsToShow, (row) => {
            return (
                <TableRowContainer key={`table-row-${row.rowIndex}`} isExpanded={row.isExpanded}>
                    <TableRow
                        className="table-row"
                        onClick={() => expandRow(row.rowIndex, row)}
                        isExpanded={row.isExpanded}
                    >
                        {!isNil(row.isSelected) && (
                            <div>
                                <CheckBox
                                    checked={!!get(row, "isSelected")}
                                    onClick={() => toggleCheckbox(row.rowIndex)}
                                />
                            </div>
                        )}
                        {expandable && (
                            <ExpandArrow isExpanded={row.isExpanded}>
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
                    {expandable && (
                        <ExpandRowContent isExpanded={row.isExpanded} ref={row.expandRowEl}>
                            {row.expandContent ? (
                                row.expandContent
                            ) : (
                                <SpinnerContainer>
                                    <Spinner width="34px" height="34px" color={DARK3} />
                                </SpinnerContainer>
                            )}
                        </ExpandRowContent>
                    )}
                </TableRowContainer>
            );
        });
    };

    const lazyRenderExpandContent = async (row, rowIndex) => {
        let currentData = customDataState;
        const newContent = await lazyExpand(row);
        const index = currentData.findIndex((d) => d.rowIndex === rowIndex);
        update(currentData, `[${index}].expandContent`, () => newContent);

        setCustomDataState([...currentData]);
    };

    const getRowsToShow = () => {
        if (!isNil(onLazyLoad)) {
            return slice(customDataState, 0, 0 + rowCountState);
        }

        let rowsToShow;
        if (rowCountState) {
            rowsToShow = slice(customDataState, firstRowIndex, firstRowIndex + rowCountState);
        } else {
            rowsToShow = customDataState;
        }

        return rowsToShow;
    };

    const renderSideMenu = (row) => {
        let list = [...defaultSideMenu];
        if (!isNil(row.sideMenuContent)) {
            list = row.sideMenuContent;
        }
        list = map(list, (sideMenu) => ({
            ...sideMenu,
            action: () => {
                sideMenu.action(row);
            }
        }));

        return (
            <SideMenuContainer>
                <StyledActions>
                    <Dropdown list={list} icon={SideMenuIcon} buttonBackgroundColor={"transparent"} />
                </StyledActions>
            </SideMenuContainer>
        );
    };

    const sortColumn = (column, headerIdx) => {
        let { sortOrder, colId } = column;
        const updatedColumns = map(customColumnState, (column) => ({
            ...column,
            sortOrder: null
        }));
        const updatedSortOrder = sortOrder === "asc" ? "desc" : sortOrder === null ? "asc" : null;
        update(updatedColumns, `[${headerIdx}].sortOrder`, () => updatedSortOrder);

        setCustomColumnState([...updatedColumns]);

        if (!isNil(onLazyLoad)) {
            setFirstRowIndex(0);
            paginationRef.current.goFirstPage();
        } else {
            const updatedData = column.sortMethod
                ? column.sortMethod(customDataState, updatedSortOrder)
                : orderBy(customDataState, colId, updatedSortOrder);
            setCustomDataState([...updatedData]);
            if (!isNil(rowCountDefault)) {
                setFirstRowIndex(0);
                paginationRef.current.goFirstPage();
            }
        }
    };

    const toggleCheckbox = (rowIndex) => {
        const updatedData = customDataState;
        const index = findIndex(updatedData, (item) => item.rowIndex === rowIndex);
        update(updatedData, `[${index}].isSelected`, (value) => !value);
        setCustomDataState([...updatedData]);
        if (onSelected) {
            onSelected(getSelected());
        }
    };

    const checkIfAllSelected = () => {
        const selectedItems = filter(getRowsToShow(), ["isSelected", false]);
        setCheckboxState(isEmpty(selectedItems));
    };

    const collapseRows = () => {
        setCustomDataState(map(customDataState, (row) => ({ ...row, isExpanded: false })));
    };

    const getSelected = () => {
        let selectedRows = filter(customDataState, (item) => item.isSelected);

        return map(selectedRows, (row) => omit(row, ["isExpanded", "expandRowEl", "rowIndex"]));
    };

    const toggleAll = (event) => {
        const updatedData = map(customDataState, (item) => {
            if (includes(getRowsToShow(), item)) {
                item.isSelected = event.target.checked;
            }

            return item;
        });

        setCustomDataState([...updatedData]);

        if (onSelected) {
            onSelected(getSelected());
        }
    };

    const expandRow = (rowIndex, row) => {
        const updatedData = customDataState;
        const index = updatedData.findIndex((d) => d.rowIndex === rowIndex);
        update(updatedData, `[${index}].isExpanded`, (value) => !value);
        setCustomDataState([...updatedData]);
        if (lazyExpand && isNil(row.expandContent)) {
            lazyRenderExpandContent(row, rowIndex);
        }
    };

    const changePage = (page) => {
        collapseRows();
        setFirstRowIndex(page * rowCountState - rowCountState);
    };

    const changeRowCount = (rowCount) => {
        if (!rowCount) {
            return;
        }
        setRowCountState(rowCount);
    };

    return (
        <>
            <TableContainer className={className}>
                <TableRow header>
                    {!isNil(get(customDataState, "[0].isSelected")) && (
                        <div>
                            <CheckBox checked={headerCheckboxState} onClick={toggleAll} />
                        </div>
                    )}
                    {expandable && <ExpandArrow></ExpandArrow>}
                    {renderHeaders()}
                    {sideMenu && <SideMenuContainer></SideMenuContainer>}
                </TableRow>
                {renderBody()}
                {rowCountState && (
                    <Paging
                        ref={paginationRef}
                        pageCount={Math.ceil(
                            onLazyLoad ? totalRows / rowCountState : customDataState.length / rowCountState
                        )}
                        onNumClick={(page) => changePage(page)}
                        rowCountDefault={{
                            value: rowCountDefault,
                            label: rowCountDefault
                        }}
                        rowCountOptions={rowCountOptions}
                        changeRowCount={changeRowCount}
                    ></Paging>
                )}
            </TableContainer>
        </>
    );
}

export default forwardRef(Table);

const TableContainer = styled.div`
    margin: 0px 25px;
    border-top: 1px solid rgba(52, 57, 73, 0.1);
    width: inherit;
`;

const TableRow = styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    padding: 10px;
    color: ${(props) => (props.header ? `${DARK3}` : `${DARK1}`)};
    box-shadow: ${(props) => (props.header || props.isExpanded ? "none" : "0 1px 4px 0 rgba(0, 0, 0, 0.1)")};
    border-radius: ${(props) => (props.header ? "none" : "4px")};
    transition: ${(props) => (props.isExpanded ? "none" : "box-shadow 1.2s ease-out")};
    &:hover {
        cursor: ${({ header }) => (header ? "unset" : "pointer")};
    }
`;

const TableRowContainer = styled.div`
    display: flex;
    flex-direction: column;
    box-shadow: ${(props) => (props.isExpanded ? "0 1px 4px 0 rgba(0, 0, 0, 0.1)" : "none")};
    transition: box-shadow 0.5s ease-out;
    margin-bottom: 7px;
`;

const TableText = styled.div`
    position: relative;
    flex: ${(props) => props.flex};
    font-weight: ${({ header }) => (header ? "bold" : "regular")};
    span {
        &:hover {
            cursor: ${(props) => (props.isSortable ? "pointer" : "regular")};
        }
    }
`;

const ExpandRowContent = styled.div`
    overflow: hidden;
    max-height: ${({ isExpanded }) => (isExpanded ? "fit-content" : "0px")};
    transition: max-height 0.5s ease-out;
`;

const ExpandArrow = styled.div`
    flex-basis: 35px;
    text-align: center;
    margin-right: 3px;
    margin-bottom: 3px;
    svg {
        transition: all 0.5s ease;
        transform: ${({ isExpanded }) => (isExpanded ? "rotate(90deg)" : "")};
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
    position: absolute;
    margin-left: 5px;

    svg {
        transition: transform 0.5s, height 0.1s;
        height: ${({ sortOrder }) => (sortOrder ? "5px" : "0px")};
        transform: ${({ sortOrder }) => (sortOrder === "desc" ? "rotate(0deg)" : "rotate(-180deg)")};
    }
`;

const SpinnerContainer = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
`;
