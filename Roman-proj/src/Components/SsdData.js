import React, { useState } from 'react';
import './SsdData.css';

const ssdProducts = [
  {
    id: 1,
    title: '128GB SSD',
    brand: 'Kingston',
    capacity: '128GB',
    price: 2800,
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRdLbyNWdUbM0rdr0fH23Ce8ms_yZoRgsBa3A&s',
    inStock: true,
  },
  {
    id: 2,
    title: '256GB SSD',
    brand: 'WD',
    capacity: '256GB',
    price: 4500,
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTMnjrAiDe3wOuiAdzFeGhjMQ-duBaW3ekA2A&s',
    inStock: true,
  },
  {
    id: 3,
    title: '512GB SSD',
    brand: 'Samsung',
    capacity: '512GB',
    price: 8200,
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS6NDp8B0KeTeZoA8nuS0wpyoWlqwvm66-P3A&s',
    inStock: false,
  },
  {
    id: 4,
    title: '1TB SSD',
    brand: 'Samsung',
    capacity: '1TB',
    price: 13999,
    image: 'https://myshop.pk/pub/media/catalog/product/cache/26f8091d81cea4b38d820a1d1a4f62be/w/d/wd_internal_ssd_sata_blue_1tb_myshop_pk_03.jpg',
    inStock: true,
  },
  
];

