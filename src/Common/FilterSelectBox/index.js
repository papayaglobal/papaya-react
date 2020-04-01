import React, { useState, useEffect, forwardRef, useImperativeHandle } from "react";
import styled from "styled-components";
import { map, isEqual, compact, flatten, includes, filter, isEmpty, toLower, slice, size } from "lodash";
import { BRIGHT5, DARK2, ACCENT1DARK } from "../../Constants/colors";
import FilterList from "./FilterList";
import SearchInput from "./SearchInput";
import Button from "../Button";
import { is } from "date-fns/locale";

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

const checkIfEqualAndToggle = (filterListItem, item) => {
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
                        return checkIfEqualAndToggle(filterListItem, item);
                    })
                };
            } else {
                return checkIfEqualAndToggle(filterItem, item);
            }
        } else {
            return checkIfEqualAndToggle(filterItem, item);
        }
    });
};

const checkIfInDraft = (filterItem, draftFilters) => {
    return !isEmpty(filter(draftFilters, (draft) => isEqual(draft, filterItem)));
};

const mapFilters = (filters, draftFilters) => {
    return map(filters, (filter) => {
        if (!checkIfList(filter)) {
            return {
                data: filter,
                isSelected: checkIfInDraft(filter, draftFilters) || filter.isSelected || false
            };
        } else {
            return {
                ...filter,
                filtersList: map(filter.filtersList, (item) => {
                    return {
                        data: item,
                        isSelected: checkIfInDraft(item, draftFilters) || item.isSelected || false
                    };
                })
            };
        }
    });
};

const getCustomFilters = (newFilters, prevFilters, isLazyLoad, draftFilters) => {
    if (!isLazyLoad) {
        return mapFilters(newFilters);
    }
    const diff = mapFilters(slice(newFilters, size(prevFilters) ? size(prevFilters) : 0), draftFilters);
    return size(prevFilters) ? [...prevFilters, ...diff] : diff;
};

function FilterSelectBox(
    { filters, onSave, onLazy, loading, hasMore, saveLabel, clearLabel, searchTerm, inputDelay },
    ref
) {
    const customSearchTerm = searchTerm ? searchTerm : "";

    const [filtersState, setFiltersState] = useState([]);
    const [filtersToShow, setFiltersToShow] = useState([]);
    const [draftLazyLoadSelected, setDraftLazyLoadSelected] = useState([]);
    const [searchTermState, setSearchTermState] = useState(customSearchTerm);

    useImperativeHandle(ref, () => ({
        clearFilters: () => {
            clearSelections();
        }
    }));

    const setTerm = (term) => {
        setSearchTermState(term);
    };

    const handleSearch = (value) => {
        if (onLazy) {
            onLazy(value);
            setFiltersState([]);

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
        const customFilters = getCustomFilters(filters, filtersState, !!onLazy, draftLazyLoadSelected);
        setFiltersState(customFilters);
        setFiltersToShow(customFilters);
    }, [filters]);

    const getSelectedFilters = (givenFilters) =>
        compact(
            map(givenFilters, (filterItem) => {
                if (filterItem.listName) {
                    return compact(map(filterItem.filtersList, (item) => item.isSelected === true && item.data));
                }
                return filterItem.isSelected === true && filterItem.data;
            })
        );

    const toggleIsSelected = (item, listName) => {
        const updatedFilters = toggleFilter(filtersState, { item, listName });
        setFiltersState(updatedFilters);
        setFiltersToShow(updatedFilters);
        if (!!onLazy) {
            setDraftLazyLoadSelected(getSelectedFilters(updatedFilters));
        }
    };

    const handleSave = () => {
        if (!onSave) {
            return;
        }

        const selectedFilters = !!onLazy ? draftLazyLoadSelected : getSelectedFilters(filtersState);
        onSave(selectedFilters);
        if (!!onLazy) {
            setDraftLazyLoadSelected([]);
        }
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

export default forwardRef(FilterSelectBox);

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
