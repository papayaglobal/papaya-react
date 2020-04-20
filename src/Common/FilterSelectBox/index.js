import React, { useState, useEffect, forwardRef, useImperativeHandle, useRef } from "react";
import styled from "styled-components";
import {
    map,
    isEqual,
    compact,
    flatten,
    includes,
    filter,
    isEmpty,
    toLower,
    slice,
    size,
    flatMap,
    omit,
    uniqBy,
    each,
    get
} from "lodash";
import { BRIGHT5, DARK2, ACCENT1DARK } from "../../Constants/colors";
import FilterList from "./FilterList";
import SearchInput from "./SearchInput";
import Button from "../Button";
const hash = require("object-hash");

export const hasList = (filters) => {
    return isList(get(filters, "0", []));
};

export const isList = (filter) => {
    if (filter.listName && filter.filtersList && filter.filtersList.length > 0) {
        return true;
    }
    return false;
};

const unSelectAll = (filters) => {
    return map(filters, (filter) => {
        if (!isList(filter)) {
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
    const mappedFilters = map(filters, (filter) => {
        if (!isList(filter)) {
            return {
                ...filter,
                isSelected: checkIfInDraft(filter, draftFilters) || filter.isSelected || false
            };
        } else {
            return {
                ...filter,
                filtersList: uniqBy(
                    map(filter.filtersList, (item) => {
                        return {
                            ...item,
                            isSelected: checkIfInDraft(filter, draftFilters) || item.isSelected || false
                        };
                    }),
                    "data"
                )
            };
        }
    });

    return !hasList(filters) ? uniqBy(mappedFilters, "data") : mappedFilters;
};

const getCustomFilters = (newFilters, prevFilters, isLazyLoad, draftFilters) => {
    if (!isLazyLoad) {
        return mapFilters(newFilters);
    }
    const diff = mapFilters(slice(newFilters, size(prevFilters)), draftFilters);

    const customFilters = size(prevFilters) ? [...prevFilters, ...diff] : diff;

    return customFilters;
};

function FilterSelectBox({ filters, onSave, onLazy, loading, hasMore, saveLabel, clearLabel, inputDelay }, ref) {
    console.log("FilterSelectBox -> filters", filters);
    const searchEl = useRef(null);
    const [filtersState, setFiltersState] = useState([]);
    const [filtersToShow, setFiltersToShow] = useState([]);
    const [draftSelected, setDraftSelected] = useState([]);
    const [filtersDictionary, setFiltersDictionary] = useState({});
    const [searchTermState, setSearchTermState] = useState("");

    useImperativeHandle(ref, () => ({
        clearFilters: () => {
            clearSelections();
        },
        setSearchInput: () => {
            searchEl.current.setInputValue();
        }
    }));

    const filterBySearchTerm = (givenFilters, value) => {
        return compact(
            map(givenFilters, (filterItem) => {
                if (isList(filterItem)) {
                    const filterdItemList = filter(filterItem.filtersList, (item) =>
                        item.searchTerm
                            ? includes(toLower(item.searchTerm), toLower(value))
                            : includes(toLower(item.output), toLower(value))
                    );
                    return isEmpty(filterdItemList)
                        ? null
                        : {
                              ...filterItem,
                              filtersList: filterdItemList
                          };
                } else {
                    return filterItem.searchTerm
                        ? includes(toLower(filterItem.searchTerm), toLower(value)) && filterItem
                        : includes(toLower(filterItem.output), toLower(value)) && filterItem;
                }
            })
        );
    };

    const handleSearch = (value, givenFilters = filtersState) => {
        setSearchTermState(value);
        if (onLazy) {
            onLazy(value);
            setFiltersState([]);

            return;
        }

        if (!value) {
            setFiltersToShow(filtersState);

            return;
        }

        const searchedFilters = filterBySearchTerm(givenFilters, value);
        setFiltersToShow(flatten(searchedFilters));
    };

    const getSelectedFilters = (givenFilters) => {
        const selectedFilters = compact(
            flatMap(givenFilters, (filterItem) => {
                if (isList(filterItem)) {
                    return uniqBy(
                        compact(map(filterItem.filtersList, (item) => item.isSelected === true && item)),
                        "data"
                    );
                }

                return filterItem.isSelected === true && filterItem;
            })
        );

        return !hasList(givenFilters) ? uniqBy(selectedFilters, "data") : selectedFilters;
    };

    const getNewDrafts = (givenFilters, draftFilters) => {
        const newDrafts = compact(
            flatMap(givenFilters, (filterItem) => {
                if (isList(filterItem)) {
                    return uniqBy(
                        compact(
                            map(
                                filterItem.filtersList,
                                (item) => item.isSelected === true && !checkIfInDraft(item, draftFilters) && item
                            )
                        ),
                        "data"
                    );
                }

                return filterItem.isSelected === true && !checkIfInDraft(filterItem, draftFilters) && filterItem;
            })
        );

        return !hasList(givenFilters) ? uniqBy(newDrafts, "data") : newDrafts;
    };

    const getUnselectedFilters = (givenFilters) => {
        const unselectedFilters = compact(
            flatMap(givenFilters, (filterItem) => {
                const unselectedFilters = compact(
                    map(filterItem.filtersList, (item) => item.isSelected === false && item)
                );
                if (isList(filterItem) && !isEmpty(unselectedFilters)) {
                    return {
                        ...filterItem,
                        filtersList: uniqBy(unselectedFilters, "data")
                    };
                }

                return filterItem.isSelected === false && filterItem;
            })
        );

        return !hasList(givenFilters) ? uniqBy(unselectedFilters, "data") : unselectedFilters;
    };

    const filtersToDictionary = (filters) => {
        const dictionary = {};

        each(filters, (filter) => {
            if (isList(filter)) {
                each(filter.filtersList, (listItem) => {
                    dictionary[hash(listItem.data)] = listItem;
                });
            } else {
                dictionary[hash(filter.data)] = filter;
            }
        });

        return dictionary;
    };

    useEffect(() => {
        updateGivenFilters(filters);
    }, [filters]);

    useEffect(() => {
        const newDictionary = filtersToDictionary(filtersState);

        setFiltersDictionary(newDictionary);
    }, [filtersState]);

    const updateGivenFilters = (givenFilters) => {
        const customFilters = getCustomFilters(givenFilters, filtersState, !!onLazy, draftSelected);
        const selectedFilters = getSelectedFilters(customFilters);
        if (!isEmpty(selectedFilters)) {
            const orderedFilters = getUnselectedFilters(customFilters);
            const filterStateContent = [
                {
                    listName: "Selected",
                    filtersList: selectedFilters
                },
                ...orderedFilters
            ];
            setFiltersState(filterStateContent);
            setFiltersToShow(filterStateContent);
        } else {
            setFiltersState(customFilters);
            setFiltersToShow(customFilters);
        }
        setDraftSelected((prev) => [...prev, ...getNewDrafts(customFilters, draftSelected)]);
    };

    const handleToggle = (item, listName) => {
        setDraftSelected((prev) =>
            item.isSelected
                ? filter(prev, (draftFilter) => !isEqual(draftFilter, item))
                : [...prev, { ...item, isSelected: true }]
        );
        const updatedFilters = toggleFilter(filtersState, { item, listName });
        setFiltersState(updatedFilters);

        if (!onLazy) {
            const searchedFilters = searchTermState
                ? filterBySearchTerm(updatedFilters, searchTermState)
                : updatedFilters;
            setFiltersToShow(searchedFilters);
        } else {
            setFiltersToShow(updatedFilters);
        }
    };

    const getFiltersByState = () => {
        return map(filters, (filter) => {
            if (isList(filter)) {
                return {
                    ...filter,
                    filtersList: map(filter.filtersList, (filterListItem) => {
                        return filtersDictionary[hash(filterListItem.data)];
                    })
                };
            } else {
                return filtersDictionary[hash(filter.data)];
            }
        });
    };

    const handleSave = () => {
        setSearchTermState("");
        searchEl.current.clearInput();

        if (!isEmpty(draftSelected)) {
            const orderedFilters = getFiltersByState();
            const unselectedFilters = getUnselectedFilters(orderedFilters);
            const filterStateContent = [
                {
                    listName: "Selected",
                    filtersList: draftSelected
                },
                ...unselectedFilters
            ];
            setFiltersState(filterStateContent);
            setFiltersToShow(filterStateContent);
        } else {
            const unselectedFilters = unSelectAll(filters);
            setFiltersState(unselectedFilters);
            setFiltersToShow(unselectedFilters);
        }

        if (!onSave) {
            return;
        }
        onSave(draftSelected);
    };

    const clearSelections = () => {
        const unselectedFilters = unSelectAll(filters); // not using filtersstate cuz need to original positions
        setFiltersState(unselectedFilters);
        setFiltersToShow(unselectedFilters);
        setDraftSelected([]);
        setSearchTermState("");
        searchEl.current.clearInput();
    };

    return (
        <SelectBox filtersCount={filtersToShow.length}>
            <SearchInput ref={searchEl} onChange={handleSearch} delay={inputDelay} searchTerm={searchTermState} />
            {filtersToShow.length > 0 && (
                <>
                    <FilterList
                        filters={filtersToShow}
                        toggleIsSelected={handleToggle}
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
