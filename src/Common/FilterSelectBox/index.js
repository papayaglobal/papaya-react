import React, { useState, useEffect } from "react";
import styled from "styled-components";
import {
  map,
  isEqual,
  compact,
  flatten,
  includes,
  filter,
  isEmpty
} from "lodash";
import { BRIGHT5, DARK2, ACCENT1DARK } from "../../Constants/colors";
import FilterList from "./FilterList";
import SearchInput from "./SearchInput";
import Button from "../Button";

export default function FilterSelectBox({ filters, onSave }) {
  const customFilters = map(filters, filter => {
    if (!filter.listName) {
      return {
        data: filter,
        isSelected: false
      };
    } else {
      return {
        ...filter,
        filtersList: map(filter.filtersList, item => {
          return {
            data: item,
            isSelected: false
          };
        })
      };
    }
  });

  const [filtersState, setFiltersState] = useState(customFilters);
  const [filtersToShow, setFiltersToShow] = useState(customFilters);

  useEffect(() => {
    setFiltersToShow(filtersState);
  }, [filtersState]);

  const toggleIsSelected = (item, listName) => {
    const updatedFilters = map(filtersState, filterItem => {
      if (listName) {
        if (listName === filterItem.listName) {
          return {
            ...filterItem,
            filtersList: map(filterItem.filtersList, filterListItem => {
              return isEqual(filterListItem.data, item.data)
                ? { ...filterListItem, isSelected: !filterListItem.isSelected }
                : filterListItem;
            })
          };
        } else {
          return isEqual(filterItem.data, item.data)
            ? { ...filterItem, isSelected: !filterItem.isSelected }
            : filterItem;
        }
      } else {
        return isEqual(filterItem.data, item.data)
          ? { ...filterItem, isSelected: !filterItem.isSelected }
          : filterItem;
      }
    });
    setFiltersState(updatedFilters);
  };

  const handleSave = () => {
    if (!onSave) {
      return;
    }

    const selectedFilters = compact(
      map(filtersState, filterItem => {
        if (filterItem.listName) {
          return compact(
            map(
              filterItem.filtersList,
              item => item.isSelected === true && item.data
            )
          );
        }
        if (filterItem.isSelected === true) {
          return filterItem.data;
        }
      })
    );

    onSave(flatten(selectedFilters));
  };

  const clearSelections = () => {
    setFiltersState(customFilters);
  };

  const handleSearch = value => {
    if (!value) {
      return setFiltersToShow(filtersState);
    }
    const SearchedFilters = compact(
      map(filtersState, filterItem => {
        if (filterItem.listName) {
          const filterdItemList = filter(filterItem.filtersList, item =>
            includes(item.data.output.toLowerCase(), value)
          );
          return isEmpty(filterdItemList)
            ? null
            : {
                ...filterItem,
                filtersList: filterdItemList
              };
        } else {
          return (
            includes(filterItem.data.output.toLowerCase(), value) && filterItem
          );
        }
      })
    );
    console.log(flatten(SearchedFilters));
    setFiltersToShow(flatten(SearchedFilters));
  };

  return (
    <SelectBox>
      <SearchInput onChange={handleSearch} />
      <FilterList filters={filtersToShow} toggleIsSelected={toggleIsSelected} />
      <ActionButtons>
        <span onClick={clearSelections}>Clear Selection</span>
        <Button size="medium" onClick={handleSave}>
          Save
        </Button>
      </ActionButtons>
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
  height: 430px;
  width: 350px;
`;

const ActionButtons = styled.div`
  /* position: absolute; */
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding: 15px;
  /* bottom: 0; */
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
