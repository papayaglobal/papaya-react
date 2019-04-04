import React from "react";
import styled from "styled-components";

const StyledLoadingIcon = styled.svg`
  -webkit-animation: rotate 2s linear infinite;
  animation: rotate 2s linear infinite;
  height: ${props => props.height || '32px'};
  -webkit-transform-origin: center center;
  -ms-transform-origin: center center;
  transform-origin: center center;
  width: ${props => props.width || '32px'};
  margin: auto;

  & .loader-path {
    stroke-dasharray: 150, 200;
    stroke-dashoffset: -10;
    -webkit-animation: dash 1.5s ease-in-out infinite,
      color 6s ease-in-out infinite;
    animation: dash 1.5s ease-in-out infinite, color 6s ease-in-out infinite;
    stroke-linecap: round;
  }

  @-webkit-keyframes rotate {
    100% {
      -webkit-transform: rotate(360deg);
      transform: rotate(360deg);
    }
  }

  @keyframes rotate {
    100% {
      -webkit-transform: rotate(360deg);
      transform: rotate(360deg);
    }
  }
  @-webkit-keyframes dash {
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
  }
  @keyframes dash {
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
  }
  @-webkit-keyframes color {
    0% {
      stroke: ${props => props.color || "#ffffff"};
    }
    40% {
      stroke: ${props => props.color || "#ffffff"};
    }
    66% {
      stroke: ${props => props.color || "#ffffff"};
    }
    80%,
    90% {
      stroke: ${props => props.color || "#ffffff"};
    }
  }
  @keyframes color {
    0% {
      stroke: ${props => props.color || "#ffffff"};
    }
    40% {
      stroke: ${props => props.color || "#ffffff"};
    }
    66% {
      stroke: ${props => props.color || "#ffffff"};
    }
    80%,
    90% {
      stroke: ${props => props.color || "#ffffff"};
    }
  }
`;

const LoadingIcon = (props) => (
  <StyledLoadingIcon viewBox="10 10 20 20" color={props.color}>
    <circle
      className="loader-path"
      cx="20"
      cy="20"
      r="5"
      fill="none"
      stroke={props.color}
      strokeWidth={props.width || 1}
    />
  </StyledLoadingIcon>
);

export default LoadingIcon;
