import variables from "./variables";
import { createGlobalStyle } from "styled-components";

export default createGlobalStyle`
    ${variables};

    * {
        margin: 0;
        padding: 0;
        @supports (scrollbar-width: thin) {
        scrollbar-width: thin;
        scrollbar-color: var(--essential-bright-accent) transparent;
      }
      &::-webkit-scrollbar {
        border-radius: 10px;
        width: 5px;
        height: 5px;
      }
      &::-webkit-scrollbar-button {
        height: 0;
        width: 0;
        background-color: transparent;
      }
      &::-webkit-scrollbar-thumb {
        background-color: var(--essential-bright-accent);
        border-radius: 10px;
      }
    }
    html {
        height: 100%;
    }

    body {
        height: 100%;
        background: linear-gradient(
          180deg, 
          rgba(218,44,44,1) 0%, 
          rgba(12,12,12,1) 21%
        );
        color: var(--text-base);
        overflow-x: hidden;
    }

    #root {
        margin: 0 auto;
        height: 100%;
      }

    button {
        color: var(--text-base);
        font-size: 1em;
        cursor: pointer;
        background-color: transparent;
        border: none;
    }
`;
