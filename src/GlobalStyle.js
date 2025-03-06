import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;700&family=Source+Sans+Pro:wght@400;700&display=swap');
  
  html, body, #root {
    margin: 0;
    padding: 0;
    min-height: 100%;
    background-color: #FFFFFF;
    box-sizing: border-box;
    font-family: 'Source Sans Pro', sans-serif; /* Default font */
  }

  h1, h2, h3, h4, h5, h6 {
    font-family: 'Poppins', sans-serif; /* Font for headings */
  }
`;

export default GlobalStyle;
