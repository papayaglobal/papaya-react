import React from "react";
import Select from "react-select";
import styled from "styled-components";

const SelectComponent = ({ className, options, placeholder, onChange, isMulti }) => {
  return (
    <Select
      className={`${className} custom-select`}
      options={options}
      placeholder={placeholder}
      onChange={onChange}
      isMulti={isMulti}
      styles={{
        indicatorSeparator: (styles, { isFocused }) => {
          return {
            ...styles,
            display: "none"
          };
        },
        container: (styles, { isFocused }) => {
          return {
            ...styles,
            backgroundColor: "#ffffff",
            boxShadow: "0 1px 5px 0 rgba(0,0,0,0.10)",
            borderColor: "transparent",
            borderBottomLeftRadius: isFocused ? 0 : 4,
            borderBottomRightRadius: isFocused ? 0 : 4
          };
        },
        control: (styles, { isFocused }) => {
          return {
            ...styles,
            backgroundColor: "#ffffff",
            border: isFocused ? 0 : 0,
            borderBottomLeftRadius: isFocused ? 0 : 4,
            borderBottomRightRadius: isFocused ? 0 : 4,
            boxShadow: isFocused ? 0 : 0,
            "&:hover": {
              border: isFocused ? 0 : 0
            }
          };
        },
        option: (styles, { isFocused }) => {
          return {
            ...styles,
            backgroundColor: isFocused ? "#F7F8FB" : "#ffffff",
            borderColor: "transparent",
            color: "#000000",
            paddingLeft: 25,
            paddingRight: 25
          };
        },
        input: (styles, { isFocused }) => {
          return {
            ...styles,
            paddingLeft: 5,
            paddingRight: 5
          };
        },
        singleValue: (styles, { isFocused }) => {
          return {
            ...styles,
            paddingLeft: 15,
            paddingRight: 15
          };
        },
        placeholder: (styles, { isFocused }) => {
          return {
            ...styles,
            fontSize: 14,
            padding: "0 15px"
          };
        },
        menu: (styles, { isFocused }) => {
          return {
            ...styles,
            marginTop: 0,
            borderTopLeftRadius: 0,
            borderTopRightRadius: 0,
            boxShadow: "0 4px 5px 0 rgba(0,0,0,0.10)"
          };
        },
        menuList: (styles, { isFocused }) => {
          return {
            ...styles,
            paddingTop: 0,
            paddinRight: 25
          };
        }
      }}
    />
  );
};

const SelectBox = styled(SelectComponent)`
  min-width: 250px;
  box-shadow: 0 0 0 0 transparent;
  border-radius: 4px;

  :focus,
  :active,
  :hover {
    outline: none;
    border-color: transparent;
  }
`;

export default SelectBox;
