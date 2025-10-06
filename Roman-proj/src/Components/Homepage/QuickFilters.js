import React, { useState } from "react";
import "./QuickFilters.css";
import {
  FaApple,
  FaLaptop,
  FaGoogle,
  FaMobileAlt,
  FaWindows,
  FaGamepad,
} from "react-icons/fa";
import { SiHp, SiDell, SiLenovo } from "react-icons/si";

const brandIcons = {
  HP: <SiHp />,
  Dell: <SiDell />,
  Apple: <FaApple />,
  Samsung: <FaMobileAlt />,
  Lenovo: <SiLenovo />,
  Chromebook: <FaGoogle />,
};

const categoryIcons = {
  "Budget Deals": <FaLaptop />,
  "Student Picks": <FaWindows />,
  "Premium MacBooks": <FaApple />,
  "Gaming-Ready": <FaGamepad />,
};

const brands = ["HP", "Dell", "Apple", "Samsung", "Lenovo", "Chromebook"];
const categories = [
  "Budget Deals",
  "Student Picks",
  "Premium MacBooks",
  "Gaming-Ready",
];

const QuickFilters = () => {
  const [selectedBrand, setSelectedBrand] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");

  return (
    <section
      className="quick-filters"
      
    >
      <h2>we offers different Brands</h2>

      <div className="filter-group">
        <h3>Brands:</h3>
        <div className="filter-options">
          {brands.map((brand) => (
            <button
              key={brand}
              className={`filter-btn ${
                selectedBrand === brand ? "active" : ""
              }`}
              onClick={() => setSelectedBrand(brand)}
            >
              <span className="icon">{brandIcons[brand]}</span> {brand}
            </button>
          ))}
        </div>
      </div>

      <div className="filter-group">
        <h3>Categories:</h3>
        <div className="filter-options">
          {categories.map((category) => (
            <button
              key={category}
              className={`filter-btn ${
                selectedCategory === category ? "active" : ""
              }`}
              onClick={() => setSelectedCategory(category)}
            >
              <span className="icon">{categoryIcons[category]}</span> {category}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};

export default QuickFilters;
