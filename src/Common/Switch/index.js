import React, { useState } from "react";
import styled from "styled-components";

import * as Colors from "../../Constants/colors";

const SwitchComponent = ({ className, checked, onChange }) => {
    const [checkedValue, setCheckedValue] = useState(checked || false);

    const onChanged = () => {
        setCheckedValue(prev => {
            const newValue = !prev;
            onChange && onChange(newValue);

            return newValue;
        });
    };

    return (
        <label className={className}>
            <input
                type='checkbox'
                checked={checkedValue}
                onChange={onChanged}
            />
            <span className='slider round' />
        </label>
    );
};

const Switch = styled(SwitchComponent)`
    position: relative;
    display: inline-block;
    width: 1.5rem;
    height: 0.5rem;

    & input {
        opacity: 0;
        width: 0;
        height: 0;
    }

    .slider {
        position: absolute;
        cursor: pointer;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-color: rgba(194, 195, 200, 0.7);
        -webkit-transition: 0.4s;
        transition: 0.4s;
    }

    .slider:before {
        position: absolute;
        content: "";
        height: 0.9rem;
        width: 0.9rem;
        left: -1px;
        bottom: -3px;
        background-color: ${Colors.DARK4};
        -webkit-transition: 0.4s;
        transition: 0.4s;
    }

    input:checked + .slider {
        background-color: rgba(46, 214, 188, 0.7);
    }
    input:checked + .slider:before {
        background-color: #2ed6bc;
    }

    input:focus + .slider {
        box-shadow: 0 0 1px #2ed6bc;
    }

    input:checked + .slider:before {
        -webkit-transform: translateX(0.8rem);
        -ms-transform: translateX(0.8rem);
        transform: translateX(0.8rem);
    }

    .slider.round {
        border-radius: 34px;
    }

    .slider.round:before {
        border-radius: 50%;
    }
`;

export default Switch;