const SsdData = () => {
  const [filter, setFilter] = useState('All');
  const [sortOrder, setSortOrder] = useState('Default');

  const filteredData = ssdProducts.filter(item => {
    return filter === 'All' || item.capacity === filter;
  });

  const sortedData = [...filteredData].sort((a, b) => {
    if (sortOrder === 'Price Low to High') return a.price - b.price;
    if (sortOrder === 'Price High to Low') return b.price - a.price;
    return 0;
  });

  const handleAddToCart = (product) => {
    alert(`${product.title} added to cart!`);
  };

  return (
    <div className="ssd-container">
      <div className="hero">
        <h1>SSD Drives for Speed & Storage</h1>
        <p>Select from a range of high-speed SSDs. Reliable, fast, and affordable.</p>
      </div>

      <div className="ssd-filters">
        <select value={filter} onChange={(e) => setFilter(e.target.value)}>
          <option value="All">All Capacities</option>
          <option value="128GB">128GB</option>
          <option value="256GB">256GB</option>
          <option value="512GB">512GB</option>
          <option value="1TB">1TB</option>
          
        </select>

        <select value={sortOrder} onChange={(e) => setSortOrder(e.target.value)}>
          <option value="Default">Sort By</option>
          <option value="Price Low to High">Price Low to High</option>
          <option value="Price High to Low">Price High to Low</option>
        </select>
      </div>

      <div className="ssd-grid">
        {sortedData.map(product => (
          <div className="ssd-card" key={product.id}>
            <img src={product.image} alt={product.title} className="ssd-image" />
            <h3>{product.title}</h3>
            <p className="brand">Brand: {product.brand}</p>
            <p className="price">RS {product.price.toLocaleString()}</p>
            <p className={product.inStock ? 'in-stock' : 'out-stock'}>
              {product.inStock ? 'In Stock' : 'Out of Stock'}
            </p>
            <button 
              className="add-btn" 
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

export default SsdData;




// if we have more than 100 products.
/*
import React, { useState, useEffect } from 'react';
import './SsdData.css';

const SsdData = () => {
  const [filter, setFilter] = useState('All');
  const [sortOrder, setSortOrder] = useState('Default');
  const [currentPage, setCurrentPage] = useState(1);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const productsPerPage = 12;

  // Simulate fetching from API
  useEffect(() => {
    const fetchProducts = async () => {
      // In real app, this would be an API call
      const response = await mockApiCall();
      setProducts(response);
      setLoading(false);
    };
    
    fetchProducts();
  }, []);

  const mockApiCall = () => {
    return new Promise(resolve => {
      // Generate 100+ mock products
      const mockProducts = [];
      const brands = ['Samsung', 'WD', 'Kingston', 'Crucial', 'SanDisk', 'Seagate'];
      const capacities = ['128GB', '256GB', '512GB', '1TB', '2TB', '4TB'];
      
      for (let i = 1; i <= 120; i++) {
        mockProducts.push({
          id: i,
          title: `${capacities[i % capacities.length]} SSD`,
          brand: brands[i % brands.length],
          capacity: capacities[i % capacities.length],
          price: Math.floor(Math.random() * 20000) + 2000,
          image: `https://picsum.photos/200/150?random=${i}`,
          inStock: Math.random() > 0.2
        });
      }
      
      setTimeout(() => resolve(mockProducts), 500); // Simulate network delay
    });
  };

  const filteredData = products.filter(item => {
    return filter === 'All' || item.capacity === filter;
  });

  const sortedData = [...filteredData].sort((a, b) => {
    if (sortOrder === 'Price Low to High') return a.price - b.price;
    if (sortOrder === 'Price High to Low') return b.price - a.price;
    return 0;
  });

  // Pagination logic
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = sortedData.slice(indexOfFirstProduct, indexOfLastProduct);
  const totalPages = Math.ceil(sortedData.length / productsPerPage);

  const handleAddToCart = (product) => {
    alert(`${product.title} added to cart!`);
  };

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  if (loading) {
    return <div className="loading">Loading products...</div>;
  }

  return (
    <div className="ssd-container">
      <div className="hero">
        <h1>SSD Drives for Speed & Storage</h1>
        <p>Select from our wide range of high-speed SSDs ({products.length} products available)</p>
      </div>

      <div className="ssd-filters">
        <select value={filter} onChange={(e) => {
          setFilter(e.target.value);
          setCurrentPage(1); // Reset to first page when filter changes
        }}>
          <option value="All">All Capacities</option>
          {[...new Set(products.map(p => p.capacity))].map(capacity => (
            <option key={capacity} value={capacity}>{capacity}</option>
          ))}
        </select>

        <select value={sortOrder} onChange={(e) => {
          setSortOrder(e.target.value);
          setCurrentPage(1); // Reset to first page when sort changes
        }}>
          <option value="Default">Sort By</option>
          <option value="Price Low to High">Price Low to High</option>
          <option value="Price High to Low">Price High to Low</option>
        </select>
      </div>

      <div className="product-count">
        Showing {indexOfFirstProduct + 1}-{Math.min(indexOfLastProduct, sortedData.length)} of {sortedData.length} products
      </div>

      <div className="ssd-grid">
        {currentProducts.length > 0 ? (
          currentProducts.map(product => (
            <div className="ssd-card" key={product.id}>
              <img src={product.image} alt={product.title} className="ssd-image" />
              <h3>{product.title}</h3>
              <p className="brand">Brand: {product.brand}</p>
              <p className="price">RS {product.price.toLocaleString()}</p>
              <p className={product.inStock ? 'in-stock' : 'out-stock'}>
                {product.inStock ? 'In Stock' : 'Out of Stock'}
              </p>
              <button 
                className="add-btn" 
                onClick={() => handleAddToCart(product)}
                disabled={!product.inStock}
              >
                Add to Cart
              </button>
            </div>
          ))
        ) : (
          <div className="no-results">No products match your filters</div>
        )}
      </div>

      {totalPages > 1 && (
        <div className="pagination">
          <button 
            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
          >
            &laquo; Prev
          </button>
          
          {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => {
            let pageNum;
            if (totalPages <= 5) {
              pageNum = i + 1;
            } else if (currentPage <= 3) {
              pageNum = i + 1;
            } else if (currentPage >= totalPages - 2) {
              pageNum = totalPages - 4 + i;
            } else {
              pageNum = currentPage - 2 + i;
            }
            
            return (
              <button
                key={pageNum}
                onClick={() => paginate(pageNum)}
                className={currentPage === pageNum ? 'active' : ''}
              >
                {pageNum}
              </button>
            );
          })}
          
          <button 
            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
          >
            Next &raquo;
          </button>
        </div>
      )}
    </div>
  );
};

export default SsdData; */