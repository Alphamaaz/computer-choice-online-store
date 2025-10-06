import React, { useState, useEffect } from 'react';
import './HeroSection.css';

const slides = [
  {
    image: '/hero-bg.jpg',
    text: 'Used Dell i5 Starting at ₨35,000',
  },
  {
    image: '/hero-bg.jpg',
    text: 'Free Charger Included',
  },
  {
    image: '/hero-bg.jpg',
    text: 'Original SSD Upgrade Available',
  },
  {
    image: '/hero-bg.jpg',
    text: 'Original SSD Upgrade Available',
  },
  {
    image: '/hero-bg.jpg',
    text: 'Original SSD Upgrade Available',
  },
];

const HeroSection = () => {
  const [current, setCurrent] = useState(0);
  const length = slides.length;

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev === length - 1 ? 0 : prev + 1));
    }, 4000);
    return () => clearInterval(interval);
  }, [length]);

  const nextSlide = () => setCurrent(current === length - 1 ? 0 : current + 1);
  const prevSlide = () => setCurrent(current === 0 ? length - 1 : current - 1);

  return (
    <section
      className="hero-section"
      style={{
        backgroundImage: `url(${process.env.PUBLIC_URL + '/'})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        position: 'relative',
      }}
    >
      {slides.map((slide, index) => (
        <div
          className={`slide ${index === current ? 'active' : ''}`}
          key={index}
          style={{ backgroundImage: `url(${slide.image})` }}
        >
          {index === current && (
            <div className="slide-text">
              <h2>{slide.text}</h2>
            </div>
          )}
        </div>
      ))}

      <button className="prev" onClick={prevSlide} aria-label="Previous Slide">
        &#10094;
      </button>
      <button className="next" onClick={nextSlide} aria-label="Next Slide">
        &#10095;
      </button>
    </section>
  );
};

export default HeroSection;
