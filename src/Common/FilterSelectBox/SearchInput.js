import React from "react";
import styled from "styled-components";
import { toLower, debounce } from "lodash";
import { ReactComponent as SearchIcon } from "../../assets/icons/Search.svg";
import { ACCENT1, LIGHTBLUE } from "../../Constants/colors";

export default function SearchInput({ onChange, delay = 1500 }) {
    const onInputChange = debounce((value) => {
        onChange(toLower(value));
    }, delay);

    return (
        <SearchInputContainer>
            <StyledSearchInput>
                <SearchIcon />
                <input type="text" onChange={(event) => onInputChange(event.target.value)} />
            </StyledSearchInput>
        </SearchInputContainer>
    );
}

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
    margin-top: 14.5px;
`;
