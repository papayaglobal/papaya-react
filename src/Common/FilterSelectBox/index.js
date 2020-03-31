import React, { useState, useEffect, useCallback } from "react";
import styled from "styled-components";
import { map, isEqual, compact, flatten, includes, filter, isEmpty, toLower } from "lodash";
import { BRIGHT5, DARK2, ACCENT1DARK } from "../../Constants/colors";
import FilterList from "./FilterList";
import SearchInput from "./SearchInput";
import Button from "../Button";

export const checkIfList = (filter) => {
    if (filter.listName && filter.filtersList.length > 0) {
        return true;
    }
    return false;
};

const unSelectAll = (filters) => {
    return map(filters, (filter) => {
        if (!checkIfList(filter)) {
            return {
                ...filter,
                isSelected: false
            };
        } else {
            return {
                ...filter,
                filtersList: map(filter.filtersList, (item) => {
                    return {
                        ...item,
                        isSelected: false
                    };
                })
            };
        }
    });
};

const checkIfEqual = (filterListItem, item) => {
    return isEqual(filterListItem.data, item.data)
        ? { ...filterListItem, isSelected: !filterListItem.isSelected }
        : filterListItem;
};

const toggleFilter = (filters, { item, listName }) => {
    return map(filters, (filterItem) => {
        if (listName) {
            if (listName === filterItem.listName) {
                return {
                    ...filterItem,
                    filtersList: map(filterItem.filtersList, (filterListItem) => {
                        return checkIfEqual(filterListItem, item);
                    })
                };
            } else {
                return checkIfEqual(filterItem, item);
            }
        } else {
            return checkIfEqual(filterItem, item);
        }
    });
};

export default function FilterSelectBox({
    filters,
    onSave,
    onLazy,
    loading,
    hasMore,
    saveLabel,
    clearLabel,
    searchTerm,
    inputDelay
}) {
    const customFilters = map(filters, (filter) => {
        if (!checkIfList(filter)) {
            return {
                data: filter,
                isSelected: filter.isSelected || false
            };
        } else {
            return {
                ...filter,
                filtersList: map(filter.filtersList, (item) => {
                    return {
                        data: item,
                        isSelected: item.isSelected || false
                    };
                })
            };
        }
    });

    const customSearchTerm = searchTerm ? searchTerm : "";

    const [filtersState, setFiltersState] = useState(customFilters);
    const [filtersToShow, setFiltersToShow] = useState(customFilters);
    const [searchTermState, setSearchTermState] = useState(customSearchTerm);

    const setTerm = (term) => {
        setSearchTermState(term);
    };

    const handleSearch = (value) => {
        if (onLazy) {
            onLazy(value);

            return;
        }

        if (!value) {
            setFiltersToShow(filtersState);

            return;
        }

        const searchedFilters = compact(
            map(filtersState, (filterItem) => {
                if (checkIfList(filterItem)) {
                    const filterdItemList = filter(filterItem.filtersList, (item) =>
                        item.data.searchTerm
                            ? includes(toLower(item.data.searchTerm), value)
                            : includes(toLower(item.data.output), value)
                    );
                    return isEmpty(filterdItemList)
                        ? null
                        : {
                              ...filterItem,
                              filtersList: filterdItemList
                          };
                } else {
                    return filterItem.data.searchTerm
                        ? includes(toLower(filterItem.data.searchTerm), value) && filterItem
                        : includes(toLower(filterItem.data.output), value) && filterItem;
                }
            })
        );
        setFiltersToShow(flatten(searchedFilters));
    };

    useEffect(() => {
        setFiltersState(customFilters);
        setFiltersToShow(customFilters);
    }, [filters]);

    const toggleIsSelected = (item, listName) => {
        setFiltersState(toggleFilter(filtersState, { item, listName }));
        setFiltersToShow(toggleFilter(filtersToShow, { item, listName }));
    };

    const handleSave = () => {
        if (!onSave) {
            return;
        }

        const selectedFilters = compact(
            map(filtersState, (filterItem) => {
                if (filterItem.listName) {
                    return compact(map(filterItem.filtersList, (item) => item.isSelected === true && item.data));
                }
                return filterItem.isSelected === true && filterItem.data;
            })
        );

        onSave(flatten(selectedFilters));
    };

    const clearSelections = () => {
        setFiltersState(unSelectAll(filtersState));
        setFiltersToShow(unSelectAll(filtersToShow));
    };

    return (
        <SelectBox filtersCount={filtersToShow.length}>
            <SearchInput onChange={handleSearch} delay={inputDelay} searchTerm={searchTermState} setTerm={setTerm} />
            {filtersToShow.length > 0 && (
                <>
                    <FilterList
                        filters={filtersToShow}
                        toggleIsSelected={toggleIsSelected}
                        onLazy={() => onLazy(searchTermState)}
                        loading={loading}
                        hasMore={hasMore}
                    />
                    <ActionButtons>
                        <span onClick={clearSelections}>{clearLabel}</span>
                        <Button size="medium" onClick={handleSave}>
                            {saveLabel}
                        </Button>
                    </ActionButtons>
                </>
            )}
        </SelectBox>
    );
}

const SelectBox = styled.div`
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    border: 1px solid ${BRIGHT5};
    box-shadow: 0 5px 10px 0 rgba(0, 0, 0, 0.2);
    border-radius: 4px;
    height: ${({ filtersCount }) => (filtersCount > 0 ? "430px" : "unset")};
    width: 350px;
    padding-top: 14.5px;
    padding-bottom: ${({ filtersCount }) => (filtersCount > 0 ? "opx" : "14.5px")};
`;

const ActionButtons = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    padding: 15px;
    border-top: 1px solid rgba(52, 57, 73, 0.1);
    span {
        font-size: 14px;
        color: ${DARK2};
        &:hover {
            cursor: pointer;
            color: ${ACCENT1DARK};
        }
    }
    button {
        width: 60px;
        margin: 0;
    }
`;
