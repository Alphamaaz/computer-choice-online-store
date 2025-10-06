import React from 'react';
import './Footer.css';
import { FaFacebook, FaWhatsapp, FaPhone, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-section">
          <h3 className="footer-heading">Quick Links</h3>
          <ul className="footer-links">
            <li><a href="/about">About Us</a></li>
            <li><a href="/return-policy">Return Policy</a></li>
            <li><a href="/delivery-info">Delivery Info</a></li>
            <li><a href="/whatsapp-support">WhatsApp Support</a></li>
          </ul>
        </div>

        <div className="footer-section">
          <h3 className="footer-heading">Contact Us</h3>
          <ul className="contact-info">
            <li>
              <FaPhone className="contact-icon" />
              <span>+92 300 1234567</span>
            </li>
            <li>
              <FaEnvelope className="contact-icon" />
              <span>info@example.com</span>
            </li>
            <li>
              <FaMapMarkerAlt className="contact-icon" />
              <span>Gull Haji plaza, peshawar, Pakistan</span>
            </li>
          </ul>
        </div>

        <div className="footer-section">
          <h3 className="footer-heading">Follow Us</h3>
          <div className="social-media">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
              <FaFacebook className="social-icon" />
            </a>
            <a href="https://wa.me/923001234567" target="_blank" rel="noopener noreferrer">
              <FaWhatsapp className="social-icon" />
            </a>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} Your Company Name. All Rights Reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;