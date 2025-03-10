import React from 'react';
import styled from 'styled-components';
import logo from '../images/logo.png';
import '@fortawesome/fontawesome-free/css/all.min.css';

const Footer = () => {
  return (
    <FooterCSS>
      <div className="icon-links">
        <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer" className="icon facebook">
          <i className="fab fa-facebook-f"></i>
        </a>
        <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer" className="icon twitter">
          <i className="fab fa-twitter"></i>
        </a>
        <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer" className="icon instagram">
          <i className="fab fa-instagram"></i>
        </a>
        <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer" className="icon linkedin">
          <i className="fab fa-linkedin-in"></i>
        </a>
      </div>
      <div>
        <p className="footer">&copy; 2025 Your Company. All rights reserved.</p>
      </div>
    </FooterCSS>
  );
};

export default Footer;

const FooterCSS = styled.div`
    width: 100%;
    height: 10rem;
    margin-top: 2rem;
    background-color: #73A19E;
    color: #FAF9F6;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;
