import React, { useState } from "react";
import styled from "styled-components";
import FilterButton from "../FilterButton";

export default function FilterButtonExample() {
    const [activeState, setActiveState] = useState(false);
    const OnFilterButtonClick = () => {
        setActiveState((prev) => !prev);
        alert("Clicked");
    };

    return (
        <>
            {activeState && <ActiveLabel onClick={() => setActiveState((prev) => !prev)} />}
            <FilterButton text="Projects" onClick={OnFilterButtonClick} selected={false} active={activeState} />
        </>
    );
}

const ActiveLabel = styled.div`
    position: fixed;
    height: 100vh;
    width: 100vw;
    opacity: 0;
    z-index: -1;
`;
