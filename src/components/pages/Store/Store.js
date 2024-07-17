// src/components/pages/Store/Store.js

import React, { useState, useEffect } from 'react';
import Product from './Product';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner, faTrash } from '@fortawesome/free-solid-svg-icons';

const Store = () => {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [loadingProducts, setLoadingProducts] = useState(true);
  const [loadingCart, setLoadingCart] = useState(true);

  useEffect(() => {
    fetchProducts();
    fetchCart();
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

  const fetchCart = async () => {
    try {
      const response = await fetch('/api/cart');
      const data = await response.json();
      setCart(data);
      setLoadingCart(false);
    } catch (error) {
      console.error('Error fetching cart:', error);
      setLoadingCart(false);
    }
  };

  const addToCart = async (productId) => {
    try {
      const response = await fetch('/api/cart', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ productId }),
      });
      const product = await response.json();
      setCart([...cart, product]);
    } catch (error) {
      console.error('Error adding to cart:', error);
    }
  };

  const removeFromCart = async (productId) => {
    try {
      await fetch(`/api/cart/${productId}`, {
        method: 'DELETE',
      });
      setCart(cart.filter(product => product.id !== productId));
    } catch (error) {
      console.error('Error removing from cart:', error);
    }
  };

  if (loadingProducts || loadingCart) {
    return <div className="text-center my-5"><FontAwesomeIcon icon={faSpinner} spin size="3x" /></div>;
  }

  return (
    <div className="container my-5">
      <h1 className="text-center mb-5">Store</h1>
      <div className="row">
        <div className="col-md-8">
          <h2 className="mb-4">Products</h2>
          <div className="row">
            {products.map(product => (
              <div key={product.id} className="col-md-6 mb-4">
                <Product product={product} addToCart={addToCart} />
              </div>
            ))}
          </div>
        </div>
        <div className="col-md-4">
          <h2 className="mb-4">Cart</h2>
          <ul className="list-group">
            {cart.map(product => (
              <li key={product.id} className="list-group-item d-flex justify-content-between align-items-center">
                <div>
                  <h5>{product.name}</h5>
                  <p className="mb-0">${product.price}</p>
                </div>
                <button className="btn btn-danger btn-sm" onClick={() => removeFromCart(product.id)}>
                  <FontAwesomeIcon icon={faTrash} />
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Store;
