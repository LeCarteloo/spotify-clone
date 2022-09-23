import { css } from "styled-components";

const mixins = {
  buttonAdd: css`
    div {
      color: var(--text-press);
      background-color: var(--background-subdued);
      border-radius: var(--radius-small);
      padding: 0.21em;
      display: flex;
    }
  `,
  buttonLiked: css`
    div {
      color: var(--text-subdued);
      background: linear-gradient(135deg, #450af5, #c4efd9);
      border-radius: var(--radius-small);
      padding: 0.21em;
      display: flex;
    }
  `,
  opacityHover: css`
    opacity: 0.7;
    transition: opacity 0.2s ease-in;
    &:hover,
    &:focus-within {
      opacity: 1;
    }
  `,
  scaleHover: css`
    transform: scale(1);
    transition: transform 0.1s ease-in-out;
    &:hover,
    &:focus-within {
      transform: scale(1.1);
    }
    &:active {
      transform: scale(1);
    }
  `,
  buttonActive: css`
    color: var(--text-bright-accent);
    position: relative;
    &::after {
      content: "";
      position: absolute;
      display: block;
      border-radius: 50%;
      background-color: var(--text-bright-accent);
      width: 4px;
      height: 4px;
      left: 50%;
      transform: translateX(-50%);
    }
  `,
  buttonSecondary: css`
    border-radius: var(--radius-big);
    border: 1px solid var(--essential-subdued);
    padding: 0.4em 1em;
    font-size: 0.875em;
    font-weight: 600;
    transition: background-color 0.1s ease-in-out, transform 0.1s ease-in-out;

    &:hover {
      background-color: var(--essential-press);
      border: 1px solid var(--essential-base);
      transform: scale(1.05);
    }
  `,
  sectionPadding: css`
    width: calc(100% - 3.8em);
    padding: 0 1.9em;
    padding-top: calc(var(--topbar-height) + 1.2em);
    height: calc(100% - (var(--topbar-height) + 1.2em));
  `,
  innerSectionPadding: css`
    width: calc(100% - 3.8em);
    padding: 0 1.9em;
  `,
};

export default mixins;
