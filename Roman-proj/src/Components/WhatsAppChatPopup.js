import React, { useState } from 'react';
import './WhatsAppChatPopup.css'; // Separate CSS file
import { FaWhatsapp, FaTimes } from 'react-icons/fa';

const 
WhatsAppChatPopup = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeNumber, setActiveNumber] = useState(null);

  // WhatsApp numbers data
  const whatsappNumbers = [
    {
      name: 'Sales Support',
      number: '+1234567890',
      message: 'Hello, I have a question about your products'
    },
    {
      name: 'Technical Support',
      number: '+0987654321',
      message: 'Hello, I need technical assistance'
    }
  ];

  const togglePopup = () => {
    setIsOpen(!isOpen);
    if (!isOpen) {
      setActiveNumber(null);
    }
  };

  const handleNumberClick = (number) => {
    setActiveNumber(number);
  };

  const generateWhatsAppLink = (number) => {
    return `https://wa.me/${number.number}?text=${encodeURIComponent(number.message)}`;
  };

  return (
    <div className="whatsapp-container">
      {/* Floating WhatsApp button */}
      <button 
        className="whatsapp-float" 
        onClick={togglePopup}
        aria-label="WhatsApp Support"
      >
        <FaWhatsapp className="whatsapp-icon" />
      </button>

      {/* Popup container */}
      {isOpen && (
        <div className="whatsapp-popup">
          <div className="popup-header">
            <h3>Chat with Us</h3>
            <button 
              className="close-btn" 
              onClick={togglePopup}
              aria-label="Close WhatsApp popup"
            >
              <FaTimes />
            </button>
          </div>

          <div className="popup-content">
            {activeNumber ? (
              <div className="number-selected">
                <p>Chat with {activeNumber.name}</p>
                <a 
                  href={generateWhatsAppLink(activeNumber)} 
                  className="whatsapp-link"
                  target="_blank" 
                  rel="noopener noreferrer"
                >
                  Open Chat
                </a>
                <button 
                  className="back-btn"
                  onClick={() => setActiveNumber(null)}
                >
                  Back to Numbers
                </button>
              </div>
            ) : (
              <div className="numbers-list">
                <p>Select a support option:</p>
                <ul>
                  {whatsappNumbers.map((number, index) => (
                    <li key={index}>
                      <button 
                        className="number-btn"
                        onClick={() => handleNumberClick(number)}
                      >
                        {number.name}
                        <span>{number.number}</span>
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default WhatsAppChatPopup;