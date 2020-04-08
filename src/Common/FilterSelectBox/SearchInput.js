import React, { inputEl, useImperativeHandle, forwardRef, useRef } from "react";
import styled from "styled-components";
import { toLower, debounce } from "lodash";
import { ReactComponent as SearchIcon } from "../../assets/icons/Search.svg";
import { ACCENT1, LIGHTBLUE } from "../../Constants/colors";

function SearchInput({ onChange, searchTerm, delay = 1000 }, ref) {
    const inputEl = useRef(null);
    const onInputChange = debounce((value) => {
        onChange(value);
    }, delay);

    useImperativeHandle(ref, () => ({
        clearInput: () => {
            inputEl.current.value = "";
        },
        setInputValue: () => {
            inputEl.current.value = searchTerm;
        }
    }));

    return (
        <SearchInputContainer>
            <StyledSearchInput>
                <SearchIcon />
                <input ref={inputEl} type="text" onChange={(event) => onInputChange(event.target.value)} />
            </StyledSearchInput>
        </SearchInputContainer>
    );
}

export default forwardRef(SearchInput);

const StyledSearchInput = styled.div`
    display: flex;
    align-items: center;
    border: 1px solid ${LIGHTBLUE};
    border-radius: 4px;
    height: 30px;
    width: 92%;
    svg {
        margin-left: 16px;
        color: ${ACCENT1};
    }
    input {
        border: none;
        width: 100%;
        margin-left: 7px;
        &:focus {
            outline: none;
        }
    }
`;

const SearchInputContainer = styled.div`
    display: flex;
    justify-content: center;
    width: 100%;
`;
