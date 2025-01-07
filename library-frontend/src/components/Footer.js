// Footer.js
import React from 'react';
import './Footer.css'; // We'll define styles here

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        {/* Company Info */}
        <div className="footer-section">
          <h4>About Us</h4>
          <p>Your company description goes here. Briefly introduce your company to visitors.</p>
        </div>
        {/* Navigation Links */}
        <div className="footer-section">
          <h4>Quick Links</h4>
          <ul>
            <li><a href="/">Our Services</a></li>
            <li><a href="/">Portfolio</a></li>
            <li><a href="/">Testimonials</a></li>
            <li><a href="/">Contact Us</a></li>
          </ul>
        </div>
        {/* Contact Info */}
        <div className="footer-section">
          <h4>Contact</h4>
          <p>123 Main Street<br />City, Delhi</p>
        </div>
        {/* Social Media Links */}
        <div className="footer-section">
          <h4>Follow Us</h4>
          <div className="social-links">
            <a href="https://facebook.com"><i className="fab fa-facebook-f"></i></a>
            <a href="https://twitter.com"><i className="fab fa-twitter"></i></a>
            <a href="https://instagram.com"><i className="fab fa-instagram"></i></a>
            {/* Add more social icons as needed */}
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} All rights reserved.</p>
        <p className="created-by">
          Created by <a href="https://github.com/meakc">Abhishek Kumar Choudhary</a>
        </p>
      </div>
    </footer>
  );
};

export default Footer;