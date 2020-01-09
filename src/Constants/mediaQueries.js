import {css} from "styled-components";

export const sizes = {
    sm: 375,
    md: 768,
    lg: 1024,
    xl: 1440
};

const media = Object.keys(sizes).reduce((acc, label) => {
    acc[label] = (...args) => css`
    @media (max-width: ${sizes[label] / 16}em) {
      ${css(...args)}
    }
  `;
    return acc;
}, {});

export default media;
