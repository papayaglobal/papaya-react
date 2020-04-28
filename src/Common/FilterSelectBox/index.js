import React, { useState, useEffect, forwardRef, useImperativeHandle, useRef } from "react";
import styled from "styled-components";
import * as _ from "lodash";
import { BRIGHT5, DARK2, ACCENT1DARK } from "../../Constants/colors";
import FilterList from "./FilterList";
import SearchInput from "./SearchInput";
import Button from "../Button";
const hash = require("object-hash");

export const isList = (filter) => {
    if (filter.listName && filter.filtersList && filter.filtersList.length > 0) {
        return true;
    }
    return false;
};

const unSelectAll = (filters) => {
    return _.map(filters, (filter) => {
        if (!isList(filter)) {
            return {
                ...filter,
                isSelected: false
            };
        } else {
            return {
                ...filter,
                filtersList: _.map(filter.filtersList, (item) => {
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
    return _.isEqual(filterListItem, item)
        ? { ...filterListItem, isSelected: !filterListItem.isSelected }
        : filterListItem;
};

const toggleFilter = (filters, { item, listName }) => {
    return _.map(filters, (filterItem) => {
        if (listName) {
            if (listName === filterItem.listName) {
                return {
                    ...filterItem,
                    filtersList: _.map(filterItem.filtersList, (filterListItem) => {
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
    return !_.isEmpty(
        _.filter(draftFilters, (draft) => _.isEqual(_.omit(draft, "isSelected"), _.omit(filterItem, "isSelected")))
    );
};

const mapFilters = (filters, draftFilters) => {
    const mappedFilters = _.map(filters, (filter) => {
        if (!isList(filter)) {
            return {
                ...filter,
                isSelected: checkIfInDraft(filter, draftFilters) || filter.isSelected || false
            };
        } else {
            return {
                ...filter,
                filtersList: _.map(filter.filtersList, (item) => {
                    return {
                        ...item,
                        isSelected: checkIfInDraft(item, draftFilters) || item.isSelected || false
                    };
                })
            };
        }
    });

    return mappedFilters;
};

const getCustomFilters = (newFilters, prevFilters, isLazyLoad, draftFilters) => {
    if (!isLazyLoad) {
        return mapFilters(newFilters);
    }

    const diff = [];

    const newFiltersToAdd = mapFilters(newFilters, draftFilters);

    _.each(newFiltersToAdd, (filter) => {
        const relatedTo = _.find(
            prevFilters,
            (prevFilter) => filter.listName === prevFilter.listName
        );
        if (relatedTo) {
            relatedTo.filtersList = _.uniqBy(
                _.concat(relatedTo.filtersList, filter.filtersList),
                "output"
            );
        } else {
            diff.push(filter);
        }
    })

    const customFilters = _.concat(prevFilters, diff);

    return customFilters;
};

function FilterSelectBox({ filters, onSave, onLazy, loading, hasMore, saveLabel, clearLabel, inputDelay }, ref) {
    const searchEl = useRef(null);
    const [filtersState, setFiltersState] = useState([]);
    const [filtersToShow, setFiltersToShow] = useState([]);
    const [draftSelected, setDraftSelected] = useState([]);
    const [searchTermState, setSearchTermState] = useState("");
    const [previousFilters, setPreviousFilters] = useState([]);
    const [selectedFilters, setSelectedFilters] = useState([]);

    useImperativeHandle(ref, () => ({
        clearFilters: () => {
            clearSelections();
        },
        setSearchInput: () => {
            searchEl.current.setInputValue();
        }
    }));

    const filterBySearchTerm = (givenFilters, value) => {
        return _.compact(
            _.map(givenFilters, (filterItem) => {
                if (isList(filterItem)) {
                    const filterdItemList = _.filter(filterItem.filtersList, (item) =>
                        item.searchTerm
                            ? _.includes(_.toLower(item.searchTerm), _.toLower(value))
                            : _.includes(_.toLower(item.output), _.toLower(value))
                    );
                    return _.isEmpty(filterdItemList)
                        ? null
                        : {
                              ...filterItem,
                              filtersList: filterdItemList
                          };
                } else {
                    return filterItem.searchTerm
                        ? _.includes(_.toLower(filterItem.searchTerm), _.toLower(value)) && filterItem
                        : _.includes(_.toLower(filterItem.output), _.toLower(value)) && filterItem;
                }
            })
        );
    };

    const handleSearch = (value) => {
        setSearchTermState(value);
    };

    const getUnselectedFilters = (givenFilters) => {
        const unselectedFilters = _.compact(
            _.flatMap(givenFilters, (filterItem) => {
                const unselectedFilters = _.compact(
                    _.map(filterItem.filtersList, (item) => item.isSelected === false && item)
                );
                if (isList(filterItem) && !_.isEmpty(unselectedFilters)) {
                    return filterItem.listName !== "Selected" && {
                        ...filterItem,
                        filtersList: unselectedFilters
                    };
                }

                return filterItem.isSelected === false && filterItem;
            })
        );

        return unselectedFilters;
    };

    useEffect(() => {
        updateGivenFilters(filters);

        setPreviousFilters(filters);
    }, [!_.isEqual(filters, previousFilters)]);

    useEffect(() => {
        if (onLazy) {
            onLazy(searchTermState);
        }
    }, [searchTermState]);

    const updateGivenFilters = (givenFilters) => {
        const customFilters = getCustomFilters(
            givenFilters,
            filterBySearchTerm(filtersState, searchTermState),
            !!onLazy,
            draftSelected
        );
        const unselectedFilters = getUnselectedFilters(customFilters);
        const filterStateContent = _.size(selectedFilters) ? _.concat(
            [{
                listName: "Selected",
                filtersList: selectedFilters
            }],
            unselectedFilters
        ) : unselectedFilters;
        setFiltersState(filterStateContent);
        setFiltersToShow(filterStateContent);
    };

    const handleToggle = (item, listName) => {
        setDraftSelected((prev) =>
            item.isSelected
                ? _.filter(prev, (draftFilter) => !_.isEqual(draftFilter, item))
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

    const handleSave = () => {
        setSearchTermState("");
        searchEl.current.clearInput();

        if (!_.isEmpty(draftSelected)) {
            const unselectedFilters = getUnselectedFilters(filtersState);
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
        setSelectedFilters(draftSelected);

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
