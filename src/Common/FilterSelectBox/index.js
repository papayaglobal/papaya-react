import React, { useState, useEffect, forwardRef, useImperativeHandle } from "react";
import styled from "styled-components";
import { map, isEqual, compact, flatten, includes, filter, isEmpty, toLower, slice, size, flatMap, omit } from "lodash";
import { BRIGHT5, DARK2, ACCENT1DARK } from "../../Constants/colors";
import FilterList from "./FilterList";
import SearchInput from "./SearchInput";
import Button from "../Button";

export const checkIfList = (filter) => {
    if (filter.listName && filter.filtersList && filter.filtersList.length > 0) {
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
    return isEqual(filterListItem, item)
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
    return !isEmpty(
        filter(draftFilters, (draft) => isEqual(omit(draft, "isSelected"), omit(filterItem, "isSelected")))
    );
};

const mapFilters = (filters, draftFilters) => {
    return map(filters, (filter) => {
        if (!checkIfList(filter)) {
            return {
                ...filter,
                isSelected: checkIfInDraft(filter, draftFilters) || filter.isSelected || false
            };
        } else {
            return {
                ...filter,
                filtersList: map(filter.filtersList, (item) => {
                    return {
                        ...item,
                        isSelected: checkIfInDraft(filter, draftFilters) || item.isSelected || false
                    };
                })
            };
        }
    });
};

const getCustomFilters = (newFilters, prevFilters, isLazyLoad, override, draftFilters) => {
    if (!isLazyLoad) {
        return mapFilters(newFilters);
    }
    const diff = mapFilters(slice(newFilters, override ? 0 : size(prevFilters) ? size(prevFilters) : 0), draftFilters);

    return override ? diff : size(prevFilters) ? [...prevFilters, ...diff] : diff;
};

function FilterSelectBox(
    { filters, onSave, onLazy, loading, hasMore, saveLabel, clearLabel, searchTerm, inputDelay },
    ref
) {
    const customSearchTerm = searchTerm ? searchTerm : "";

    const [filtersState, setFiltersState] = useState([]);
    const [filtersToShow, setFiltersToShow] = useState([]);
    const [draftSelected, setDraftSelected] = useState([]);
    const [searchTermState, setSearchTermState] = useState(customSearchTerm);

    useImperativeHandle(ref, () => ({
        clearFilters: () => {
            clearSelections();
        }
    }));

    const setTerm = (term) => {
        setSearchTermState(term);
    };

    const handleSearch = (value, givenFilters = filtersState) => {
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
            map(givenFilters, (filterItem) => {
                if (checkIfList(filterItem)) {
                    const filterdItemList = filter(filterItem.filtersList, (item) =>
                        item.searchTerm
                            ? includes(toLower(item.searchTerm), value)
                            : includes(toLower(item.output), value)
                    );
                    return isEmpty(filterdItemList)
                        ? null
                        : {
                              ...filterItem,
                              filtersList: filterdItemList
                          };
                } else {
                    return filterItem.searchTerm
                        ? includes(toLower(filterItem.searchTerm), value) && filterItem
                        : includes(toLower(filterItem.output), value) && filterItem;
                }
            })
        );
        if (givenFilters !== filtersState) {
            return searchedFilters;
        }
        setFiltersToShow(flatten(searchedFilters));
    };

    const getSelectedFilters = (givenFilters) => {
        return compact(
            flatMap(givenFilters, (filterItem) => {
                if (filterItem.listName) {
                    return compact(map(filterItem.filtersList, (item) => item.isSelected === true && item));
                }

                return filterItem.isSelected === true && filterItem;
            })
        );
    };

    const removeSelectedFilters = (givenFilters) => {
        return compact(
            flatMap(givenFilters, (filterItem) => {
                const selectedFilters = compact(
                    map(filterItem.filtersList, (item) => item.isSelected === false && item)
                );
                if (filterItem.listName && !isEmpty(selectedFilters)) {
                    return {
                        ...filterItem,
                        filtersList: selectedFilters
                    };
                }

                return filterItem.isSelected === false && filterItem;
            })
        );
    };

    useEffect(() => {
        setGivenFilters(filters);
    }, [filters]);

    const setGivenFilters = (givenFilters, override) => {
        const customFilters = getCustomFilters(givenFilters, filtersState, !!onLazy, override, draftSelected);
        const selectedFilters = getSelectedFilters(customFilters);
        const orderedfilters = removeSelectedFilters(customFilters);
        if (!isEmpty(selectedFilters)) {
            setFiltersState([
                {
                    listName: "Selected",
                    filtersList: selectedFilters
                },
                ...orderedfilters
            ]);
            setFiltersToShow([
                {
                    listName: "Selected",
                    filtersList: selectedFilters
                },
                ...orderedfilters
            ]);
        } else {
            setFiltersState(customFilters);
            setFiltersToShow(customFilters);
        }
        setDraftSelected((prev) => [...prev, ...selectedFilters]);
    };

    const toggleIsSelected = (item, listName) => {
        const updatedFilters = toggleFilter(filtersState, { item, listName });
        setFiltersState(updatedFilters);
        if (!item.isSelected) {
            setDraftSelected((prev) => [...prev, { ...item, isSelected: true }]);
        }
        if (!onLazy) {
            const searchedFilters = searchTermState ? handleSearch(searchTermState, updatedFilters) : updatedFilters;
            setFiltersToShow(searchedFilters);
        } else {
            setFiltersToShow(updatedFilters);
        }
    };

    const handleSave = () => {
        if (!onSave) {
            return;
        }

        onSave(draftSelected);

        setDraftSelected([]);
    };

    const clearSelections = () => {
        setDraftSelected([]);
        setGivenFilters(unSelectAll(filters), true);
        setSearchTermState("");
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
