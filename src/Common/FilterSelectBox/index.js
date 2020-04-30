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

const isEqualFilters = (filter, compareFilter) => _.isEqual(
    _.omit(filter, "isSelected"),
    _.omit(compareFilter, "isSelected")
)

const checkIfInDraft = (filterItem, draftFilters) => {
    return !_.isEmpty(
        _.filter(draftFilters, (draft) => isEqualFilters(draft, filterItem))
    );
};

const mapFilters = (filters, draftFilters) => {
    const mappedFilters = _.map(filters, (filter) => {
        if (!isList(filter)) {
            return {
                ...filter,
                isSelected: checkIfInDraft(filter, draftFilters)
            };
        } else {
            return {
                ...filter,
                filtersList: _.map(filter.filtersList, (item) => {
                    return {
                        ...item,
                        isSelected: checkIfInDraft(item, draftFilters)
                    };
                })
            };
        }
    });

    return mappedFilters;
};

const getSelectedFilters = (givenFilters) => {
    const selectedFilters = _.compact(
        _.flatMap(givenFilters, (filterItem) => {
            if (isList(filterItem)) {
                return _.compact(_.map(filterItem.filtersList, (item) => item.isSelected === true && item));
            }

            return filterItem.isSelected === true && filterItem;
        })
    );

    return selectedFilters;
};

const getCustomFilters = (newFilters, prevFilters, isLazyLoad) => {
    if (!isLazyLoad) {
        return newFilters;
    }

    let diff = [];

    _.each(newFilters, (filter) => {
        if (isList(filter)) {
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
        } else {
            diff = _.differenceWith(newFilters, prevFilters, _.isEqual);
        }
    })

    const customFilters = _.concat(prevFilters, diff);

    return customFilters;
};

function FilterSelectBox(
    { filters, onSave, onLazy, loading, hasMore, saveLabel, clearLabel, inputDelay, filterClassName },
    ref
) {
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

    const getUnselectedFilters = (givenFilters, selectedFilters = []) => {
        const unselectedFilters = _.compact(
            _.flatMap(givenFilters, (filterItem) => {
                const unselectedFilters = _.compact(
                    _.differenceWith(filterItem.filtersList, selectedFilters, isEqualFilters)
                );

                if (isList(filterItem)) {
                    if (_.isEmpty(unselectedFilters)) {

                        return false;
                    }

                    return {
                        ...filterItem,
                        filtersList: unselectedFilters
                    };
                }

                return !_.find(
                    selectedFilters,
                    (filter) => isEqualFilters(filter, filterItem)
                ) && filterItem;
            })
        );

        return unselectedFilters;
    };

    const getFiltersToShow = () => {
        let result = filtersState;
        if (!_.isEmpty(selectedFilters)) {
            const unselectedFilters = getUnselectedFilters(result, selectedFilters);
            result = [
                {
                    listName: "Selected",
                    filtersList: selectedFilters
                },
                ...unselectedFilters
            ];
        }
        return filterBySearchTerm(mapFilters(result, draftSelected), searchTermState);
    }

    useEffect(() => {
        updateGivenFilters(filters);

        setPreviousFilters(filters);
    }, [!_.isEqual(filters, previousFilters)]);

    useEffect(() => {
        if (onLazy) {
            onLazy(searchTermState);
        } else {
            setFiltersToShow(getFiltersToShow());
        }
    }, [searchTermState]);

    useEffect(() => {
        setFiltersToShow(getFiltersToShow());
    }, [filtersState, selectedFilters, draftSelected]);

    const updateGivenFilters = (givenFilters) => {
        const wasPreviously = filterBySearchTerm(filtersState, searchTermState);
        const customFilters = getCustomFilters(
            givenFilters,
            wasPreviously,
            !!onLazy
        );
        const selectedFilters = getSelectedFilters(givenFilters);
        setDraftSelected((prev) => _.concat(
            _.differenceWith(selectedFilters, prev, isEqualFilters),
            prev
        ));
        setSelectedFilters((prev) => _.concat(
            _.differenceWith(selectedFilters, prev, isEqualFilters),
            prev
        ));
        setFiltersState(customFilters);
    };

    const handleToggle = (item, listName) => {
        setDraftSelected((prev) =>
            item.isSelected
                ? _.filter(prev, (draftFilter) => !_.isEqual(draftFilter, item))
                : [...prev, { ...item, isSelected: true }]
        );
    };

    const handleSave = () => {
        setSearchTermState("");
        searchEl.current.clearInput();

        setSelectedFilters(draftSelected);

        if (!onSave) {
            return;
        }
        onSave(draftSelected);
    };

    const clearSelections = () => {
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
                        filterClassName={filterClassName}
                    />
                    <ActionButtons>
                        <span onClick={clearSelections}>{clearLabel}</span>
                        <Button className="save-btn" size="medium" onClick={handleSave}>
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
