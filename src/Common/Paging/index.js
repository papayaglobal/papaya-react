import React, { useState, useEffect, forwardRef, useImperativeHandle } from "react";
import Select from "react-select";
import styled from "styled-components";
import { map } from "lodash";
import { WHITE, BRIGHT1, DARK4, DARK1, DARK2, DARK3 } from "../../Constants/colors";
import { ReactComponent as TableSortArrowIcon } from "../../assets/icons/table-sorting-arrow.svg";
import { ReactComponent as ArrowSolid } from "../../assets/icons/arrow-solid.svg";
import { ReactComponent as LastPageArrow } from "../../assets/icons/arrow-solid-last-page.svg";

export default forwardRef(function Paging(
    { pageCount, onNumClick, rowCountDefault, rowCountOptions, changeRowCount },
    ref
) {
    const [currPage, setCurrPage] = useState(1);
    const [currRowCount, setCurrRowCount] = useState(rowCountDefault);

    useImperativeHandle(ref, () => ({
        goFirstPage() {
            setCurrPage(1);
        }
    }));

    useEffect(() => {
        onNumClick(currPage);
    }, [currPage]);

    const renderPagesNums = () => {
        const pageNums = [];
        let pagesToShowRange;
        if (pageCount < 6) {
            pagesToShowRange = { firstPage: 1, lastPage: pageCount };
        } else {
            pagesToShowRange = getPagesToShowRange();
        }
        for (let i = pagesToShowRange.firstPage; i <= pagesToShowRange.lastPage; i++) {
            pageNums.push(
                <PageNumber key={i} onClick={() => numClick(i)} currPage={isCurrPage(i)} pageLength={`${i}`.length}>
                    {i}
                </PageNumber>
            );
        }

        return pageNums;
    };

    const getPagesToShowRange = () => {
        const pagesRange = { firstPage: null, lastPage: null };
        if (currPage === 1 || currPage === 2 || currPage === 3) {
            pagesRange.firstPage = 1;
            pagesRange.lastPage = 5;
        } else if (currPage === pageCount || currPage === pageCount - 1 || currPage === pageCount - 2) {
            pagesRange.firstPage = pageCount - 4;
            pagesRange.lastPage = pageCount;
        } else {
            pagesRange.firstPage = currPage - 2;
            pagesRange.lastPage = currPage + 2;
        }
        return pagesRange;
    };

    const numClick = (num) => {
        setCurrPage(num);
    };

    const isCurrPage = (num) => {
        if (num === currPage) {
            return true;
        }
        return false;
    };

    const NextPage = () => {
        if (currPage === pageCount) {
            return;
        }
        setCurrPage((currPage) => currPage + 1);
    };

    const prevPage = () => {
        if (currPage === 1) {
            return;
        }
        setCurrPage((currPage) => currPage - 1);
    };

    const handleRowCountChange = (newRowCount) => {
        setCurrRowCount({ value: newRowCount, label: newRowCount });
        changeRowCount(newRowCount);
        setCurrPage(1);
    };

    const goLastPage = () => {
        setCurrPage(pageCount);
    };

    const goFirstPage = () => {
        setCurrPage(1);
    };

    const customSelectStyle = {
        indicatorSeparator: (styles) => {
            return {
                ...styles,
                display: "none"
            };
        },
        valueContainer: (styles) => {
            return {
                ...styles,
                padding: "2px 3px"
            };
        },
        container: (styles, { isFocused }) => {
            return {
                ...styles,
                backgroundColor: WHITE,
                border: "none",
                boxShadow: "0 1px 2px 0 rgba(0,0,0,0.15)",
                borderRadius: "4px",
                marginLeft: "42px",
                width: "82px",
                borderBottomLeftRadius: isFocused ? 0 : 4,
                borderBottomRightRadius: isFocused ? 0 : 4
            };
        },
        control: (styles) => {
            return {
                ...styles,
                border: "none",
                padding: "8px"
            };
        },
        option: (styles, { isFocused }) => {
            return {
                ...styles,
                backgroundColor: isFocused ? `${BRIGHT1}` : `${WHITE}`,
                borderColor: "transparent",
                color: "#212529",
                fontSize: 16,
                paddingLeft: 22
            };
        },
        singleValue: (styles) => {
            return {
                ...styles,
                paddingLeft: 10
            };
        }
    };

    const dropdownIndicatorStyle = {
        color: DARK4,
        marginRight: 10
    };

    return (
        <PagingNumbers>
            {currPage !== 1 && (
                <>
                    <LastPageArrowContainer first onClick={goFirstPage}>
                        <LastPageArrow></LastPageArrow>
                    </LastPageArrowContainer>
                    <ArrowContainer onClick={prevPage}>
                        <ArrowSolid />
                    </ArrowContainer>
                </>
            )}
            {map(renderPagesNums(), (num) => num)}
            {currPage !== pageCount && (
                <>
                    <ArrowContainer next onClick={NextPage}>
                        <ArrowSolid />
                    </ArrowContainer>
                    <LastPageArrowContainer onClick={goLastPage}>
                        <LastPageArrow></LastPageArrow>
                    </LastPageArrowContainer>
                </>
            )}
            {rowCountOptions && (
                <Select
                    options={rowCountOptions}
                    onChange={(e) => handleRowCountChange(e.value)}
                    value={currRowCount}
                    components={{
                        DropdownIndicator: () => <TableSortArrowIcon style={dropdownIndicatorStyle} />
                    }}
                    styles={customSelectStyle}
                ></Select>
            )}
        </PagingNumbers>
    );
});

const PagingNumbers = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 30px;
    font-size: 14px;
    color: DARK1;
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
    display: flex;
    justify-content: center;
    align-items: center;
    height: ${({ pageLength }) =>
        pageLength < 4 ? "30px" : pageLength < 6 ? "45px" : pageLength > 7 ? "70px" : "60px"};
    width: ${({ pageLength }) =>
        pageLength < 4 ? "30px" : pageLength < 6 ? "45px" : pageLength > 7 ? "70px" : "60px"};
    border-radius: 50%;
    background-color: ${({ currPage }) => (currPage ? "rgba(72,77,91,0.05)" : "transparent")};
    font-weight: ${({ currPage }) => (currPage ? "600" : "regular")};
    color: ${({ currPage }) => (currPage ? `${DARK1}` : `${DARK2}`)};
    &:hover {
        cursor: pointer;
        color: #0d1975f0;
        background-color: #1975f00d;
    }
    &::selection {
        background: none;
    }
`;

const ArrowContainer = styled.div`
    transform: ${({ next }) => (next ? "rotate(270deg)" : "rotate(90deg)")};
    margin: ${({ next }) => (next ? "0 15px 0 0" : "0 12px 0 15px")};
    display: flex;
    justify-content: center;
    align-items: center;
    height: 30px;
    width: 30px;
    border-radius: 50%;
    transition: all 0.3s ease;
    &:hover {
        cursor: pointer;
        background-color: #1975f00d;
        svg {
            color: #0d1975f0;
        }
    }
    svg {
        color: #b5b7bd;
        transition: all 0.3s ease;
    }
`;

const LastPageArrowContainer = styled.div`
    transform: ${({ first }) => (first ? "rotate(180deg)" : "rotate(0deg)")};
    display: flex;
    justify-content: center;
    align-items: center;
    height: 30px;
    width: 30px;
    border-radius: 50%;
    &:hover {
        cursor: pointer;
        background-color: #1975f00d;
        svg {
            color: #0d1975f0;
        }
    }
    svg {
        color: DARK3;
        transition: all 0.3s ease;
    }
`;
