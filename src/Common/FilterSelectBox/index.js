import React, { useState } from "react";
import styled from "styled-components";
import { map, isEqual } from "lodash";
import { BRIGHT5 } from "../../Constants/colors";
import FilterList from "./FilterList";
import Button from "../Button";

export default function FilterSelectBox({ filters }) {
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

  return (
    <SelectBox onClick={() => console.log(filtersState)}>
      <FilterList filters={filtersState} toggleIsSelected={toggleIsSelected} />
      <ActionButtons>
        <span>Clear Selection</span>
        <Button size="medium">Save</Button>
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
  padding: 16px;
  bottom: 0;
  button {
    margin: 0;
  }
`;
