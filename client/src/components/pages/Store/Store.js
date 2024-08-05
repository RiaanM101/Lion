import React, { useState, useEffect } from 'react';
import Product from './Product';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';

const Store = () => {
  const [products, setProducts] = useState([]);
  const [loadingProducts, setLoadingProducts] = useState(true);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await fetch('/api/products');
      const data = await response.json();
      setProducts(data);
      setLoadingProducts(false);
    } catch (error) {
      console.error('Error fetching products:', error);
      setLoadingProducts(false);
    }
  };

  const addToCart = async (productId) => {
    try {
      await fetch('/api/cart', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ productId }),
      });
    } catch (error) {
      console.error('Error adding to cart:', error);
    }
  };

  if (loadingProducts) {
    return <div className="text-center my-5"><FontAwesomeIcon icon={faSpinner} spin size="3x" /></div>;
  }

  return (
    <div className="container my-5">
      <h1 className="text-center mb-5">Store</h1>
      <div className="row">
        <div className="col-12">
          <h2 className="mb-4">Store</h2>
          <div className="row">
            {products.map(product => (
              <div key={product.id} className="col-md-6 mb-4">
                <Product product={product} addToCart={addToCart} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Store;
