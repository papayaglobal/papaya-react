import React from "react";
import Select from "react-select";
import styled from "styled-components";

const SelectComponent = ({className, options, placeholder, onChange, isMulti, ...selectOptions}) => {
    return (
        <Select
            {...selectOptions}
            className={`${className} custom-select`}
            options={options}
            placeholder={placeholder}
            onChange={onChange}
            isMulti={isMulti}
            styles={{
                indicatorSeparator: (styles, {isFocused}) => {
                    return {
                        ...styles,
                        display: "none"
                    };
                },
                container: (styles, {isFocused}) => {
                    return {
                        ...styles,
                        backgroundColor: "#ffffff",
                        // boxShadow: "0 1px 5px 0 rgba(0,0,0,0.10)",
                        padding: "0",
                        border: 0,
                        borderRadius: "4px",
                        // height: "",
                        borderBottomLeftRadius: isFocused ? 0 : 4,
                        borderBottomRightRadius: isFocused ? 0 : 4
                    };
                },
                control: (styles, {isFocused}) => {
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
                menu: (styles, {isFocused}) => {
                    return {
                        ...styles,
                        marginTop: 0,
                        borderTopLeftRadius: 4,
                        borderTopRightRadius: 4,
                        // border: "1px solid #CCCCCC",
                        boxShadow: "0 1px 5px 0 rgba(0,0,0,0.10)"
                    };
                },
                menuList: (styles, {isFocused}) => {
                    return {
                        ...styles,
                        paddingTop: 0,
                        paddinRight: 25
                    };
                },
                option: (styles, {isFocused}) => {
                    return {
                        ...styles,
                        backgroundColor: isFocused ? "#F7F8FB" : "#ffffff",
                        borderColor: "transparent",
                        fontFamily: "OpenSans",
                        color: "#212529",
                        fontSize: 16,
                        paddingLeft: 25,
                        paddingRight: 25,
                        letterSpacing: 0
                    };
                },
                input: (styles, {isFocused}) => {
                    return {
                        ...styles,
                        paddingLeft: 5,
                        paddingRight: 5
                    };
                },
                singleValue: (styles, {isFocused}) => {
                    return {
                        ...styles,
                        paddingLeft: 15,
                        paddingRight: 15
                    };
                },
                placeholder: (styles, {isFocused}) => {
                    return {
                        ...styles,
                        fontFamily: "OpenSans",
                        fontSize: 16,
                        padding: "0 15px",
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
