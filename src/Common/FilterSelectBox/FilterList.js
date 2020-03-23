import React, { useCallback, useRef, useEffect } from "react";
import styled from "styled-components";
import { map, get } from "lodash";
import { CheckBox } from "../Checkbox";
import { DARK1, DARK3, BRIGHT1, BRIGHTERBLACK } from "../../Constants/colors";
import Spinner from "../../Common/Spinner";
import { checkIfList } from "./index";

export default function FilterList({
  filters,
  toggleIsSelected,
  onLazy,
  loading,
  hasMore
}) {
  const observer = useRef();
  const lastFilterEl = useCallback(
    node => {
      if (loading) {
        return;
      }
      if (observer.current) {
        observer.current.disconnect();
      }
      observer.current = new IntersectionObserver(entries => {
        if (entries[0].isIntersecting && onLazy && hasMore) {
          onLazy();
        }
      });
      if (node) {
        observer.current.observe(node);
      }
    },
    [loading, hasMore]
  );

  return (
    <FiltersContainer>
      {map(filters, (filter, index) => {
        if (checkIfList(filter)) {
          return (
            <div key={`filter-list-${index}`}>
              <FilterListName filterIndex={index}>
                {filter.listName}
              </FilterListName>
              {map(filter.filtersList, (item, itemIndex) => {
                if (
                  filter.filtersList.length === itemIndex + 1 &&
                  filters.length === index + 1
                ) {
                  return (
                    <span key={`item-Index-${itemIndex}`}>
                      <FilterItem
                        ref={lastFilterEl}
                        onClick={() => toggleIsSelected(item, filter.listName)}
                      >
                        <CheckBox
                          className="check-box"
                          checked={item.isSelected}
                          onClick={() =>
                            toggleIsSelected(item, filter.listName)
                          }
                        />
                        {get(item, "data.output")}
                      </FilterItem>
                      {loading && (
                        <SpinerContainer>
                          <Spinner width="34px" height="34px" color={DARK3} />
                        </SpinerContainer>
                      )}
                    </span>
                  );
                } else {
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
                }
              })}
            </div>
          );
        }
        if (filters.length === index + 1) {
          return (
            <span key={`filter-item-${index}`}>
              <FilterItem
                ref={lastFilterEl}
                onClick={() => toggleIsSelected(filter)}
              >
                <CheckBox
                  className="check-box"
                  checked={filter.isSelected}
                  onClick={() => toggleIsSelected(filter)}
                />
                {get(filter, "data.output")}
              </FilterItem>
              {loading && (
                <SpinerContainer>
                  <Spinner width="34px" height="34px" color={DARK3} />
                </SpinerContainer>
              )}
            </span>
          );
        } else {
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
        }
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

const FilterListName = styled.div`
  width: 90%;
  padding-top: 14px;
  padding-bottom: 14px;
  padding-left: 24px;
  font-size: 12px;
  font-weight: bold;
  color: ${DARK1};
  border-top: ${({ filterIndex }) =>
    filterIndex === 0 ? "none" : `1px solid ${BRIGHTERBLACK}`};
`;

const SpinerContainer = styled.div`
  display: flex;
  justify-content: center;
  padding: 5px;
`;