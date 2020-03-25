import React from "react";
import styled from "styled-components";
import { BRIGHT4, DARK1, ACCENT1 } from "../../Constants/colors";

export default function FilterButton({ text, active, selected, onClick }) {
    const handleClick = () => {
        onClick();
    };

    return (
        <StyledFilterButton active={active} selected={selected} onClick={handleClick}>
            {text}
        </StyledFilterButton>
    );
}

const StyledFilterButton = styled.div`
    border: ${({ active, selected }) =>
        active ? `1px solid ${ACCENT1}` : selected ? `1px solid ${DARK1}` : `1px solid ${BRIGHT4}`};
    border-radius: 4px;
    background: none;
    padding: 8px 16px;
    color: ${({ active }) => (active ? `${ACCENT1}` : `${DARK1}`)};
    font-weight: ${({ selected }) => (selected ? "600" : "regular")};
    user-select: none;
    &:hover {
        cursor: pointer;
        border: 1px solid ${ACCENT1};
        color: ${ACCENT1};
    }
`;
