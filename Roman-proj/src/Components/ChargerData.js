import React, { useState } from "react";
import "./ChargerData.css";

const chargerProducts = [
  {
    id: 1,
    title: "HP Laptop Charger",
    brand: "HP",
    power: "65W",
    price: 1500,
    image: "https://m.media-amazon.com/images/I/71PLJ7OsJRL._AC_UY218_.jpg",
    inStock: true,
  },
  {
    id: 2,
    title: "Dell Power Adapter",
    brand: "Dell",
    power: "90W",
    price: 1800,
    image: "https://m.media-amazon.com/images/I/71bRz2C-3ML._AC_UY218_.jpg",
    inStock: true,
  },
  {
    id: 3,
    title: "Lenovo Slim Charger",
    brand: "Lenovo",
    power: "65W",
    price: 1700,
    image: "https://m.media-amazon.com/images/I/61VhL0HjTML._AC_UY218_.jpg",
    inStock: false,
  },
  {
    id: 4,
    title: "MacBook Magsafe Charger",
    brand: "Macbook",
    power: "85W",
    price: 6000,
    image: "https://m.media-amazon.com/images/I/51cpWg2Ay7L._AC_UY218_.jpg",
    inStock: true,
  },
  {
    id: 5,
    title: "Chromebook USB-C Charger",
    brand: "Chromebook",
    power: "45W",
    price: 1200,
    image: "https://m.media-amazon.com/images/I/61IUYiR22PL._AC_UY218_.jpg",
    inStock: true,
  },
];

const ChargerData = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredChargers = chargerProducts.filter((product) =>
    product.brand.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddToCart = (product) => {
    alert(`${product.title} added to cart!`);
  };

  return (
    <div className="charger-wrapper">
      <div className="charger-hero">
        <h1>Laptop Chargers & Power Adapters</h1>
        <p>Find compatible and reliable chargers for your laptop brand.</p>
      </div>

      <div className="charger-search-bar">
        <input
          type="text"
          placeholder="Search by brand (e.g., HP, Dell, Macbook)"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="charger-grid">
        {filteredChargers.map((product) => (
          <div className="charger-card" key={product.id}>
            <img
              src={product.image}
              alt={product.title}
              className="charger-img"
            />
            <h3>{product.title}</h3>
            <p className="charger-brand">Brand: {product.brand}</p>
            <p className="charger-power">Power: {product.power}</p>
            <p className="charger-price">RS {product.price.toLocaleString()}</p>
            <p className={product.inStock ? "charger-stock" : "charger-out"}>
              {product.inStock ? "In Stock" : "Out of Stock"}
            </p>
            <button
              className="charger-btn"
              onClick={() => handleAddToCart(product)}
              disabled={!product.inStock}
            >
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ChargerData;
