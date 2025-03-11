import React from 'react';
import styled from 'styled-components';
import logo from '../images/logo.png';
import { Link } from 'react-router-dom';
import '@fortawesome/fontawesome-free/css/all.min.css';

const Footer = () => {
  return (
    <FooterCSS>
      <div className="footer">
        <div className="div1">
          <img src={logo} alt="logo" />
        </div>
        <div className="div2">FIND US ONLINE</div>
        <div className="div3">
          <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer" className="icon facebook">
            <i className="fab fa-facebook-f"></i>
          </a>
          <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer" className="icon twitter">
            <i className="fab fa-twitter"></i>
          </a>
          <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer" className="icon instagram">
            <i className="fab fa-instagram"></i>
          </a>
          <a href="https://www.youtube.com" target="_blank" rel="noopener noreferrer" className="icon youtube">
            <i className="fab fa-youtube"></i>
          </a>
        </div>
        <div className="div4">
          <ul>
            <li><Link to="/contact-us">Contact Us</Link></li>
            <li><Link to="/about-us">About Us</Link></li>
            <li><Link to="/faqs">FAQs</Link></li>
            <li><Link to="/privacy-policy">Privacy Policy</Link></li>
            <li><Link to="/cookie-policy">Cookie Policy</Link></li>
            <li><Link to="/terms">Terms</Link></li>
          </ul>
        </div>
      </div>
      <div className="div5">&copy; 2025 Biomorph LTD. All rights reserved.</div>
    </FooterCSS>
  );
};

const FooterCSS = styled.div`
  width: 100%;
  height: auto;
  margin-top: 2rem;
  padding: 1rem 2rem 0 2rem;
  background-color: #73A19E;
  color: #FAF9F6;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);    
  
  .footer {
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    grid-template-rows: repeat(4, auto);
    grid-column-gap: 0px;
    grid-row-gap: 0px;
    overflow: hidden;
  }
  
  .div1 {
    grid-area: 1 / 1 / 3 / 3;
  }
  
  .div1 img {
    height: 5rem;
    width: auto;
    border-radius: 3%;
  }
  
  .div2 {
    grid-area: 1 / 3 / 2 / 6;
    display: flex;
    justify-content: center;
  }
  
  .div3 {
    grid-area: 2 / 3 / 3 / 6;
    display: flex;
    justify-content: center;
    gap: 2rem;
  }
  
  .div3 i {
    width: 1.5rem;
    height: 1.5rem;
    color: #FF7F50;
  }
  
  .div4 {
    grid-area: 3 / 1 / 4 / 6;
  }
  
  .div4 ul {
    display: flex;
    width: 100%;
    justify-content: center;
    gap: 1rem;
    margin-bottom: 1rem;
  }
  
  .div5 {
    width: 100vw;
    display: flex;
    justify-content: center;
    padding: 1rem 0;
    margin-top: 1rem;
    position: relative;
    left: 0;
    right: 0;
  }

  a, .div4 a, .div3 a, a:link, a:visited {
    color: inherit; /* Maintain the same color as the parent */
    text-decoration: none; /* Remove underline */
    transition: color 0.3s ease, font-size 0.3s ease;
  }

  a:hover, .div4 a:hover, .div3 a:hover, a:link:hover, a:visited:hover {
    color: #FF7F50; /* Change color on hover */
    font-size: 1.2rem; /* Increase font size on hover */
  }
`;

export default Footer;