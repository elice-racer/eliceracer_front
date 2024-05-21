import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`
  * {
    box-sizing: border-box;
    margin:0;
    padding:0;
  }
  a{
    text-decoration:none;
  }
  body {
    background-color: #242424;
    color:#fff;
    font-size : 12px;
    font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif
  }
`;

export default GlobalStyles;
