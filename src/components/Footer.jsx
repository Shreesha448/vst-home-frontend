import React from "react";
import Logo from "../assets/VST-Logo.png";
import "../styles/Footer.css"; 

const Footer = () => (
  <footer className="footer-content">
    <img src={Logo} alt="Venturesoft logo" className="footer-logo" />
    <p>Connect with us:</p>
    <div className="footer-contacts">
      <a href="https://www.linkedin.com/company/venturesoft-global/" target="_blank" rel="noreferrer" aria-label="Venturesoft Global on LinkedIn" className="linkedin-link">
        <span className="linkedin-text-icon">LinkedIn</span>
      </a>
    
      <span className="contact-sep" aria-hidden></span>
      <a href="mailto:hello@venturesoft.ai" aria-label="Email Venturesoft">hello@venturesoft.ai</a>
    </div>
  </footer>
);

export default Footer;
