import React from 'react';
import styled from 'styled-components';
import logo from '../images/logo.png';
import { Link } from 'react-router-dom';
import '@fortawesome/fontawesome-free/css/all.min.css';

const Footer = () => {
  return (
    <FooterCSS>
      <div className='footer-container'>
        <div className='upper-container'>
          <div className='logo'>
            <img src={logo} alt="logo" />
          </div>
          <div className='social-media-section'>
            <div className='social-media-header'>FIND US ONLINE</div>
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
              <a href="https://www.youtube.com" target="_blank" rel="noopener noreferrer" className="icon youtube">
              <i className="fab fa-youtube"></i>
              </a>
            </div>
          </div>
        </div>
      </div>      
      <div className='bottom-container'>
        <div className='left-section'>
          <p className="footer">&copy; 2025 Biomorph LTD. All rights reserved.</p>
        </div>
        <div className='right-section'>
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
    </FooterCSS>
  );
};

export default Footer;

const FooterCSS = styled.div`


    width: 100%;
    height: 15rem;
    margin-top: 2rem;
    padding: 1rem 2rem;
    background-color: #73A19E;
    color: #FAF9F6;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

.footer-container {
    width: 100%;
    display: flex;
    flex-direction: column;
}

.upper-container {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 2rem;
}

.logo {
  width: 30%;
}

.logo img {
    height: 5rem;
    width: auto;
    border-radius: 3%;
}

.social-media-section {
  width: 70%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
}

.icon-links {
  display: flex;
  width: 20%;
  gap: 2rem;
}

.bottom-container {
  display: flex;
  gap: 2rem;
}

.right-section {
  display: flex;
}

ul {
  display: flex;
  gap: 1rem;

}




`;
