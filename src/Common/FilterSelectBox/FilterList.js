import React from "react";
import styled from "styled-components";
import { map, get } from "lodash";
import { CheckBox } from "../Checkbox";
import { DARK1, BRIGHT1 } from "../../Constants/colors";

export default function FilterList({ filters, toggleIsSelected }) {
  return (
    <FiltersContainer>
      {map(filters, (filter, index) => {
        if (filter.listName) {
          return (
            <FilterListContainer key={`filter-list-${index}`}>
              <FilterListName filterIndex={index}>
                {filter.listName}
              </FilterListName>
              {map(filter.filtersList, (item, itemIndex) => {
                return (
                  <FilterItem
                    key={`item-Index-${itemIndex}`}
                    onClick={() => toggleIsSelected(item, filter.listName)}
                  >
                    <CheckBox
                      className="check-box"
                      checked={item.isSelected}
                      onClick={() => toggleIsSelected(item, filter.listName)}
                    />
                    {get(item, "data.output")}
                  </FilterItem>
                );
              })}
            </FilterListContainer>
          );
        }
        return (
          <FilterItem key={index} onClick={() => toggleIsSelected(filter)}>
            <CheckBox
              className="check-box"
              checked={filter.isSelected}
              onClick={() => toggleIsSelected(filter)}
            />
            {get(filter, "data.output")}
          </FilterItem>
        );
      })}
    </FiltersContainer>
  );
}

const FiltersContainer = styled.div`
  height: 326px;
  overflow: auto;
`;

const FilterItem = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  height: 44px;
  .check-box {
    margin-left: 24px;
    margin-right: 12px;
  }
  &:hover {
    cursor: pointer;
    background-color: ${BRIGHT1};
  }
`;

const FilterListContainer = styled.div`
  /* border-bottom: 1px solid rgba(52, 57, 73, 0.1); */
`;

const FilterListName = styled.div`
  width: 90%;
  padding-top: 14px;
  padding-bottom: 14px;
  padding-left: 24px;
  font-size: 12px;
  font-weight: bold;
  color: ${DARK1};
  border-top: ${({ filterIndex }) =>
    filterIndex === 0 ? "none" : "1px solid rgba(52, 57, 73, 0.1)"};
`;
