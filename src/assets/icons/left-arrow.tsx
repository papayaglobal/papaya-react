import React from "react";
import styled from "styled-components";

const StyledLeftArrow = styled.svg`
  cursor: pointer;
  margin: ${({margin}: { margin: string }) => margin};
  .oval {
    fill: #F7F8FB;
  }
  &:hover {
    .oval {
      fill: #F2F3F5;
    }
  }
`;
export const LeftArrow = (props: any) => <StyledLeftArrow {...props} width="24px" height="24px" viewBox="0 0 24 24">
    <g stroke="none" stroke-width="1" fill-rule="evenodd">
        <g id="Calendar---States" transform="translate(-494.000000, -290.000000)">
            <g id="Calendar" transform="translate(218.000000, 289.000000)">
                <g id="Month-Nav">
                    <g id="Group-5" transform="translate(276.000000, 1.000000)">
                        <circle class="oval" cx="12" cy="12" r="12"/>
                        <g transform="translate(11.400000, 12.000000) rotate(90.000000) translate(-11.400000, -12.000000) translate(6.000000, 8.400000)"
                           fill="#C2C3C8">
                            <polygon id="Shape"
                                     transform="translate(5.500000, 3.237500) scale(-1, 1) rotate(-360.000000) translate(-5.500000, -3.237500) "
                                     points="9.71666667 -4.4408921e-16 5.5 4.025 1.28333333 -4.4408921e-16 0 1.225 5.5 6.475 11 1.225"/>
                        </g>
                    </g>
                </g>
            </g>
        </g>
    </g>
</StyledLeftArrow>;