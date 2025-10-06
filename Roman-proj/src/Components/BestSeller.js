import React from 'react';
import Slider from 'react-slick';
import './BestSeller.css';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

// Custom arrow components with better styling
const NextArrow = ({ onClick }) => (
  <button className="slick-arrow next-arrow" onClick={onClick}>
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
      <path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z" />
    </svg>
  </button>
);

const PrevArrow = ({ onClick }) => (
  <button className="slick-arrow prev-arrow" onClick={onClick}>
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
      <path d="M15.41 16.59L10.83 12l4.58-4.59L14 6l-6 6 6 6 1.41-1.41z" />
    </svg>
  </button>
);

const laptops = [
  {
    id: 1,
    image: 'https://images.unsplash.com/photo-1593642632823-8f785ba67e45?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bGFwdG9wfGVufDB8fDB8fHww',
    title: 'Dell Inspiron 15',
    model: '3501',
    specs: 'Intel i5, 8GB RAM, 256GB SSD',
    price: 'Rs. 120,000',
    description: 'A reliable everyday laptop with strong performance and a sleek design.',
    discount: '15% OFF'
  },
  {
    id: 2,
    image: 'https://images.unsplash.com/photo-1531297484001-80022131f5a1?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8bGFwdG9wfGVufDB8fDB8fHww',
    title: 'HP Pavilion x360',
    model: '14-dw1024',
    specs: 'Intel i7, 16GB RAM, 512GB SSD',
    price: 'Rs. 165,000',
    description: 'Versatile 2-in-1 laptop ideal for multitasking and creative work.',
    discount: '10% OFF'
  },
  {
    id: 3,
    image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8bGFwdG9wfGVufDB8fDB8fHww',
    title: 'Lenovo IdeaPad 3',
    model: '15ADA6',
    specs: 'AMD Ryzen 5, 8GB RAM, 512GB SSD',
    price: 'Rs. 115,000',
    description: 'Perfect for students and professionals with powerful AMD performance.',
    discount: '20% OFF'
  },
  {
    id: 4,
    image: 'https://images.unsplash.com/photo-1546054454-aa26e2b734c7?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8bGFwdG9wfGVufDB8fDB8fHww',
    title: 'Asus VivoBook 14',
    model: 'X415EA',
    specs: 'Intel i3, 8GB RAM, 256GB SSD',
    price: 'Rs. 98,000',
    description: 'Lightweight and stylish, great for daily use and portability.',
    discount: '5% OFF'
  },
  {
    id: 5,
    image: 'https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGxhcHRvcHxlbnwwfHwwfHx8MA%3D%3D',
    title: 'Acer Aspire 5',
    model: 'A515-45',
    specs: 'Ryzen 7, 16GB RAM, 1TB SSD',
    price: 'Rs. 145,000',
    description: 'High-performance machine for demanding applications and storage.',
    discount: '12% OFF'
  },
  {
    id: 6,
    image: 'https://images.unsplash.com/photo-1551033406-611cf9a28f67?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fGxhcHRvcHxlbnwwfHwwfHx8MA%3D%3D',
    title: 'MacBook Pro 14"',
    model: 'M2 Pro',
    specs: 'Apple M2 Pro, 16GB RAM, 512GB SSD',
    price: 'Rs. 245,000',
    description: 'Professional-grade performance with stunning Retina display.',
    discount: '8% OFF'
  },
];

const BestSeller = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 600,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    responsive: [
      { 
        breakpoint: 1200, 
        settings: { 
          slidesToShow: 2,
          slidesToScroll: 1
        } 
      },
      { 
        breakpoint: 768, 
        settings: { 
          slidesToShow: 1,
          slidesToScroll: 1,
          arrows: false
        } 
      },
    ],
  };

   return (
    <section className="best-seller-section">
      <div className="container">
        <h2 className="section-title">
          <span>Best Sellers</span>
        </h2>
        
        <Slider {...settings} className="best-seller-slider">
          {laptops.map((laptop) => (
            <div key={laptop.id} className="laptop-card">
              <div className="card-inner">
                <div className="image-container">
                  <img src={laptop.image} alt={laptop.title} className="laptop-image" />
                  {laptop.discount && (
                    <span className="discount-badge">{laptop.discount}</span>
                  )}
                </div>
                <div className="laptop-info">
                  <div className="product-header">
                    <h3 className="product-title">{laptop.title}</h3>
                    <div className="model-price-group">
                      <span className="product-model">{laptop.model}</span>
                      <span className="product-price">{laptop.price}</span>
                    </div>
                  </div>
                  <div className="specs-group">
                    <p className="product-specs">{laptop.specs}</p>
                  </div>
                  <div className="description-container">
                    <p className="product-description">{laptop.description}</p>
                  </div>
                  <div className="button-group">
                    <button className="best-seller-add-to-cart">
                      <span>Add to Cart</span>
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M7 18c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2-.9-2-2-2zM1 2v2h2l3.6 7.59-1.35 2.45c-.16.28-.25.61-.25.96 0 1.1.9 2 2 2h12v-2H7.42c-.14 0-.25-.11-.25-.25l.03-.12.9-1.63h7.45c.75 0 1.41-.41 1.75-1.03l3.58-6.49c.08-.14.12-.31.12-.48 0-.55-.45-1-1-1H5.21l-.94-2H1zm16 16c-1.1 0-1.99.9-1.99 2s.89 2 1.99 2 2-.9 2-2-.9-2-2-2z"/>
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </section>
  );
};
export default BestSeller;