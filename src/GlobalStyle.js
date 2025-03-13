import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  /* Playfair Display fonts */
  @font-face {
    font-family: 'Playfair Display';
    font-style: normal;
    font-weight: 400;
    src: url('https://fonts.gstatic.com/s/playfairdisplay/v22/nuFvD-vYSZviVYUb_rj3ij__anPXJzDwcbmjWBN2PKdFvXDXbtM.woff2') format('woff2');
  }
  @font-face {
    font-family: 'Playfair Display';
    font-style: normal;
    font-weight: 700;
    src: url('https://fonts.gstatic.com/s/playfairdisplay/v22/nuFvD-vYSZviVYUb_rj3ij__anPXJzDwcbmjWBN2PKeiunDXbtM.woff2') format('woff2');
  }
  
  /* Montserrat fonts */
  @font-face {
    font-family: 'Montserrat';
    font-style: normal;
    font-weight: 400;
    src: url('https://fonts.gstatic.com/s/montserrat/v15/JTUSjIg1_i6t8kCHKm459Wlhyw.woff2') format('woff2');
  }
  @font-face {
    font-family: 'Montserrat';
    font-style: normal;
    font-weight: 700;
    src: url('https://fonts.gstatic.com/s/montserrat/v15/JTURjIg1_i6t8kCHKm45_dJE3gnD_g.woff2') format('woff2');
  }
  
  html, body, #root {
    margin: 0;
    padding: 0;
    min-height: 100%;
    background-color: #e3e6e9;
    box-sizing: border-box;
    font-family: 'Montserrat', sans-serif;
    overflow-x: hidden;

  }

  h1, h2, h3, h4, h5, h6 {
    font-family: 'Playfair Display', serif;
  }

  // for larger screen sizes
  @media (min-width: 768px) { 
  
    html, body, #root {
      overflow-x: auto; 
    }
    
  }

`;

export default GlobalStyle;