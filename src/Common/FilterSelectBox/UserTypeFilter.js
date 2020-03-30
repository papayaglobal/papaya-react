import React from "react";
import styled from "styled-components";
import Label from "../Label";

export default function UserTypeFilter({ iconTitle, color, text }) {
    return (
        <FilterContainer>
            <Label title={iconTitle} color={color} squared />
            <div className="filter-text">{text}</div>
        </FilterContainer>
    );
}

const FilterContainer = styled.div`
    display: flex;
    align-items: center;
    .filter-text {
        margin-left: 20px;
    }
`;
