import React from "react";
import Select from "react-select";
import styled from "styled-components";

const SelectComponent = ({
  className,
  options,
  placeholder,
  onChange,
  isMulti,
  ...selectOptions
}) => {
  return (
    <Select
      {...selectOptions}
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
            padding: "0",
            border: 0,
            borderRadius: "4px",
            borderBottomLeftRadius: isFocused ? 0 : 4,
            borderBottomRightRadius: isFocused ? 0 : 4
          };
        },
        valueContainer: styles => {
          return {
            ...styles,
            padding: "2px 3px"
          };
        },
        control: (styles, { isFocused }) => {
          return {
            ...styles,
            backgroundColor: "#ffffff",
            border: "1px solid #CCCCCC",
            borderBottomLeftRadius: isFocused ? 0 : 4,
            borderBottomRightRadius: isFocused ? 0 : 4,
            boxShadow: 0,
            "&:hover": {
              border: "1px solid #CCCCCC"
            }
          };
        },
        menu: (styles, { isFocused }) => {
          return {
            ...styles,
            marginTop: 0,
            borderTopLeftRadius: 4,
            borderTopRightRadius: 4,
            // border: "1px solid #CCCCCC",
            boxShadow: "0 1px 5px 0 rgba(0,0,0,0.10)"
          };
        },
        menuList: (styles, { isFocused }) => {
          return {
            ...styles,
            paddingTop: 0
            // marginRight: 25,
            // marginLeft: 5
          };
        },
        option: (styles, { isFocused }) => {
          return {
            ...styles,
            backgroundColor: isFocused ? "#F7F8FB" : "#ffffff",
            borderColor: "transparent",
            fontFamily: "Open Sans",
            color: "#212529",
            fontSize: 16,
            paddingLeft: 9,
            paddingRight: 25,
            letterSpacing: 0
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
            paddingLeft: 3,
            paddingRight: 3
          };
        },
        placeholder: (styles, { isFocused }) => {
          return {
            ...styles,
            fontFamily: "Open Sans",
            fontSize: 16,
            padding: "0 3px",
            color: "#B5B7BD",
            lineHeight: 24,
            letterSpacing: 0
          };
        }
      }}
    />
  );
};

const SelectBox = styled(SelectComponent)`
  min-width: 236px;
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
