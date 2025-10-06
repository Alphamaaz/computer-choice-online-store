import React, { useState } from "react";
import "./ProductListingPage.css";

const productsData = [
  {
    id: 1,
    image:
      "https://plus.unsplash.com/premium_photo-1681160405580-a68e9c4707f9?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fGxhcHRvcHxlbnwwfHwwfHx8MA%3D%3D",
    name: "Dell Inspiron 15",
    specs: "Intel i5, 8GB RAM, 256GB SSD",
    price: 75000,
    chargerIncluded: true,
  },
  {
    id: 2,
    image:
      "https://images.unsplash.com/photo-1531297484001-80022131f5a1?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTd8fGxhcHRvcHxlbnwwfHwwfHx8MA%3D%3D",
    name: "HP EliteBook",
    specs: "Intel i7, 16GB RAM, 512GB SSD",
    price: 105000,
    chargerIncluded: true,
  },
  {
    id: 3,
    image:
      "https://images.unsplash.com/photo-1531297484001-80022131f5a1?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTd8fGxhcHRvcHxlbnwwfHwwfHx8MA%3D%3D",
    name: "HP EliteBook",
    specs: "Intel i7, 16GB RAM, 512GB SSD",
    price: 105000,
    chargerIncluded: true,
  },
];

const ProductListingPage = () => {
  const [filters, setFilters] = useState({
    brand: [],
    ram: [],
    storage: [],
    condition: "",
    price: 150000,
  });

  const handleSingleCheckboxChange = (category, value) => {
    const current = filters[category];
    const isSelected = current.includes(value);
    const updated = isSelected ? [] : [value];
    setFilters((prev) => ({ ...prev, [category]: updated }));
  };

  const handlePriceChange = (e) => {
    setFilters({ ...filters, price: parseInt(e.target.value, 10) });
  };

  return (
    <>
    <h1 className="page-heading">What's your budget..?</h1> 


    <div className="product-page">
       <aside className="sidebar">
        <h3>Filters</h3>

        {/* Brand */}
        <div className="filter-section">
          <h4>Brand</h4>
          {["Dell", "HP", "Lenovo", "Acer"].map((brand) => {
            const selected = filters.brand[0];
            const isChecked = selected === brand;
            const isDisabled = selected && selected !== brand;
            return (
              <label key={brand} style={{ opacity: isDisabled ? 0.5 : 1 }}>
                <input
                  type="checkbox"
                  checked={isChecked}
                  disabled={isDisabled}
                  onChange={() => handleSingleCheckboxChange("brand", brand)}
                />
                {brand}
              </label>
            );
          })}
        </div>

        {/* Price */}
        <div className="filter-section">
          <h4>Price (₨)</h4>
          <input
            type="range"
            min="20000"
            max="150000"
            value={filters.price}
            onChange={handlePriceChange}
          />
          <span>Up to ₨ {filters.price}</span>
        </div>

        {/* RAM */}
        <div className="filter-section">
          <h4>RAM</h4>
          {["4GB", "8GB", "16GB"].map((ram) => {
            const selected = filters.ram[0];
            const isChecked = selected === ram;
            const isDisabled = selected && selected !== ram;
            return (
              <label key={ram} style={{ opacity: isDisabled ? 0.5 : 1 }}>
                <input
                  type="checkbox"
                  checked={isChecked}
                  disabled={isDisabled}
                  onChange={() => handleSingleCheckboxChange("ram", ram)}
                />
                {ram}
              </label>
            );
          })}
        </div>

        {/* Storage */}
        <div className="filter-section">
          <h4>Storage</h4>
          {["HDD", "SSD"].map((storage) => {
            const selected = filters.storage[0];
            const isChecked = selected === storage;
            const isDisabled = selected && selected !== storage;
            return (
              <label key={storage} style={{ opacity: isDisabled ? 0.5 : 1 }}>
                <input
                  type="checkbox"
                  checked={isChecked}
                  disabled={isDisabled}
                  onChange={() =>
                    handleSingleCheckboxChange("storage", storage)
                  }
                />
                {storage}
              </label>
            );
          })}
        </div>

        {/* Condition */}
        <div className="filter-section">
          <h4>Condition</h4>
          {["Excellent", "Good", "Used"].map((cond) => (
            <label key={cond}>
              <input
                type="radio"
                name="condition"
                checked={filters.condition === cond}
                onChange={() =>
                  setFilters((prev) => ({ ...prev, condition: cond }))
                }
              />
              {cond}
            </label>
          ))}
        </div>

        {/* Actions */}
        <div className="filter-actions">
          <button className="apply-btn">Apply Filters</button>
          <button className="reset-btn">Reset</button>
        </div>
      </aside>

      {/* Product Cards */}
      <section className="products-container">
        {productsData.map((product) => (
          <div className="product-card" key={product.id}>
            <img src={product.image} alt={product.name} />
            <div className="product-info">
              <h3>{product.name}</h3>
              <p>{product.specs}</p>
              <p className="price">₨ {product.price.toLocaleString()}</p>
              <p className="charger">⚡ Free Charger Included</p>
              <button className="add-to-cart">
                <span>🛒 Add to Cart</span>
              </button>
            </div>
          </div>
        ))}
      </section>
      
    </div>
   </> 
  );
};

export default ProductListingPage;
