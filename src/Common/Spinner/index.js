import React from "react";
import styled, { keyframes } from "styled-components";

const colorKeyFrames = keyframes`
  0% {
    stroke: ${props => props.color || "#000000"};
  }
  40% {
    stroke: ${props => props.color || "#000000"};
  }
  66% {
    stroke: ${props => props.color || "#000000"};
  }
  80%,
  90% {
    stroke: ${props => props.color || "#000000"};
  }
`;
const rotateKeyFrames = keyframes`
  100% {
    will-change: transform;
    -webkit-transform: rotateZ(360deg);
    transform: rotateZ(360deg);
  }
`;
const dashKeyFrames = keyframes`
  0% {
    stroke-dasharray: 1, 200;
    stroke-dashoffset: 0;
  }
  50% {
    stroke-dasharray: 89, 200;
    stroke-dashoffset: -35;
  }
  100% {
    stroke-dasharray: 89, 200;
    stroke-dashoffset: -124;
  }
`;

const StyledSpinner = styled.svg`
  -webkit-animation: ${rotateKeyFrames} 2s linear infinite;
  animation: ${rotateKeyFrames} 2s linear infinite;
  height: ${props => props.height || "1em"};
  -webkit-transform-origin: center center;
  -ms-transform-origin: center center;
  transform-origin: center center;
  width: ${props => props.width || "1em"};
  margin: auto;

  & .loader-path {
    stroke-dasharray: 150, 200;
    stroke-dashoffset: -10;
    -webkit-animation: ${dashKeyFrames} 1.5s ease-in-out infinite,
      ${colorKeyFrames} 6s ease-in-out infinite;
    animation: ${dashKeyFrames} 1.5s ease-in-out infinite,
      ${colorKeyFrames} 6s ease-in-out infinite;
    stroke-linecap: round;
  }
`;

const Spinner = props => (
  <StyledSpinner
    viewBox="0 0 32 32"
    color={props.color || "#000000"}
    height={props.height}
    width={props.width}
  >
    <circle
      className="loader-path"
      cx="16"
      cy="16"
      r={props.strokeWidth ? 14 - props.strokeWidth / 2 : 12}
      fill="none"
      stroke={props.color || "#000000"}
      strokeWidth={props.strokeWidth || 4}
    />
  </StyledSpinner>
);

export default Spinner;
